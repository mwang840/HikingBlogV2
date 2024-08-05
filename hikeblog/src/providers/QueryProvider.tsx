"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

/**
 * Wraps the QueryClientProvider with it's children
 */
export const QueryProvider = ({
    children,
}: React.PropsWithChildren): JSX.Element => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
