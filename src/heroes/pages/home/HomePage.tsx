import { useSearchParams } from "react-router"
import { use, useMemo } from "react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CustomJumbotrom from "@/components/custom/CustomJumbotrom"
import HeroStats from "@/heroes/components/HeroStats"
import HeroGrid from "@/heroes/components/HeroGrid"
import CustomPagination from "@/components/custom/CustomPagination"
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"
import useHeroSummary from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"


const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteCount, favorites } = use(FavoriteHeroContext)

    const activeTab = searchParams.get("tab") ?? "all"
    const page = searchParams.get("page") ?? "1"
    const limit = searchParams.get("limit") ?? "6"
    const category = searchParams.get("category") ?? "aa"

    const selectedTab = useMemo(() => {
        const validTabs = ["all", "favorites", "heroes", "villains"]
        return validTabs.includes(activeTab) ? activeTab : "all"

    }, [activeTab])


    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)

    const { data: summary } = useHeroSummary()

    return (
        <>
            <div className="max-w-7xl mx-auto p-6 bg-black">
                {/* Header */}
                <CustomJumbotrom
                    title="SuperHeroes Universe"
                    description="Discover, explore, and manage superheroes and villains" />

                <CustomBreadcrumbs currentPage="SuperHeroes" />

                {/* Stats Dashboard */}
                <HeroStats />


                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "all")
                                prev.set("category", "all")
                                prev.set("page", "1")
                                return prev
                            })
                            }
                        >
                            All Characters ({summary?.totalHeroes})
                        </TabsTrigger>

                        <TabsTrigger value="favorites" className="flex items-center gap-2"
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "favorites")
                                return prev
                            })
                            }
                        >
                            Favorites ({favoriteCount})
                        </TabsTrigger>

                        <TabsTrigger value="heroes"
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "heroes")
                                prev.set("category", "hero")
                                prev.set("page", "1")
                                return prev
                            })
                            }
                        >
                            Heroes ({summary?.heroCount})
                        </TabsTrigger>

                        <TabsTrigger value="villains"
                            onClick={() => setSearchParams((prev) => {
                                prev.set("tab", "villains")
                                prev.set("category", "villain")
                                prev.set("page", "1")
                                return prev
                            })
                            }
                        >
                            Villains ({summary?.villainCount})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Show all characters */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="favorites">
                        {/* Show all favorite characters */}
                        <h1>Favorites</h1>
                        <HeroGrid heroes={favorites} />
                    </TabsContent>

                    <TabsContent value="heroes">
                        {/* Show all heroes characters */}
                        <h1>Heroes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="villains">
                        {/* Show all villains characters */}
                        <h1>Villains</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {
                    selectedTab !== "favorites" && (
                        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
                    )
                }


            </div>
        </>
    )
}
export default HomePage