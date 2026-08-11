const TOKEN_KEY = "token";

export function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

export function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        if (!payload.exp) {
            return true;
        }

        return payload.exp * 1000 < Date.now();

    } catch {
        return true;
    }
}