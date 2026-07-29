import api from "./axios";
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
} from "../types/auth";

export async function login(
    request: LoginRequest
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        "/auth/login",
        request
    );

    return response.data;
}

export async function register(
    request: RegisterRequest
): Promise<{ message: string }> {

    const response = await api.post(
        "/auth/register",
        request
    );

    return response.data;
}