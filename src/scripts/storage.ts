export function savePreference(key: string, value: string): boolean {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Failed to save preference [${key}]:`, error);
        return false;
    }
}

export function getPreference(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Failed to get preference [${key}]:`, error);
        return null;
    }
}
