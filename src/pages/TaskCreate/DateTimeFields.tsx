import { useTranslation } from "@/i18n";
import styles from "./TaskCreate.module.css";

interface DateTimeFieldsProps {
    date: string;
    time: string;
    endTime: string;
    allDay: boolean;
    onDateChange: (value: string) => void;
    onTimeChange: (value: string) => void;
    onEndTimeChange: (value: string) => void;
    onAllDayChange: (value: boolean) => void;
}

export function DateTimeFields({
    date,
    time,
    endTime,
    allDay,
    onDateChange,
    onTimeChange,
    onEndTimeChange,
    onAllDayChange,
}: DateTimeFieldsProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.checkboxRow}>
                <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    id="allDay"
                    checked={allDay}
                    onChange={(e) => onAllDayChange(e.target.checked)}
                />
                <label
                    className={styles.label}
                    htmlFor="allDay"
                >
                    {t("calendar.allDay")}
                </label>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>{t("task.date")}</label>
                    <input
                        className={styles.input}
                        type="date"
                        value={date}
                        onChange={(e) => onDateChange(e.target.value)}
                    />
                </div>
                {!allDay && (
                    <>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                {t("task.start")}
                            </label>
                            <input
                                className={styles.input}
                                type="time"
                                value={time}
                                onChange={(e) => onTimeChange(e.target.value)}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>
                                {t("task.end")}
                            </label>
                            <input
                                className={styles.input}
                                type="time"
                                value={endTime}
                                onChange={(e) =>
                                    onEndTimeChange(e.target.value)
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
