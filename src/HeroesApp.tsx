import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext"
import { ThemeProvider } from "./contexts/ThemeContext"

const queryClient = new QueryClient

const HeroesApp = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <FavoriteHeroProvider>
          <RouterProvider router={appRouter} />
          <ReactQueryDevtools initialIsOpen={false} />
        </FavoriteHeroProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
export default HeroesApp