import { CalendarPlus, Check } from "lucide-react";
import { EmptyState } from "@/components/common";
import { useTranslation } from "@/i18n";
import type { Task } from "@/core/types";
import { format, parseISO, formatTime } from "@/lib/date";
import styles from "./Calendar.module.css";

interface DayTaskListProps {
    selectedDate: Date;
    tasks: Task[];
    getCategoryColor: (categoryId: string | null) => string;
    onToggleStatus: (taskId: string) => void;
    onNavigateTask: (taskId: string) => void;
}

export function DayTaskList({
    selectedDate,
    tasks,
    getCategoryColor,
    onToggleStatus,
    onNavigateTask,
}: DayTaskListProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <div className={styles.selectedDayPanel}>
            <h3 className={styles.selectedDayTitle}>
                {format(selectedDate, "EEEE, MMMM d")}
            </h3>

            {tasks.length === 0 ? (
                <EmptyState
                    icon={<CalendarPlus size={40} />}
                    title={t("calendar.noTasks")}
                    description={t("calendar.noTasksHint")}
                />
            ) : (
                tasks.map((task) => (
                    <div
                        key={task.id}
                        className={styles.taskItem}
                        onClick={() => onNavigateTask(task.id)}
                    >
                        <button
                            className={`${styles.checkbox} ${task.status === "completed" ? styles.checkboxCompleted : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleStatus(task.id);
                            }}
                            aria-label={
                                task.status === "completed"
                                    ? t("calendar.markPending")
                                    : t("calendar.markCompleted")
                            }
                        >
                            {task.status === "completed" && (
                                <Check
                                    size={12}
                                    color="white"
                                />
                            )}
                        </button>
                        <span
                            className={styles.taskColorBar}
                            style={{
                                backgroundColor: getCategoryColor(
                                    task.categoryId,
                                ),
                            }}
                        />
                        <div className={styles.taskInfo}>
                            <span
                                className={`${styles.taskTitle} ${task.status === "completed" ? styles.taskTitleCompleted : ""}`}
                            >
                                {task.title}
                            </span>
                            {!task.allDay && (
                                <span className={styles.taskTime}>
                                    {formatTime(parseISO(task.startDate))}
                                    {task.endDate &&
                                        ` - ${formatTime(parseISO(task.endDate))}`}
                                </span>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
