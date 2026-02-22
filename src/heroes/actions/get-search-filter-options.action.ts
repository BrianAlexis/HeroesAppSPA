import { heroAPI } from "../api/hero.api"
import type { HeroesResponse } from "../types/get-heroes-response"

export interface SearchFilterOptions {
    teams: string[]
    categories: string[]
    universes: string[]
    statuses: string[]
}

const uniqueSorted = (values: string[]) =>
    [...new Set(values)].filter(Boolean).sort()

export const getSearchFilterOptionsAction = async (): Promise<SearchFilterOptions> => {
    const { data } = await heroAPI.get<HeroesResponse>("/", {
        params: {
            limit: 500,
            offset: 0,
            category: "all",
        },
    })

    const heroes = data.heroes

    return {
        teams: uniqueSorted(heroes.map((h) => h.team)),
        categories: uniqueSorted(heroes.map((h) => h.category)),
        universes: uniqueSorted(heroes.map((h) => h.universe)),
        statuses: uniqueSorted(heroes.map((h) => h.status)),
    }
}
