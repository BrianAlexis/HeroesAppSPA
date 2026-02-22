import { useQuery } from "@tanstack/react-query"
import { getSearchFilterOptionsAction } from "../actions/get-search-filter-options.action"

export const useSearchFilterOptions = () => {
    const query = useQuery({
        queryKey: ["search-filter-options"],
        queryFn: getSearchFilterOptionsAction,
        staleTime: 1000 * 60 * 5,
    })

    return {
        teams: query.data?.teams ?? [],
        categories: query.data?.categories ?? [],
        universes: query.data?.universes ?? [],
        statuses: query.data?.statuses ?? [],
        isLoading: query.isLoading,
        error: query.error,
    }
}
