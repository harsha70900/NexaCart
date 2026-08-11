import {
    createContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import {
    getToken,
    saveToken,
    removeToken,
    isTokenExpired,
} from "../utils/token";

import type { AuthResponse } from "../types/auth";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (response: AuthResponse) => void;
    logout: () => void;
}

export const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    useEffect(() => {

        const token = getToken();

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        if (isTokenExpired(token)) {
            removeToken();
            setIsAuthenticated(false);
            return;
        }

        setIsAuthenticated(true);

    }, []);

    const login = (response: AuthResponse) => {

        saveToken(response.token);

        setIsAuthenticated(true);

    };

    const logout = () => {

        removeToken();

        setIsAuthenticated(false);

    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}