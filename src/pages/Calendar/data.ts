import type { TranslationKey } from "@/i18n";
import type { CalendarViewMode } from "@/stores";

export interface ViewModeOption {
    value: CalendarViewMode;
    labelKey: TranslationKey;
}

export const VIEW_MODES: ViewModeOption[] = [
    { value: "month", labelKey: "calendar.month" },
    { value: "week", labelKey: "calendar.week" },
    { value: "day", labelKey: "calendar.day" },
];
