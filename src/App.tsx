import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "@/components/common";
import {
    QUERY_STALE_TIME,
    QUERY_RETRY,
    QUERY_REFETCH_ON_FOCUS,
} from "@/core/settings";
import { router } from "@/router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: QUERY_STALE_TIME,
            retry: QUERY_RETRY,
            refetchOnWindowFocus: QUERY_REFETCH_ON_FOCUS,
        },
    },
});

export function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer />
        </QueryClientProvider>
    );
}
