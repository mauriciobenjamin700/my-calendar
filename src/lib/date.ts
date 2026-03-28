import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
    addYears,
    isSameDay,
    isSameMonth,
    isToday,
    isAfter,
    isEqual,
    eachDayOfInterval,
    getDay,
    setDate,
    parseISO,
    startOfDay,
    endOfDay,
} from "date-fns";

export {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
    addYears,
    isSameDay,
    isSameMonth,
    isToday,
    isAfter,
    isEqual,
    eachDayOfInterval,
    getDay,
    setDate,
    parseISO,
    startOfDay,
    endOfDay,
};

/**
 * Get all days needed to display a full calendar month grid (including overflow days).
 *
 * @param date - Any date within the target month.
 * @returns Array of dates covering the full calendar grid (Sunday start).
 */
export function getCalendarMonthDays(date: Date): Date[] {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: gridStart, end: gridEnd });
}

/**
 * Get all days for a week view.
 *
 * @param date - Any date within the target week.
 * @returns Array of 7 dates for the week (Sunday start).
 */
export function getWeekDays(date: Date): Date[] {
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: weekStart, end: weekEnd });
}

/**
 * Format a date as ISO date string (YYYY-MM-DD).
 *
 * @param date - The date to format.
 * @returns ISO date string.
 */
export function toISODateString(date: Date): string {
    return format(date, "yyyy-MM-dd");
}

/**
 * Format a date as a readable time string (HH:mm).
 *
 * @param date - The date to format.
 * @returns Time string in HH:mm format.
 */
export function formatTime(date: Date): string {
    return format(date, "HH:mm");
}

/**
 * Format a date as month and year (e.g., "March 2026").
 *
 * @param date - The date to format.
 * @returns Formatted month and year string.
 */
export function formatMonthYear(date: Date): string {
    return format(date, "MMMM yyyy");
}

/**
 * Format a reminder offset in minutes to a human-readable string.
 *
 * @param minutes - Offset in minutes.
 * @returns Formatted string (e.g., "30min", "1h", "1h 30min", "1 day").
 */
export function formatReminderOffset(minutes: number): string {
    if (minutes >= 1440) {
        const days = Math.floor(minutes / 1440);

        return `${days} day${days !== 1 ? "s" : ""}`;
    }

    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remaining = minutes % 60;

        return remaining > 0 ? `${hours}h ${remaining}min` : `${hours}h`;
    }

    return `${minutes}min`;
}
