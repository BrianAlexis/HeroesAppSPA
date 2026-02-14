import CustomJumbotrom from "@/components/custom/CustomJumbotrom"
import HeroStats from "@/heroes/components/HeroStats"
import SearchControls from "./ui/SearchControls"

const SearchPage = () => {
    return (

        <>
            <CustomJumbotrom
                title="Busqueda de Súper Heroes"
                description="Descubre, explora y administra súper heroes" />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />
        </>

    )
}
export default SearchPage