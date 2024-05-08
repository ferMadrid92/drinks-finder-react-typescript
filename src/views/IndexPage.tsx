import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {

  const drinks = useAppStore((state) => state.drinks.drinks)
  const hasDrinks = useMemo(() => drinks.length , [drinks])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Recipes</h1>
      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10">
          {drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className="my-20 text-center text-2xl">Use the search form to discover new recipes</p>
      )}
    </>
  )
}
