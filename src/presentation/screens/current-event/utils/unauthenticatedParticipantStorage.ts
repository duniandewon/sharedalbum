export interface UnauthenticatedParticipant {
    id: string;
    displayName: string;
}

const STORAGE_KEY = "unauthedParticipant";

export function saveUnauthenticatedParticipant(participant: UnauthenticatedParticipant) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(participant));
    } catch (error) {
        console.error("Failed to save unauthenticated participant:", error);
    }
}

export function getUnauthenticatedParticipant(): UnauthenticatedParticipant | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error("Failed to retrieve unauthenticated participant:", error);
        return null;
    }
}

export function removeUnauthenticatedParticipant() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to remove unauthenticated participant:", error);
    }
}

export function unauthenticatedParticipantExist() {
    return getUnauthenticatedParticipant() !== null
}