import { Plus } from "lucide-react";
import { useTranslation } from "@/i18n";
import styles from "./FloatingActionButton.module.css";

interface FloatingActionButtonProps {
    /** Click handler. */
    onClick: () => void;
    /** Accessible label. */
    label?: string;
}

export function FloatingActionButton({
    onClick,
    label,
}: FloatingActionButtonProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <button
            className={styles.fab}
            onClick={onClick}
            aria-label={label ?? t("task.addNewTask")}
        >
            <Plus size={24} />
        </button>
    );
}
