/** Tracks scheduled notifications for tasks. */
export interface ScheduledNotification {
    /** UUID v4 - primary key. */
    id: string;
    /** Reference to the task. */
    taskId: string;
    /** When to fire the notification (ISO 8601). */
    scheduledAt: string;
    /** Notification title. */
    title: string;
    /** Notification body text. */
    body: string;
    /** Whether it has been shown. */
    shown: boolean;
    /** Whether the user dismissed it. */
    dismissed: boolean;
}

/** Type of in-app notification. */
export type InAppNotificationType =
    | "reminder"
    | "overdue"
    | "daily_summary"
    | "info";

/** In-app notification for the notification center. */
export interface InAppNotification {
    /** UUID v4 - primary key. */
    id: string;
    /** Notification type. */
    type: InAppNotificationType;
    /** Notification title. */
    title: string;
    /** Notification message. */
    message: string;
    /** Reference to related task (null if general). */
    taskId: string | null;
    /** Whether the user has read it. */
    read: boolean;
    /** ISO 8601 datetime - when created. */
    createdAt: string;
}
