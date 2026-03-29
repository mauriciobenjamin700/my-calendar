import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NOTIFICATION_CHECK_INTERVAL } from "@/core/settings";
import { seedDefaultCategories } from "@/db";
import {
    startNotificationChecker,
    checkInAppNotifications,
} from "@/lib/notification-scheduler";
import { initializeTheme, initializePwa } from "@/stores";
import { App } from "./App";
import "@/styles/index.css";

seedDefaultCategories();
const cleanupTheme = initializeTheme();
const cleanupPwa = initializePwa();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

// Defer non-critical work to after first paint
const stopNotificationChecker = startNotificationChecker(
    NOTIFICATION_CHECK_INTERVAL,
);
checkInAppNotifications();

if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        stopNotificationChecker();
        cleanupTheme();
        cleanupPwa();
    });
}
