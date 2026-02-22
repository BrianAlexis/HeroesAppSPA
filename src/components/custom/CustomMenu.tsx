import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"
import { useSound } from "@/heroes/hooks/useSound"


const CustomMenu = () => {
    const keyboardTypingSound = useSound('/sounds/keyboard_typing.mp3');

    const { pathname } = useLocation()
    const { theme, toggleTheme } = useTheme()

    const isActive = (path: string) => pathname === path

    const activeClass = "bg-accent text-accent-foreground"

    return (
        <NavigationMenu className="py-5 mx-auto max-w-7xl w-full">
            <NavigationMenuList className="w-full justify-start gap-2">
                <NavigationMenuItem>
                    <NavigationMenuLink
                        onClickCapture={keyboardTypingSound}
                        asChild
                        className={cn(isActive("/") && activeClass, "p-2 rounded-md")}>
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        onClickCapture={keyboardTypingSound}
                        asChild
                        className={cn(isActive("/search") && activeClass, "p-2 rounded-md")}>
                        <Link to="/search">Search</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="ml-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        className="shrink-0"
                        onClickCapture={keyboardTypingSound}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
export default CustomMenu