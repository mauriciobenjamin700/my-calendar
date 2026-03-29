import { create } from "zustand";

/**
 * Non-standard browser event for PWA install prompts.
 *
 * This event is not part of the official DOM types,
 * so we declare it locally.
 */
interface BeforeInstallPromptEvent extends Event {
    /** Show the native install prompt. */
    prompt(): Promise<void>;
    /** Resolves with the user's choice. */
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
    }>;
}

interface PwaState {
    /** The deferred install prompt event. */
    deferredPrompt: BeforeInstallPromptEvent | null;
    /** Whether the app is running in standalone mode. */
    isInstalled: boolean;
    /** Store the deferred prompt event. */
    setDeferredPrompt: (event: BeforeInstallPromptEvent | null) => void;
    /** Mark the app as installed. */
    setInstalled: (installed: boolean) => void;
    /**
     * Trigger the native install prompt.
     *
     * @returns True if the user accepted, false otherwise.
     */
    installApp: () => Promise<boolean>;
}

export const usePwaStore = create<PwaState>()((set, get) => ({
    deferredPrompt: null,
    isInstalled: false,

    setDeferredPrompt: (event: BeforeInstallPromptEvent | null) => {
        set({ deferredPrompt: event });
    },

    setInstalled: (installed: boolean) => {
        set({ isInstalled: installed });
    },

    installApp: async (): Promise<boolean> => {
        const { deferredPrompt } = get();

        if (!deferredPrompt) {
            return false;
        }

        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        const accepted = outcome === "accepted";

        set({ deferredPrompt: null });

        if (accepted) {
            set({ isInstalled: true });
        }

        return accepted;
    },
}));

/**
 * Initialize PWA install prompt listeners.
 *
 * Must be called early in the app lifecycle (before
 * createRoot) to capture the beforeinstallprompt event.
 *
 * @returns Cleanup function to remove event listeners.
 */
export function initializePwa(): () => void {
    const store = usePwaStore.getState();

    const isStandalone = window.matchMedia(
        "(display-mode: standalone)",
    ).matches;

    if (isStandalone) {
        store.setInstalled(true);
    }

    const handleBeforeInstall = (e: Event): void => {
        e.preventDefault();
        usePwaStore
            .getState()
            .setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = (): void => {
        usePwaStore.getState().setInstalled(true);
        usePwaStore.getState().setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        window.removeEventListener("appinstalled", handleAppInstalled);
    };
}
