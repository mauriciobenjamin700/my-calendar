import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    THEME_COLOR_LIGHT,
    THEME_COLOR_DARK,
    STORAGE_KEY_THEME,
} from "@/core/settings";

/** Theme mode options. */
export type ThemeMode = "light" | "dark" | "system";

/**
 * Resolve the effective theme from a mode setting.
 *
 * @param mode - The theme mode.
 * @returns "light" or "dark".
 */
function resolveTheme(mode: ThemeMode): "light" | "dark" {
    if (mode === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    return mode;
}

/**
 * Apply the theme to the document root element.
 *
 * @param mode - The theme mode to apply.
 */
function applyTheme(mode: ThemeMode): void {
    const resolved = resolveTheme(mode);
    document.documentElement.setAttribute("data-theme", resolved);

    const themeColor =
        resolved === "dark" ? THEME_COLOR_DARK : THEME_COLOR_LIGHT;
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", themeColor);
}

interface ThemeState {
    /** User-selected theme mode. */
    mode: ThemeMode;
    /** Set the theme mode. */
    setMode: (mode: ThemeMode) => void;
    /** Get the resolved theme (light or dark) based on system preference. */
    getResolvedTheme: () => "light" | "dark";
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: "system",

            setMode: (mode: ThemeMode) => {
                set({ mode });
                applyTheme(mode);
            },

            getResolvedTheme: () => resolveTheme(get().mode),
        }),
        {
            name: STORAGE_KEY_THEME,
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyTheme(state.mode);
                }
            },
        },
    ),
);

/**
 * Initialize theme on app load.
 *
 * @returns Cleanup function to remove the media query listener.
 */
export function initializeTheme(): () => void {
    const mode = useThemeStore.getState().mode;
    applyTheme(mode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (): void => {
        const currentMode = useThemeStore.getState().mode;

        if (currentMode === "system") {
            applyTheme("system");
        }
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
}
