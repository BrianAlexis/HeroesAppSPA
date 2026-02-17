import CustomJumbotrom from "@/components/custom/CustomJumbotrom"
import HeroStats from "@/heroes/components/HeroStats"
import SearchControls from "./ui/SearchControls"
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"
import HeroGrid from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { searchHeroesAction } from "@/heroes/actions/search-heroes-action"

const SearchPage = () => {

    const [searchParams] = useSearchParams()
    const name = searchParams.get("name") ?? undefined
    const strength = searchParams.get("strength") ?? undefined

    const { data: heroes = [] } = useQuery({
        queryKey: ["search", { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5
    })

    return (

        <div className="max-w-7xl mx-auto p-6">
            < CustomJumbotrom
                title="SuperHeroes Search"
                description="Search and explore superheroes and villains" />

            <CustomBreadcrumbs
                currentPage="Search"
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            <HeroGrid heroes={heroes} />
        </div >

    )
}
export default SearchPage