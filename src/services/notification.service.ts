import type {
    ScheduledNotification,
    InAppNotification,
    InAppNotificationType,
} from "@/core/types";
import { db } from "@/db";
import { generateId } from "@/lib/id";

/** Service for notification operations against IndexedDB. */
export const notificationService = {
    /**
     * Schedule a notification for a task.
     *
     * @param taskId - The task ID.
     * @param scheduledAt - When to fire (ISO 8601).
     * @param title - Notification title.
     * @param body - Notification body.
     * @returns The created scheduled notification.
     */
    async schedule(
        taskId: string,
        scheduledAt: string,
        title: string,
        body: string,
    ): Promise<ScheduledNotification> {
        const notification: ScheduledNotification = {
            id: generateId(),
            taskId,
            scheduledAt,
            title,
            body,
            shown: false,
            dismissed: false,
        };
        await db.scheduledNotifications.add(notification);

        return notification;
    },

    /**
     * Get all pending notifications that should be shown now.
     *
     * @returns Array of due notifications.
     */
    async getDueNotifications(): Promise<ScheduledNotification[]> {
        const now = new Date().toISOString();

        return db.scheduledNotifications
            .where("scheduledAt")
            .belowOrEqual(now)
            .and((n) => !n.shown)
            .toArray();
    },

    /**
     * Mark a notification as shown.
     *
     * @param id - Notification UUID.
     */
    async markAsShown(id: string): Promise<void> {
        await db.scheduledNotifications.update(id, { shown: true });
    },

    /**
     * Delete all notifications for a task.
     *
     * @param taskId - The task ID.
     */
    async deleteByTaskId(taskId: string): Promise<void> {
        await db.scheduledNotifications
            .where("taskId")
            .equals(taskId)
            .delete();
    },

    /**
     * Schedule reminders for a task based on its reminder offsets.
     *
     * @param taskId - The task ID.
     * @param taskTitle - The task title.
     * @param startDate - Task start date (ISO 8601).
     * @param reminders - Array of minute offsets before startDate.
     */
    async scheduleReminders(
        taskId: string,
        taskTitle: string,
        startDate: string,
        reminders: number[],
    ): Promise<void> {
        await notificationService.deleteByTaskId(taskId);

        const taskStart = new Date(startDate).getTime();
        const now = Date.now();

        const notifications: ScheduledNotification[] = [];

        for (const minutes of reminders) {
            const triggerTime = taskStart - minutes * 60_000;

            if (triggerTime > now) {
                notifications.push({
                    id: generateId(),
                    taskId,
                    scheduledAt: new Date(triggerTime).toISOString(),
                    title: `Reminder: ${taskTitle}`,
                    body: `Starting in ${minutes} minute${minutes !== 1 ? "s" : ""}`,
                    shown: false,
                    dismissed: false,
                });
            }
        }

        if (notifications.length > 0) {
            await db.scheduledNotifications.bulkAdd(notifications);
        }
    },

    /**
     * Create an in-app notification.
     *
     * @param type - Notification type.
     * @param title - Notification title.
     * @param message - Notification message.
     * @param taskId - Optional related task ID.
     * @returns The created in-app notification.
     */
    async createInApp(
        type: InAppNotificationType,
        title: string,
        message: string,
        taskId: string | null = null,
    ): Promise<InAppNotification> {
        const notification: InAppNotification = {
            id: generateId(),
            type,
            title,
            message,
            taskId,
            read: false,
            createdAt: new Date().toISOString(),
        };
        await db.inAppNotifications.add(notification);

        return notification;
    },

    /**
     * Get unread in-app notifications.
     *
     * @returns Array of unread notifications.
     */
    async getUnread(): Promise<InAppNotification[]> {
        return db.inAppNotifications
            .where("read")
            .equals(0)
            .reverse()
            .sortBy("createdAt");
    },

    /**
     * Get all in-app notifications.
     *
     * @returns Array of all notifications sorted by creation date.
     */
    async getAll(): Promise<InAppNotification[]> {
        return db.inAppNotifications.orderBy("createdAt").reverse().toArray();
    },

    /**
     * Mark an in-app notification as read.
     *
     * @param id - Notification UUID.
     */
    async markAsRead(id: string): Promise<void> {
        await db.inAppNotifications.update(id, { read: true });
    },

    /**
     * Mark all in-app notifications as read.
     */
    async markAllAsRead(): Promise<void> {
        await db.inAppNotifications
            .where("read")
            .equals(0)
            .modify({ read: true });
    },
};
