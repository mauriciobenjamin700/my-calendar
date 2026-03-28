/**
 * Centralized application settings and configuration.
 *
 * All environment variables, feature flags, timeouts, storage keys,
 * and deployment config live here.
 */

/* ─── App Identity ─────────────────────────────────────────── */

export const APP_NAME = "My Calendar";
export const APP_VERSION = "1.0.0";
export const BASE_URL = "/my-calendar/";

/* ─── Feature Flags ────────────────────────────────────────── */

export const SYNC_ENABLED = false;

/* ─── Notifications ────────────────────────────────────────── */

/** Interval in ms between notification checks (60s). */
export const NOTIFICATION_CHECK_INTERVAL = 60_000;

/** Minutes to look ahead for upcoming task alerts. */
export const UPCOMING_TASKS_LOOKAHEAD_MINUTES = 30;

/** Default reminder offsets in minutes for new tasks. */
export const DEFAULT_REMINDERS: number[] = [10, 30];

/** Path to notification icon (derived from BASE_URL). */
export const NOTIFICATION_ICON_PATH = `${BASE_URL}icons/icon-192x192.png`;

/* ─── Toast / UI ───────────────────────────────────────────── */

/** Maximum number of in-app toasts visible at once. */
export const MAX_VISIBLE_TOASTS = 3;

/** Toast auto-dismiss duration in ms (4s). */
export const TOAST_DURATION = 4_000;

/* ─── React Query ──────────────────────────────────────────── */

/** Query stale time in ms (5 min). */
export const QUERY_STALE_TIME = 1000 * 60 * 5;

/** Whether to retry failed queries. */
export const QUERY_RETRY = false;

/** Whether to refetch queries on window focus. */
export const QUERY_REFETCH_ON_FOCUS = false;

/* ─── Theme ────────────────────────────────────────────────── */

/** Meta theme-color for light mode. */
export const THEME_COLOR_LIGHT = "#3B82F6";

/** Meta theme-color for dark mode. */
export const THEME_COLOR_DARK = "#1A1A2E";

/* ─── localStorage Keys ────────────────────────────────────── */

export const STORAGE_KEY_THEME = "my-calendar-theme";
export const STORAGE_KEY_LOCALE = "my-calendar-locale";
export const STORAGE_KEY_DEVICE_ID = "my-calendar-device-id";
