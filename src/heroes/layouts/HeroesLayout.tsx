import CustomMenu from "@/components/custom/CustomMenu"
import { Outlet } from "react-router"

const HeroesLayout = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-7xl mx-auto p-6"></div>
            <CustomMenu />

            <Outlet />

        </div>
    )
}
export default HeroesLayout