import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
             <AuthProvider>
                <App />
                <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 2500,
                }}
            />
             </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);