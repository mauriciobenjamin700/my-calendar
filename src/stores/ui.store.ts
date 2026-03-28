import { create } from "zustand";

interface UIState {
    /** Whether the task form modal/bottom sheet is open. */
    isTaskFormOpen: boolean;
    /** ID of the task being edited (null for new task). */
    editingTaskId: string | null;
    /** Open the task form for creating or editing. */
    openTaskForm: (taskId?: string) => void;
    /** Close the task form. */
    closeTaskForm: () => void;
    /** Whether the notification panel is open. */
    isNotificationPanelOpen: boolean;
    /** Toggle the notification panel. */
    toggleNotificationPanel: () => void;
    /** Close the notification panel. */
    closeNotificationPanel: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isTaskFormOpen: false,
    editingTaskId: null,
    isNotificationPanelOpen: false,

    openTaskForm: (taskId?: string) =>
        set({
            isTaskFormOpen: true,
            editingTaskId: taskId ?? null,
        }),

    closeTaskForm: () =>
        set({
            isTaskFormOpen: false,
            editingTaskId: null,
        }),

    toggleNotificationPanel: () =>
        set((state) => ({
            isNotificationPanelOpen: !state.isNotificationPanelOpen,
        })),

    closeNotificationPanel: () => set({ isNotificationPanelOpen: false }),
}));
