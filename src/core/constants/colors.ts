import type { TaskPriority, TaskStatus } from "@/core/types";

/** Category color presets for the color picker. */
export const CATEGORY_COLORS: string[] = [
    "#3B82F6", // Blue
    "#60A5FA", // Light Blue
    "#8B5CF6", // Purple
    "#A78BFA", // Light Purple
    "#EF4444", // Red
    "#F87171", // Light Red
    "#10B981", // Green
    "#34D399", // Light Green
    "#F59E0B", // Amber
    "#FBBF24", // Light Amber
    "#EC4899", // Pink
    "#F472B6", // Light Pink
    "#06B6D4", // Cyan
    "#22D3EE", // Light Cyan
    "#6B7280", // Gray
];

/** Priority color mapping. */
export const PRIORITY_COLORS: Record<TaskPriority, string> = {
    low: "#10B981",
    medium: "#F59E0B",
    high: "#EF4444",
    urgent: "#DC2626",
};

/** Priority display labels. */
export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
};

/** Task status display labels. */
export const STATUS_LABELS: Record<TaskStatus, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
};
