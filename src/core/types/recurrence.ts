/** Frequency of recurrence for a recurring task. */
export type RecurrenceFrequency = "daily" | "weekly" | "monthly" | "yearly";

/** Defines how a task recurs over time. */
export interface RecurrenceRule {
    /** Frequency of recurrence. */
    frequency: RecurrenceFrequency;
    /** Repeat every N intervals (e.g., every 2 weeks). */
    interval: number;
    /** For weekly: which days of the week (0=Sun, 6=Sat). */
    byDayOfWeek: number[] | null;
    /** For monthly: which day of the month (1-31). */
    byDayOfMonth: number | null;
    /** ISO 8601 date when recurrence ends (null = never). */
    endDate: string | null;
    /** Maximum number of occurrences (null = unlimited). */
    count: number | null;
}
