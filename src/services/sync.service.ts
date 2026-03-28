import { STORAGE_KEY_DEVICE_ID } from "@/core/settings";
import type { SyncMetadata } from "@/core/types";
import { generateId } from "@/lib/id";

/**
 * Get or create a persistent device ID.
 *
 * @returns The device UUID.
 */
function getDeviceId(): string {
    let deviceId = localStorage.getItem(STORAGE_KEY_DEVICE_ID);

    if (!deviceId) {
        deviceId = generateId();
        localStorage.setItem(STORAGE_KEY_DEVICE_ID, deviceId);
    }

    return deviceId;
}

/** Stub service for future API sync. */
export const syncService = {
    /**
     * Sync all local changes with the remote API.
     * Currently a no-op stub.
     */
    async syncAll(): Promise<void> {
        console.info("[sync] Sync not yet enabled");
    },

    /**
     * Get current sync metadata.
     *
     * @returns Sync metadata including device ID.
     */
    getSyncMetadata(): SyncMetadata {
        return {
            lastSyncedAt: null,
            deviceId: getDeviceId(),
            syncVersion: 0,
        };
    },
};
