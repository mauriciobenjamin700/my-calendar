import type { TranslationKey } from "@/i18n";
import { useTranslation } from "@/i18n";
import type { Task } from "@/core/types";
import {
    format,
    isSameDay,
    isSameMonth,
    isToday,
    toISODateString,
} from "@/lib/date";
import styles from "./Calendar.module.css";

const WEEKDAY_KEYS: TranslationKey[] = [
    "weekday.sun",
    "weekday.mon",
    "weekday.tue",
    "weekday.wed",
    "weekday.thu",
    "weekday.fri",
    "weekday.sat",
];

interface MonthGridProps {
    monthDays: Date[];
    selectedDate: Date;
    tasksByDay: Map<string, Task[]>;
    getCategoryColor: (categoryId: string | null) => string;
    onSelectDate: (date: Date) => void;
}

export function MonthGrid({
    monthDays,
    selectedDate,
    tasksByDay,
    getCategoryColor,
    onSelectDate,
}: MonthGridProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.weekDaysHeader}>
                {WEEKDAY_KEYS.map((key) => (
                    <span
                        key={key}
                        className={styles.weekDayLabel}
                    >
                        {t(key)}
                    </span>
                ))}
            </div>

            <div className={styles.monthGrid}>
                {monthDays.map((day) => {
                    const dayKey = toISODateString(day);
                    const dayTasks = tasksByDay.get(dayKey) ?? [];
                    const isCurrentMonth = isSameMonth(day, selectedDate);
                    const isSelected = isSameDay(day, selectedDate);
                    const isTodayDate = isToday(day);

                    return (
                        <div
                            key={dayKey}
                            className={`${styles.dayCell} ${!isCurrentMonth ? styles.dayCellOutside : ""}`}
                            onClick={() => onSelectDate(day)}
                        >
                            <span
                                className={`${styles.dayNumber} ${isTodayDate ? styles.dayNumberToday : ""} ${isSelected && !isTodayDate ? styles.dayNumberSelected : ""}`}
                            >
                                {format(day, "d")}
                            </span>
                            {dayTasks.length > 0 && (
                                <div className={styles.taskDots}>
                                    {dayTasks.slice(0, 3).map((task) => (
                                        <span
                                            key={task.id}
                                            className={styles.taskDot}
                                            style={{
                                                backgroundColor:
                                                    getCategoryColor(
                                                        task.categoryId,
                                                    ),
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
