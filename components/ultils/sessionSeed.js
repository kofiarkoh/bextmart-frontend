export function getSessionSeed(key) {
    if (typeof window === "undefined") return undefined;
    try {
        let seed = window.sessionStorage.getItem(key);
        if (!seed) {
            seed = String(Math.floor(Math.random() * 2147483647));
            window.sessionStorage.setItem(key, seed);
        }
        return seed;
    } catch {
        return undefined;
    }
}
