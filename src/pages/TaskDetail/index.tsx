import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Calendar } from "lucide-react";
import { Button, EmptyState } from "@/components/common";
import {
    useTaskById,
    useDeleteTask,
    useToggleTaskStatus,
    useCategories,
} from "@/hooks";
import { useTranslation } from "@/i18n";
import { useNotificationStore } from "@/stores";
import styles from "./TaskDetail.module.css";
import { TaskDetails } from "./TaskDetails";
import { TaskHeader } from "./TaskHeader";

export function TaskDetailPage(): React.JSX.Element {
    const { t } = useTranslation();
    const { taskId } = useParams<{ taskId: string }>();
    const navigate = useNavigate();
    const { data: task, isLoading } = useTaskById(taskId);
    const { data: categories = [] } = useCategories();
    const deleteTask = useDeleteTask();
    const toggleStatus = useToggleTaskStatus();
    const { addToast } = useNotificationStore();

    if (isLoading) {
        return <div className={styles.loading}>{t("calendar.loading")}</div>;
    }

    if (!task) {
        return (
            <div className={styles.page}>
                <EmptyState
                    icon={<Calendar size={40} />}
                    title={t("task.notFound")}
                    description={t("task.notFoundHint")}
                    action={
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/")}
                        >
                            {t("nav.back")}
                        </Button>
                    }
                />
            </div>
        );
    }

    const category = categories.find((c) => c.id === task.categoryId);

    const handleDelete = async (): Promise<void> => {
        try {
            await deleteTask.mutateAsync(task.id);
            addToast("success", t("task.deleted"));
            navigate("/");
        } catch {
            addToast("error", t("task.deleteFailed"));
        }
    };

    return (
        <div className={styles.page}>
            <Link
                to="/"
                className={styles.backLink}
            >
                <ChevronLeft size={16} />
                {t("nav.back")}
            </Link>

            <TaskHeader
                task={task}
                onDelete={handleDelete}
            />
            <TaskDetails
                task={task}
                category={category}
            />

            <div className={styles.toggleButton}>
                <Button
                    fullWidth
                    variant={task.status === "completed" ? "ghost" : "primary"}
                    onClick={() => toggleStatus.mutate(task.id)}
                >
                    {task.status === "completed"
                        ? t("task.markPending")
                        : t("task.markCompleted")}
                </Button>
            </div>
        </div>
    );
}
