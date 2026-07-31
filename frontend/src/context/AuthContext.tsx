import {
    createContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import { getToken, removeToken } from "../utils/token";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

    const token = getToken();

    setIsAuthenticated(!!token);

}, []);

const login = () => {
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