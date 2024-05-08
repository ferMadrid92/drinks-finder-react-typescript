import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites] )

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favorites</h1>

      {hasFavorites ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10">
              {favorites.map(drink => (
                <DrinkCard
                  key={drink.idDrink}
                  drink={drink}
                />
              ))}
            </div>
      ) : (
        <p className="my-20 text-center text-2xl">Favorites will shown here</p>
      )}
    </>
  )
}
