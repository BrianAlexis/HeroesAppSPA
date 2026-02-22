import { describe, expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react"
import useHeroSummary from "./useHeroSummary";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const tanStackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            }
        }
    })

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe("useHeroSummary", () => {

    test("should return the initial state (isLoading)", () => {

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        })

        expect(result.current.isLoading).toBe(true)
    })


    test("should return success state with data when API call succeeds", async () => {

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

    })
})