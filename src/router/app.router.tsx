import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import HeroesLayout from "@/heroes/layouts/HeroesLayout";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"))
const HomePage = lazy(() => import("@/heroes/pages/hero/home/HomePage"))
const HeroPage = lazy(() => import("@/heroes/pages/hero/HeroPage"))
const AdminPage = lazy(() => import("@/admin/pages/AdminPage"))
const AdminLayout = lazy(() => import("@/admin/layouts/AdminLayout"))


export const appRouter = createBrowserRouter([


    {
        path: "/",
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "heroes/1/",
                element: <HeroPage />,
            },
            {
                path: "search/",
                element: <SearchPage />,
            },
        ],
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    },
])