import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common";
import type { TaskPriority, TaskCreateInput } from "@/core/types";
import { useCreateTask, useCategories } from "@/hooks";
import { useTranslation } from "@/i18n";
import { toISODateString } from "@/lib/date";
import { useCalendarStore, useNotificationStore } from "@/stores";
import { DateTimeFields } from "./DateTimeFields";
import { MetadataFields } from "./MetadataFields";
import { RemindersField } from "./RemindersField";
import styles from "./TaskCreate.module.css";

export function TaskCreatePage(): React.JSX.Element {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const createTask = useCreateTask();
    const { data: categories = [] } = useCategories();
    const { selectedDate } = useCalendarStore();
    const { addToast } = useNotificationStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(toISODateString(selectedDate));
    const [time, setTime] = useState("09:00");
    const [endTime, setEndTime] = useState("");
    const [allDay, setAllDay] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("medium");
    const [reminders, setReminders] = useState<number[]>([10]);

    const toggleReminder = (value: number): void => {
        setReminders((prev) =>
            prev.includes(value)
                ? prev.filter((r) => r !== value)
                : [...prev, value],
        );
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!title.trim()) {
            addToast("error", t("task.titleRequired"));

            return;
        }

        const startDate = allDay
            ? `${date}T00:00:00.000Z`
            : `${date}T${time}:00.000Z`;
        const endDate =
            endTime && !allDay ? `${date}T${endTime}:00.000Z` : null;

        const input: TaskCreateInput = {
            title: title.trim(),
            description: description.trim(),
            startDate,
            endDate,
            allDay,
            categoryId: categoryId || null,
            priority,
            status: "pending",
            recurrenceRule: null,
            reminders,
        };

        try {
            await createTask.mutateAsync(input);
            addToast("success", t("task.createdSuccess"));
            navigate("/");
        } catch {
            addToast("error", t("task.createFailed"));
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.pageTitle}>{t("task.newTask")}</h2>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div className={styles.field}>
                    <label className={styles.label}>{t("task.title")}</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t("task.titlePlaceholder")}
                        autoFocus
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        {t("task.description")}
                    </label>
                    <textarea
                        className={`${styles.input} ${styles.textarea}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t("task.descriptionPlaceholder")}
                    />
                </div>

                <DateTimeFields
                    date={date}
                    time={time}
                    endTime={endTime}
                    allDay={allDay}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                    onEndTimeChange={setEndTime}
                    onAllDayChange={setAllDay}
                />

                <MetadataFields
                    categoryId={categoryId}
                    priority={priority}
                    categories={categories}
                    onCategoryChange={setCategoryId}
                    onPriorityChange={setPriority}
                />

                <RemindersField
                    reminders={reminders}
                    onToggle={toggleReminder}
                />

                <div className={styles.actions}>
                    <Button
                        type="submit"
                        fullWidth
                        disabled={createTask.isPending}
                    >
                        {createTask.isPending
                            ? t("task.creating")
                            : t("task.createTask")}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => navigate("/")}
                    >
                        {t("task.cancel")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
