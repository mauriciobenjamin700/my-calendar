import type { RecurrenceFrequency } from "@/core/types";

/** Labels for recurrence frequency options. */
export const RECURRENCE_LABELS: Record<RecurrenceFrequency, string> = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
};

/** Day of week labels (0 = Sunday). */
export const DAY_OF_WEEK_LABELS: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

/** Full day of week labels. */
export const DAY_OF_WEEK_FULL_LABELS: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
