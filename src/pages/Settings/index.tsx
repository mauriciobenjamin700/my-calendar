import { useState } from "react";
import { Button } from "@/components/common";
import { APP_NAME, APP_VERSION } from "@/core/settings";
import { useTranslation, useLocaleStore } from "@/i18n";
import { useThemeStore, useNotificationStore } from "@/stores";
import { THEME_OPTIONS, LANGUAGE_OPTIONS } from "./data";
import styles from "./Settings.module.css";

function getInitialPermission(): NotificationPermission {
    if ("Notification" in window) {
        return Notification.permission;
    }

    return "default";
}

export function SettingsPage(): React.JSX.Element {
    const { t } = useTranslation();
    const { locale, setLocale } = useLocaleStore();
    const { mode, setMode } = useThemeStore();
    const { addToast } = useNotificationStore();
    const [notificationPermission, setNotificationPermission] =
        useState<NotificationPermission>(getInitialPermission);

    const requestNotificationPermission = async (): Promise<void> => {
        if (!("Notification" in window)) {
            addToast("error", t("settings.notifNotSupported"));

            return;
        }

        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);

        if (permission === "granted") {
            addToast("success", t("settings.notifEnabledToast"));
        } else if (permission === "denied") {
            addToast("warning", t("settings.notifBlockedToast"));
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.pageTitle}>{t("settings.title")}</h2>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    {t("settings.appearance")}
                </h3>
                <div className={styles.optionGroup}>
                    <div className={styles.optionItem}>
                        <div>
                            <div className={styles.optionLabel}>
                                {t("settings.theme")}
                            </div>
                            <div className={styles.optionDescription}>
                                {t("settings.themeDescription")}
                            </div>
                        </div>
                        <div className={styles.themeSelector}>
                            {THEME_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`${styles.themeOption} ${mode === opt.value ? styles.themeOptionActive : ""}`}
                                    onClick={() => setMode(opt.value)}
                                >
                                    {t(opt.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    {t("settings.language")}
                </h3>
                <div className={styles.optionGroup}>
                    <div className={styles.optionItem}>
                        <div>
                            <div className={styles.optionLabel}>
                                {t("settings.language")}
                            </div>
                            <div className={styles.optionDescription}>
                                {t("settings.languageDescription")}
                            </div>
                        </div>
                        <div className={styles.themeSelector}>
                            {LANGUAGE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`${styles.themeOption} ${locale === opt.value ? styles.themeOptionActive : ""}`}
                                    onClick={() => setLocale(opt.value)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    {t("settings.notifications")}
                </h3>
                <div className={styles.optionGroup}>
                    <div className={styles.optionItem}>
                        <div>
                            <div className={styles.optionLabel}>
                                {t("settings.pushNotifications")}
                            </div>
                            <div className={styles.optionDescription}>
                                {notificationPermission === "granted" &&
                                    t("settings.notifEnabled")}
                                {notificationPermission === "denied" &&
                                    t("settings.notifBlocked")}
                                {notificationPermission === "default" &&
                                    t("settings.notifEnable")}
                            </div>
                        </div>
                        {notificationPermission !== "granted" && (
                            <Button
                                variant="secondary"
                                onClick={requestNotificationPermission}
                            >
                                {t("settings.notifEnableButton")}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.aboutSection}>
                <div className={styles.appName}>{APP_NAME}</div>
                <div className={styles.version}>v{APP_VERSION}</div>
                <p>{t("settings.appDescription")}</p>
            </div>
        </div>
    );
}
