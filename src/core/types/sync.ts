/**
 * Sync status for local-first architecture.
 * Every syncable entity carries this.
 */
export type SyncStatus =
    | "local"
    | "synced"
    | "modified"
    | "deleted"
    | "conflict";

/** Metadata for tracking sync state (future use). */
export interface SyncMetadata {
    lastSyncedAt: string | null;
    deviceId: string;
    syncVersion: number;
}
