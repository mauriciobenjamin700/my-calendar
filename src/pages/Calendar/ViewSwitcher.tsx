import { useTranslation } from "@/i18n";
import type { CalendarViewMode } from "@/stores";
import styles from "./Calendar.module.css";
import { VIEW_MODES } from "./data";

interface ViewSwitcherProps {
    viewMode: CalendarViewMode;
    onChangeView: (mode: CalendarViewMode) => void;
}

export function ViewSwitcher({
    viewMode,
    onChangeView,
}: ViewSwitcherProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <div className={styles.viewSwitcher}>
            {VIEW_MODES.map((mode) => (
                <button
                    key={mode.value}
                    className={`${styles.viewButton} ${viewMode === mode.value ? styles.viewButtonActive : ""}`}
                    onClick={() => onChangeView(mode.value)}
                >
                    {t(mode.labelKey)}
                </button>
            ))}
        </div>
    );
}
