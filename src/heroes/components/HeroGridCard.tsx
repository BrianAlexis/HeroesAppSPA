import { use } from "react"
import { useNavigate } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Brain, Gauge, Heart, Shield, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { Hero } from "../types/hero.interface"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"
import { useSound } from "../hooks/useSound"

interface Props {
    hero: Hero;
}

const HeroGridCard = ({ hero }: Props) => {

    const popSound = useSound('/sounds/success.mp3');



    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = use(FavoriteHeroContext)

    const handeClick = () => {
        navigate(`/heroes/${hero.slug}`)
    }

    return (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50 dark:from-card dark:to-muted/30" >
            <div className="relative h-64">
                <img
                    src={hero.image}
                    alt={hero.name}
                    className="object-cover transition-all duration-500 group-hover:scale-110 absolute top-[-30px] w-full h-[410px]"
                    onClick={handeClick}
                />

                {/* Status indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${hero.status === "Active" ? 'bg-green-500' : 'bg-red-500'}`} />
                    <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700 dark:bg-black/40 dark:text-gray-200">
                        {hero.status}
                    </Badge>
                </div>

                {/* Universe badge */}
                <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">{hero.universe}</Badge>

                {/* Favorite button */}
                <Button
                    size="sm"
                    variant="ghost"
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white dark:bg-black/90 dark:hover:bg-black/50"
                    onClick={() => toggleFavorite(hero)}
                    onClickCapture={popSound}
                >
                    <Heart
                        className={`h-4 w-4 ${isFavorite(hero)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500 dark:text-gray-400"
                            }`} />
                </Button>
            </div>

            <CardHeader className="py-3 z-10 bg-gray-100/50 dark:bg-muted/50 backdrop-blur-sm relative top-1 group-hover:top-[-10px] transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg leading-tight text-foreground">{hero.alias}</h3>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">{hero.name}</p>
                    </div>
                    <Badge className="text-xs bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700">{hero.category}</Badge>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                    {hero.team}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-muted-foreground line-clamp-2">
                    {hero.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-orange-500" />
                            <span className="text-xs font-medium text-foreground">Strength</span>
                        </div>
                        <Progress value={hero.strength * 10} className="h-2" activeColor="bg-orange-500" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1">
                            <Brain className="h-3 w-3 text-blue-500" />
                            <span className="text-xs font-medium text-foreground">Intelligence</span>
                        </div>
                        <Progress value={hero.intelligence * 10} className="h-2" activeColor="bg-blue-500" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1">
                            <Gauge className="h-3 w-3 text-green-500" />
                            <span className="text-xs font-medium text-foreground">Speed</span>
                        </div>
                        <Progress value={hero.speed * 10} className="h-2" activeColor="bg-green-500" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-purple-500" />
                            <span className="text-xs font-medium text-foreground">Durability</span>
                        </div>
                        <Progress value={hero.durability * 10} className="h-2" activeColor="bg-purple-500" />
                    </div>
                </div>

                {/* Powers */}
                <div className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">Powers:</h4>
                    <div className="flex flex-wrap gap-1">

                        {hero.powers.slice(0, 3).map(power => (
                            <Badge variant="outline" className="text-xs" key={power}>
                                {power}
                            </Badge>
                        ))}

                        {hero.powers.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-muted">
                                +{hero.powers.length - 3} more
                            </Badge>
                        )}

                    </div>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t">First appeared: {hero.firstAppearance}</div>
            </CardContent>
        </Card >
    )
}
export default HeroGridCard