import { Check } from "lucide-react";
import type { Task } from "@/core/types";
import { useTranslation } from "@/i18n";
import { format, parseISO, formatTime } from "@/lib/date";
import styles from "./Calendar.module.css";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface DayTimelineProps {
    selectedDate: Date;
    tasks: Task[];
    getCategoryColor: (categoryId: string | null) => string;
    onToggleStatus: (taskId: string) => void;
    onNavigateTask: (taskId: string) => void;
}

export function DayTimeline({
    selectedDate,
    tasks,
    getCategoryColor,
    onToggleStatus,
    onNavigateTask,
}: DayTimelineProps): React.JSX.Element {
    const { t } = useTranslation();
    const allDayTasks = tasks.filter((task) => task.allDay);
    const timedTasks = tasks.filter((task) => !task.allDay);

    const getTaskHour = (task: Task): number => {
        return parseISO(task.startDate).getHours();
    };

    return (
        <div className={styles.dayTimeline}>
            <h3 className={styles.dayTimelineTitle}>
                {format(selectedDate, "EEEE, MMMM d")}
            </h3>

            {allDayTasks.length > 0 && (
                <div className={styles.allDaySection}>
                    <span className={styles.allDayLabel}>
                        {t("calendar.allDay")}
                    </span>
                    {allDayTasks.map((task) => (
                        <div
                            key={task.id}
                            className={styles.timelineTask}
                            style={{
                                borderLeftColor: getCategoryColor(
                                    task.categoryId,
                                ),
                            }}
                            onClick={() => onNavigateTask(task.id)}
                        >
                            <button
                                className={`${styles.checkbox} ${task.status === "completed" ? styles.checkboxCompleted : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleStatus(task.id);
                                }}
                                aria-label={t("calendar.toggleStatus")}
                            >
                                {task.status === "completed" && (
                                    <Check
                                        size={12}
                                        color="white"
                                    />
                                )}
                            </button>
                            <span
                                className={`${styles.taskTitle} ${task.status === "completed" ? styles.taskTitleCompleted : ""}`}
                            >
                                {task.title}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.hoursList}>
                {HOURS.map((hour) => {
                    const hourTasks = timedTasks.filter(
                        (task) => getTaskHour(task) === hour,
                    );

                    return (
                        <div
                            key={hour}
                            className={styles.hourRow}
                        >
                            <span className={styles.hourLabel}>
                                {String(hour).padStart(2, "0")}:00
                            </span>
                            <div className={styles.hourContent}>
                                {hourTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={styles.timelineTask}
                                        style={{
                                            borderLeftColor: getCategoryColor(
                                                task.categoryId,
                                            ),
                                        }}
                                        onClick={() => onNavigateTask(task.id)}
                                    >
                                        <button
                                            className={`${styles.checkbox} ${task.status === "completed" ? styles.checkboxCompleted : ""}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleStatus(task.id);
                                            }}
                                            aria-label={t(
                                                "calendar.toggleStatus",
                                            )}
                                        >
                                            {task.status === "completed" && (
                                                <Check
                                                    size={12}
                                                    color="white"
                                                />
                                            )}
                                        </button>
                                        <div className={styles.taskInfo}>
                                            <span
                                                className={`${styles.taskTitle} ${task.status === "completed" ? styles.taskTitleCompleted : ""}`}
                                            >
                                                {task.title}
                                            </span>
                                            <span className={styles.taskTime}>
                                                {formatTime(
                                                    parseISO(task.startDate),
                                                )}
                                                {task.endDate &&
                                                    ` - ${formatTime(parseISO(task.endDate))}`}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
