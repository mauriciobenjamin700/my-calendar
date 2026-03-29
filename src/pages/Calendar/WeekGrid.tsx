import type { Task } from "@/core/types";
import {
    format,
    isSameDay,
    isToday,
    toISODateString,
    getWeekDays,
    parseISO,
    formatTime,
} from "@/lib/date";
import styles from "./Calendar.module.css";

interface WeekGridProps {
    selectedDate: Date;
    tasksByDay: Map<string, Task[]>;
    getCategoryColor: (categoryId: string | null) => string;
    onSelectDate: (date: Date) => void;
}

export function WeekGrid({
    selectedDate,
    tasksByDay,
    getCategoryColor,
    onSelectDate,
}: WeekGridProps): React.JSX.Element {
    const weekDays = getWeekDays(selectedDate);

    return (
        <div className={styles.weekGrid}>
            {weekDays.map((day) => {
                const dayKey = toISODateString(day);
                const dayTasks = tasksByDay.get(dayKey) ?? [];
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                return (
                    <div
                        key={dayKey}
                        className={`${styles.weekDay} ${isSelected ? styles.weekDaySelected : ""}`}
                        onClick={() => onSelectDate(day)}
                    >
                        <div className={styles.weekDayHeader}>
                            <span className={styles.weekDayName}>
                                {format(day, "EEE")}
                            </span>
                            <span
                                className={`${styles.weekDayNumber} ${isTodayDate ? styles.dayNumberToday : ""}`}
                            >
                                {format(day, "d")}
                            </span>
                        </div>

                        <div className={styles.weekDayTasks}>
                            {dayTasks.length === 0 && (
                                <span className={styles.weekDayEmpty}>--</span>
                            )}
                            {dayTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={styles.weekTask}
                                    style={{
                                        borderLeftColor: getCategoryColor(
                                            task.categoryId,
                                        ),
                                    }}
                                >
                                    <span
                                        className={`${styles.weekTaskTitle} ${task.status === "completed" ? styles.taskTitleCompleted : ""}`}
                                    >
                                        {task.title}
                                    </span>
                                    {!task.allDay && (
                                        <span className={styles.weekTaskTime}>
                                            {formatTime(
                                                parseISO(task.startDate),
                                            )}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
