import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
    QueryClient,
} from "@tanstack/react-query";

import {
    PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";

import {
    createAsyncStoragePersister,
} from "@tanstack/query-async-storage-persister";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";


// ============================================================
// React Query Client
// ============================================================

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {

            // Keep successfully fetched data in memory
            // for 24 hours.
            gcTime: 1000 * 60 * 60 * 24,

            // Consider data fresh for 5 minutes.
            // During this period React Query will not
            // unnecessarily refetch when the component mounts.
            staleTime: 1000 * 60 * 5,

            // If the backend is temporarily unavailable,
            // don't repeatedly retry the request too many times.
            retry: 1,
        },
    },
});


// ============================================================
// LocalStorage Persister
// ============================================================

const localStoragePersister =
    createAsyncStoragePersister({
        storage: window.localStorage,

        // Keep our cache separate from other
        // localStorage data used by the application.
        key: "nexacart-react-query-cache",

        // Don't write to localStorage on every tiny
        // cache update.
        throttleTime: 1000,
    });


// ============================================================
// Application
// ============================================================

ReactDOM.createRoot(
    document.getElementById("root")!
).render(

    <React.StrictMode>

        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister: localStoragePersister,

                // Persist only the public products query.
                // We intentionally do NOT persist cart,
                // orders, or other user-specific queries.
                dehydrateOptions: {
                    shouldDehydrateQuery: (query) =>
                        query.queryKey[0] === "products",
                },

                // Stored cache older than 24 hours
                // will be discarded.
                maxAge: 1000 * 60 * 60 * 24,
            }}
        >

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

        </PersistQueryClientProvider>

    </React.StrictMode>
);