import { X } from "lucide-react";
import { useTranslation } from "@/i18n";
import { useNotificationStore } from "@/stores";
import styles from "./Toast.module.css";

export function ToastContainer(): React.JSX.Element {
    const { t } = useTranslation();
    const { toasts, removeToast } = useNotificationStore();

    return (
        <div className={styles.container}>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`${styles.toast} ${styles[toast.type]}`}
                >
                    <span className={styles.message}>{toast.message}</span>
                    <button
                        className={styles.closeButton}
                        onClick={() => removeToast(toast.id)}
                        aria-label={t("nav.dismiss")}
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}
