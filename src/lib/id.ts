/**
 * Generate a new UUID v4 using the native crypto API.
 *
 * @returns A new UUID string.
 */
export function generateId(): string {
    return crypto.randomUUID();
}
