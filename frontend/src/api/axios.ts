import axios from "axios";
import toast from "react-hot-toast";

import {
    getToken,
    removeToken,
} from "../utils/token";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }},
);


// ==========================================
// REQUEST INTERCEPTOR
// Attach JWT token to every API request
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ==========================================
// RESPONSE INTERCEPTOR
// Handle expired / invalid JWT
// ==========================================

let isSessionExpired = false;

api.interceptors.response.use(

    // Successful response
    (response) => {
        return response;
    },

    // Failed response
    (error) => {

        const status = error?.response?.status;
        const token = getToken();

        // Don't treat login failure as an expired session
        const isLoginRequest =
            error?.config?.url === "/auth/login";

        // JWT expired / invalid
        if (
            token &&
            !isLoginRequest &&
            (status === 401 || status === 403) &&
            !isSessionExpired
        ) {

            // Prevent multiple notifications
            isSessionExpired = true;

            // Remove expired JWT
            removeToken();

            // Show notification
            toast.error(
                "Your session has expired. Please log in again."
            );

            // Give the user time to see the notification
            setTimeout(() => {
                window.location.href = "/login";
            }, 2500);
        }

        return Promise.reject(error);
    }
);

export default api;