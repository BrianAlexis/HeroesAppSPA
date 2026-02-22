import { useRef } from "react"
import { useSearchParams } from "react-router"

import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion"

import { useSearchFilterOptions } from "@/heroes/hooks/useSearchFilterOptions"

import { useSound } from "@/heroes/hooks/useSound"

export const SearchControls = () => {
    const keyboardTypingSound = useSound('/sounds/keyboard_typing.mp3');
    const popSound = useSound('/sounds/success.mp3');

    const [searchParams, setSearchParams] = useSearchParams()
    const { teams, categories, universes, statuses } = useSearchFilterOptions()

    const inputRef = useRef<HTMLInputElement>(null)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        keyboardTypingSound()
        if (event.key === "Enter") {
            const value = inputRef.current?.value ?? "";
            setSearchParams(prev => {
                event.preventDefault()
                prev.set("name", value)
                return prev
            })
        }
    }

    const activeAccordion = searchParams.get("active-accordion") ?? ""
    const selectedStrength = Number(searchParams.get("strength") ?? "1")

    const setQueryParams = (name: string, value: string) => {
        setSearchParams((prev) => {
            prev.set(name, value)
            return prev
        })
    }

    const clearAllFilters = () => {
        setSearchParams({ "active-accordion": "advance-filters", "strength": "1" })
        if (inputRef.current) inputRef.current.value = ""
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-8" >
                {/* Search */}
                < div className="relative flex-1" >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

                    <Input
                        ref={inputRef}
                        placeholder="Search heroes, villains, powers, teams..."
                        className="pl-12 h-12 text-lg bg-white"
                        onKeyDown={handleKeyDown}
                        defaultValue={searchParams.get("name") ?? ""} />
                </div >

                {/* Action buttons */}
                <div className="flex gap-2" >
                    <Button variant={activeAccordion === "advance-filters" ? "default" : "outline"} className="h-12"
                        onClick={() => {
                            popSound()
                            if (activeAccordion === "advance-filters") {
                                setQueryParams("active-accordion", "")
                                return
                            }

                            setQueryParams("active-accordion", "advance-filters")
                        }}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                </div >
            </div >

            <Accordion type="single" collapsible value={activeAccordion}>
                <AccordionItem value="advance-filters">
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border dark:bg-muted/50 dark:border-border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button
                                    variant="ghost"
                                    onClick={clearAllFilters}>Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Team</label>
                                    <select
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={searchParams.get("team") ?? ""}
                                        onChange={(e) => setQueryParams("team", e.target.value)}
                                    >
                                        <option value="">All teams</option>
                                        {teams.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <select
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={searchParams.get("category") ?? ""}
                                        onChange={(e) => setQueryParams("category", e.target.value)}
                                    >
                                        <option value="">All categories</option>
                                        {categories.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Universe</label>
                                    <select
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={searchParams.get("universe") ?? ""}
                                        onChange={(e) => setQueryParams("universe", e.target.value)}
                                    >
                                        <option value="">All universes</option>
                                        {universes.map((u) => (
                                            <option key={u} value={u}>{u}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <select
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={searchParams.get("status") ?? ""}
                                        onChange={(e) => setQueryParams("status", e.target.value)}
                                    >
                                        <option value="">All statuses</option>
                                        {statuses.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium dark:text-foreground">Minimum Strength: {selectedStrength}/10</label>
                                <Slider
                                    onClickCapture={keyboardTypingSound}
                                    defaultValue={[selectedStrength]}
                                    onValueChange={value => setQueryParams("strength", value[0].toString())}
                                    max={10}
                                    step={1}
                                    className="pt-4"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </>

    )
}
export default SearchControls