import { Trash2 } from "lucide-react";
import type { Task, TaskStatus } from "@/core/types";
import { useTranslation } from "@/i18n";
import type { TranslationKey } from "@/i18n";
import styles from "./TaskDetail.module.css";

const STATUS_KEY_MAP: Record<TaskStatus, TranslationKey> = {
    pending: "status.pending",
    in_progress: "status.inProgress",
    completed: "status.completed",
    cancelled: "status.cancelled",
};

interface TaskHeaderProps {
    task: Task;
    onDelete: () => void;
}

export function TaskHeader({
    task,
    onDelete,
}: TaskHeaderProps): React.JSX.Element {
    const { t } = useTranslation();
    const isCompleted = task.status === "completed";

    return (
        <div className={styles.header}>
            <div className={styles.titleSection}>
                <h2
                    className={`${styles.title} ${isCompleted ? styles.titleCompleted : ""}`}
                >
                    {task.title}
                </h2>
                <span
                    className={styles.statusBadge}
                    style={{
                        backgroundColor: isCompleted
                            ? "var(--color-success-bg)"
                            : "var(--color-primary-bg)",
                        color: isCompleted
                            ? "var(--color-success)"
                            : "var(--color-primary)",
                    }}
                >
                    {t(STATUS_KEY_MAP[task.status])}
                </span>
            </div>
            <div className={styles.actions}>
                <button
                    className={`${styles.iconButton} ${styles.deleteButton}`}
                    onClick={onDelete}
                    aria-label={t("task.deleteTask")}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
