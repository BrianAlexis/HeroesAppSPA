import CustomJumbotrom from "@/components/custom/CustomJumbotrom"
import HeroStats from "@/heroes/components/HeroStats"
import SearchControls from "./ui/SearchControls"
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"
import HeroGrid from "@/heroes/components/HeroGrid"

const SearchPage = () => {
    return (

        <div className="max-w-7xl mx-auto p-6">
            < CustomJumbotrom
                title="SuperHeroes Search"
                description="Search and explore superheroes and villains" />

            <CustomBreadcrumbs
                currentPage="Search"
            // breadcrumbs={[
            //     { label: "home", to: "/" },
            //     { label: "home", to: "/" },
            //     { label: "home", to: "/" },
            // ]}
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            <HeroGrid heroes={[]} />
        </div >

    )
}
export default SearchPage