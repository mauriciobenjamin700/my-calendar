import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { useTranslation } from "@/i18n";
import { formatMonthYear } from "@/lib/date";
import { useCalendarStore } from "@/stores";
import styles from "./Header.module.css";

export function Header(): React.JSX.Element {
    const { t } = useTranslation();
    const { selectedDate, goForward, goBackward, goToToday } =
        useCalendarStore();

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.navButtons}>
                    <button
                        className={styles.iconButton}
                        onClick={goBackward}
                        aria-label={t("nav.previous")}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className={styles.iconButton}
                        onClick={goForward}
                        aria-label={t("nav.next")}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
                <h1 className={styles.title}>
                    {formatMonthYear(selectedDate)}
                </h1>
            </div>

            <div className={styles.right}>
                <button
                    className={styles.todayButton}
                    onClick={goToToday}
                >
                    {t("nav.today")}
                </button>
                <button
                    className={styles.iconButton}
                    aria-label={t("nav.notifications")}
                >
                    <Bell size={20} />
                </button>
            </div>
        </header>
    );
}
