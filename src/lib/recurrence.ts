import type { RecurrenceRule } from "@/core/types";
import {
    addDays,
    addWeeks,
    addMonths,
    addYears,
    isAfter,
    isEqual,
    parseISO,
    getDay,
    setDate,
} from "@/lib/date";

/**
 * Expand a recurrence rule into concrete occurrence dates within a date range.
 *
 * @param startDate - The first occurrence date (ISO 8601 string).
 * @param rule - The recurrence rule to expand.
 * @param rangeStart - Start of the range to generate occurrences for.
 * @param rangeEnd - End of the range to generate for.
 * @returns Array of ISO 8601 date strings for each
 *   occurrence within the range.
 */
export function expandRecurrence(
    startDate: string,
    rule: RecurrenceRule,
    rangeStart: Date,
    rangeEnd: Date,
): string[] {
    const occurrences: string[] = [];
    const ruleEndDate = rule.endDate ? parseISO(rule.endDate) : null;
    const maxCount = rule.count ?? Infinity;
    let current = parseISO(startDate);
    let count = 0;

    while (count < maxCount) {
        if (ruleEndDate && isAfter(current, ruleEndDate)) {
            break;
        }

        if (isAfter(current, rangeEnd)) {
            break;
        }

        const shouldInclude = matchesRule(current, rule);

        if (
            shouldInclude &&
            (isAfter(current, rangeStart) || isEqual(current, rangeStart))
        ) {
            occurrences.push(current.toISOString());
        }

        if (shouldInclude) {
            count++;
        }

        current = getNextOccurrence(current, rule);
    }

    return occurrences;
}

/**
 * Check if a date matches the recurrence rule's day constraints.
 *
 * @param date - The date to check.
 * @param rule - The recurrence rule.
 * @returns True if the date matches the rule constraints.
 */
function matchesRule(date: Date, rule: RecurrenceRule): boolean {
    if (rule.frequency === "weekly" && rule.byDayOfWeek) {
        return rule.byDayOfWeek.includes(getDay(date));
    }

    if (rule.frequency === "monthly" && rule.byDayOfMonth) {
        return date.getDate() === rule.byDayOfMonth;
    }

    return true;
}

/**
 * Get the next candidate date based on the recurrence frequency and interval.
 *
 * @param current - The current date.
 * @param rule - The recurrence rule.
 * @returns The next candidate date.
 */
function getNextOccurrence(current: Date, rule: RecurrenceRule): Date {
    switch (rule.frequency) {
        case "daily":
            return addDays(current, rule.interval);
        case "weekly":
            if (rule.byDayOfWeek && rule.byDayOfWeek.length > 0) {
                return addDays(current, 1);
            }

            return addWeeks(current, rule.interval);
        case "monthly":
            if (rule.byDayOfMonth) {
                const next = addMonths(current, rule.interval);

                return setDate(next, rule.byDayOfMonth);
            }

            return addMonths(current, rule.interval);
        case "yearly":
            return addYears(current, rule.interval);
        default:
            return addDays(current, 1);
    }
}
