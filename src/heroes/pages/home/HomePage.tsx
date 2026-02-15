import { useState } from "react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CustomJumbotrom from "@/components/custom/CustomJumbotrom"
import HeroStats from "@/heroes/components/HeroStats"
import HeroGrid from "@/heroes/components/HeroGrid"
import CustomPagination from "@/components/custom/CustomPagination"
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs"

const HomePage = () => {

    const [activeTab, setActiveTab] = useState<
        "all" |
        "favorites" |
        "heroes" |
        "villains">("all")

    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <CustomJumbotrom
                    title="SuperHeroes Universe"
                    description="Discover, explore, and manage superheroes and villains" />

                <CustomBreadcrumbs currentPage="SuperHeroes" />

                {/* Stats Dashboard */}
                <HeroStats />


                {/* Tabs */}
                <Tabs value={activeTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            onClick={() => setActiveTab("all")}>All Characters (16)</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2"
                            onClick={() => setActiveTab("favorites")}>
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger value="heroes"
                            onClick={() => setActiveTab("heroes")}>Heroes (12)</TabsTrigger>
                        <TabsTrigger value="villains"
                            onClick={() => setActiveTab("villains")}>Villains (2)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Show all characters */}
                        <HeroGrid />
                    </TabsContent>

                    <TabsContent value="favorites">
                        {/* Show all favorite characters */}
                        <h1>Favorites</h1>
                        <HeroGrid />
                    </TabsContent>

                    <TabsContent value="heroes">
                        {/* Show all heroes characters */}
                        <h1>Heroes</h1>
                        <HeroGrid />
                    </TabsContent>

                    <TabsContent value="villains">
                        {/* Show all villains characters */}
                        <h1>Villains</h1>
                        <HeroGrid />
                    </TabsContent>
                </Tabs>

                <CustomPagination totalPages={8} />
            </div>
        </>
    )
}
export default HomePage