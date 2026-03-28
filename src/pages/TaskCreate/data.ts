import type { TranslationKey } from "@/i18n";
import type { TaskPriority } from "@/core/types";

export interface ReminderOption {
    labelKey: TranslationKey;
    value: number;
}

export const REMINDER_OPTIONS: ReminderOption[] = [
    { labelKey: "reminder.5min", value: 5 },
    { labelKey: "reminder.10min", value: 10 },
    { labelKey: "reminder.15min", value: 15 },
    { labelKey: "reminder.30min", value: 30 },
    { labelKey: "reminder.1hour", value: 60 },
    { labelKey: "reminder.1day", value: 1440 },
];

export interface PriorityOption {
    value: TaskPriority;
    labelKey: TranslationKey;
}

export const PRIORITIES: PriorityOption[] = [
    { value: "low", labelKey: "priority.low" },
    { value: "medium", labelKey: "priority.medium" },
    { value: "high", labelKey: "priority.high" },
    { value: "urgent", labelKey: "priority.urgent" },
];
