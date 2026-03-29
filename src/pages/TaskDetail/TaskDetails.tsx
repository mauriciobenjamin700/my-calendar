import { Calendar, Clock, Tag, Flag, Bell } from "lucide-react";
import { PRIORITY_COLORS } from "@/core/constants";
import type { Task, Category } from "@/core/types";
import { useTranslation } from "@/i18n";
import {
    format,
    parseISO,
    formatTime,
    formatReminderOffset,
} from "@/lib/date";
import styles from "./TaskDetail.module.css";

interface TaskDetailsProps {
    task: Task;
    category: Category | undefined;
}

export function TaskDetails({
    task,
    category,
}: TaskDetailsProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.details}>
                <div className={styles.detailRow}>
                    <Calendar
                        size={16}
                        className={styles.detailIcon}
                    />
                    <span className={styles.detailLabel}>
                        {t("task.date")}
                    </span>
                    <span className={styles.detailValue}>
                        {format(
                            parseISO(task.startDate),
                            "EEEE, MMMM d, yyyy",
                        )}
                    </span>
                </div>

                {!task.allDay && (
                    <div className={styles.detailRow}>
                        <Clock
                            size={16}
                            className={styles.detailIcon}
                        />
                        <span className={styles.detailLabel}>
                            {t("task.time")}
                        </span>
                        <span className={styles.detailValue}>
                            {formatTime(parseISO(task.startDate))}
                            {task.endDate &&
                                ` - ${formatTime(parseISO(task.endDate))}`}
                        </span>
                    </div>
                )}

                {category && (
                    <div className={styles.detailRow}>
                        <Tag
                            size={16}
                            className={styles.detailIcon}
                        />
                        <span className={styles.detailLabel}>
                            {t("task.category")}
                        </span>
                        <span
                            className={styles.categoryBadge}
                            style={{
                                backgroundColor: `${category.color}20`,
                                color: category.color,
                            }}
                        >
                            {category.name}
                        </span>
                    </div>
                )}

                <div className={styles.detailRow}>
                    <Flag
                        size={16}
                        className={styles.detailIcon}
                    />
                    <span className={styles.detailLabel}>
                        {t("task.priority")}
                    </span>
                    <span
                        className={styles.priorityBadge}
                        style={{
                            backgroundColor: `${PRIORITY_COLORS[task.priority]}20`,
                            color: PRIORITY_COLORS[task.priority],
                        }}
                    >
                        {task.priority}
                    </span>
                </div>

                {task.reminders.length > 0 && (
                    <div className={styles.detailRow}>
                        <Bell
                            size={16}
                            className={styles.detailIcon}
                        />
                        <span className={styles.detailLabel}>
                            {t("task.reminders")}
                        </span>
                        <span className={styles.detailValue}>
                            {task.reminders
                                .map((m) => formatReminderOffset(m))
                                .join(", ")}
                        </span>
                    </div>
                )}
            </div>

            {task.description && (
                <div className={styles.description}>{task.description}</div>
            )}
        </>
    );
}
