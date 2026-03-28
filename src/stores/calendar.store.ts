import { create } from "zustand";
import {
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
} from "@/lib/date";

/** Calendar view mode options. */
export type CalendarViewMode = "month" | "week" | "day";

interface CalendarState {
    /** Currently selected/focused date. */
    selectedDate: Date;
    /** Active view mode. */
    viewMode: CalendarViewMode;
    /** Set the selected date. */
    setSelectedDate: (date: Date) => void;
    /** Set the view mode. */
    setViewMode: (mode: CalendarViewMode) => void;
    /** Navigate to today. */
    goToToday: () => void;
    /** Navigate forward (month/week/day depending on viewMode). */
    goForward: () => void;
    /** Navigate backward (month/week/day depending on viewMode). */
    goBackward: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
    selectedDate: new Date(),
    viewMode: "month",

    setSelectedDate: (date: Date) => set({ selectedDate: date }),

    setViewMode: (mode: CalendarViewMode) => set({ viewMode: mode }),

    goToToday: () => set({ selectedDate: new Date() }),

    goForward: () => {
        const { selectedDate, viewMode } = get();
        const navigators = {
            month: () => addMonths(selectedDate, 1),
            week: () => addWeeks(selectedDate, 1),
            day: () => addDays(selectedDate, 1),
        };
        set({ selectedDate: navigators[viewMode]() });
    },

    goBackward: () => {
        const { selectedDate, viewMode } = get();
        const navigators = {
            month: () => subMonths(selectedDate, 1),
            week: () => subWeeks(selectedDate, 1),
            day: () => subDays(selectedDate, 1),
        };
        set({ selectedDate: navigators[viewMode]() });
    },
}));
