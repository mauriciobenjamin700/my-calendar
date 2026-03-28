import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useTranslation } from "@/i18n";
import styles from "./Modal.module.css";

interface ModalProps {
    /** Whether the modal is visible. */
    isOpen: boolean;
    /** Callback when the modal should close. */
    onClose: () => void;
    /** Modal title displayed in the header. */
    title: string;
    /** Content to render inside the modal. */
    children: React.ReactNode;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps): React.JSX.Element | null {
    const { t } = useTranslation();
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.handle} />
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label={t("nav.close")}
                    >
                        <X size={18} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
