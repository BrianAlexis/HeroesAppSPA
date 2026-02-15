import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";

const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => pathname === path;

    return (
        <NavigationMenu>
            <NavigationMenuList>

                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(isActive("/") && "bg-slate-200", "p-2 rounded-md")}>
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(isActive("/search") && "bg-slate-200", "p-2 rounded-md")}>
                        <Link to="/search">Search</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu >

    )
}
export default CustomMenu