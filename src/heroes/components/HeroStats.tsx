import { use } from "react"
import useHeroSummary from "../hooks/useHeroSummary"

import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import HeroStatCard from "./HeroStatCard"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"

const HeroStats = () => {

    const { data: summary } = useHeroSummary()
    const { favoriteCount } = use(FavoriteHeroContext)

    if (!summary) {
        return <div>Loading...</div>
    }

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <HeroStatCard
                title="Total Characters"
                icon={<Users className="h-4 w-4 text-purple-500" />}>

                <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summary?.heroCount} Heroes
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summary?.villainCount} Villains
                    </Badge>
                </div>
            </HeroStatCard>

            <HeroStatCard
                title="Favorites"
                icon={<Heart className="h-4 w-4 text-red-500" />}>

                <div className="text-2xl font-bold text-red-500">{favoriteCount}</div>
                <p className="text-xs text-muted-foreground">{((favoriteCount / summary.totalHeroes) * 100).toFixed(2)}% of total</p>
            </HeroStatCard>

            <HeroStatCard
                title="Strongest Hero"
                icon={<Zap className="h-4 w-4 text-orange-500" />}>

                <div className="text-lg font-bold text-orange-500">{summary?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}</p>
            </HeroStatCard>

            <HeroStatCard
                title="Intelligentest Hero"
                icon={<Trophy className="h-4 w-4 text-blue-500" />}>

                <div className="text-lg font-bold text-blue-500">{summary?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summary?.strongestHero.intelligence}</p>
            </HeroStatCard>
        </div>
    )
}
export default HeroStats