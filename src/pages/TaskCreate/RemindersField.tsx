import { useTranslation } from "@/i18n";
import { REMINDER_OPTIONS } from "./data";
import styles from "./TaskCreate.module.css";

interface RemindersFieldProps {
    reminders: number[];
    onToggle: (value: number) => void;
}

export function RemindersField({
    reminders,
    onToggle,
}: RemindersFieldProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <div className={styles.field}>
            <label className={styles.label}>{t("task.reminders")}</label>
            <div className={styles.remindersSection}>
                {REMINDER_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        className={`${styles.reminderChip} ${reminders.includes(opt.value) ? styles.reminderChipActive : styles.reminderChipInactive}`}
                        onClick={() => onToggle(opt.value)}
                    >
                        {t(opt.labelKey)}
                    </button>
                ))}
            </div>
        </div>
    );
}
