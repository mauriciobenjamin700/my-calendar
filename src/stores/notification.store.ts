import { create } from "zustand";
import { MAX_VISIBLE_TOASTS, TOAST_DURATION } from "@/core/settings";
import { generateId } from "@/lib/id";

/** Toast notification type. */
export type ToastType = "success" | "error" | "warning" | "info";

/** A toast notification entry. */
export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration: number;
}

interface NotificationState {
    /** Active toast notifications. */
    toasts: Toast[];
    /** Add a new toast. */
    addToast: (type: ToastType, message: string, duration?: number) => void;
    /** Remove a toast by ID. */
    removeToast: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    toasts: [],

    addToast: (
        type: ToastType,
        message: string,
        duration: number = TOAST_DURATION,
    ) => {
        const id = generateId();
        const toast: Toast = { id, type, message, duration };

        set((state) => ({
            toasts: [...state.toasts.slice(-(MAX_VISIBLE_TOASTS - 1)), toast],
        }));

        setTimeout(() => {
            get().removeToast(id);
        }, duration);
    },

    removeToast: (id: string) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },
}));
