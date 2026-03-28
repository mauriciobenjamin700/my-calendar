import {
    NOTIFICATION_ICON_PATH,
    UPCOMING_TASKS_LOOKAHEAD_MINUTES,
} from "@/core/settings";
import { db } from "@/db";
import { notificationService, taskService } from "@/services";

/**
 * Check for pending notifications and display them.
 * Called from the main thread periodically when the app is open.
 */
export async function checkAndShowNotifications(): Promise<void> {
    if (!("Notification" in window) || Notification.permission !== "granted") {
        return;
    }

    const dueNotifications = await notificationService.getDueNotifications();

    if (dueNotifications.length === 0) {
        return;
    }

    const registration = await navigator.serviceWorker?.ready;

    for (const notification of dueNotifications) {
        if (registration) {
            await registration.showNotification(notification.title, {
                body: notification.body,
                icon: NOTIFICATION_ICON_PATH,
                badge: NOTIFICATION_ICON_PATH,
                tag: notification.id,
                data: { taskId: notification.taskId },
                requireInteraction: true,
            });
        } else {
            new Notification(notification.title, {
                body: notification.body,
                icon: NOTIFICATION_ICON_PATH,
                tag: notification.id,
            });
        }
    }

    await db.scheduledNotifications
        .where("id")
        .anyOf(dueNotifications.map((n) => n.id))
        .modify({ shown: true });
}

/**
 * Start the notification check interval.
 *
 * @param intervalMs - Check interval in milliseconds (default: 60 seconds).
 * @returns Cleanup function to stop the interval.
 */
export function startNotificationChecker(
    intervalMs: number = 60_000,
): () => void {
    checkAndShowNotifications();

    const id = setInterval(checkAndShowNotifications, intervalMs);

    return () => clearInterval(id);
}

/**
 * Check for overdue and upcoming tasks and create in-app notifications.
 * Uses deterministic IDs to prevent duplicate notifications on repeated calls.
 */
export async function checkInAppNotifications(): Promise<void> {
    const [overdueTasks, upcomingTasks] = await Promise.all([
        taskService.getOverdue(),
        taskService.getUpcoming(UPCOMING_TASKS_LOOKAHEAD_MINUTES),
    ]);

    const today = new Date().toISOString().slice(0, 10);
    const notifications = [
        ...overdueTasks.map((task) => ({
            id: `overdue-${task.id}-${today}`,
            type: "overdue" as const,
            title: "Overdue Task",
            message: `"${task.title}" is past its start time`,
            taskId: task.id,
            read: false,
            createdAt: new Date().toISOString(),
        })),
        ...upcomingTasks.map((task) => ({
            id: `reminder-${task.id}-${today}`,
            type: "reminder" as const,
            title: "Upcoming Task",
            message: `"${task.title}" starts soon`,
            taskId: task.id,
            read: false,
            createdAt: new Date().toISOString(),
        })),
    ];

    if (notifications.length > 0) {
        await db.inAppNotifications.bulkPut(notifications);
    }
}
