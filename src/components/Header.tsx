import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const {pathname} = useLocation()

    const isHome = useMemo(() => pathname === '/' ,[pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'All fields must be completed',
                error: true
            })
            return
        }
        // consultar recetas
        searchRecipes(searchFilters)        
    }

  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'} >
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img src="/logo.svg" alt="logotipo" className="w-32" />
                </div>

                <nav className="flex gap-4">
                    <NavLink
                        to={'/'}
                        className={({isActive}) =>
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }
                    >Home</NavLink>
                    <NavLink
                        to={'/favoritos'}
                        className={({isActive}) =>
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }
                    >Favorites</NavLink>

                    <NavLink
                        to={'/generate'}
                        className={({isActive}) =>
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }
                    >Generate with AI</NavLink>

                </nav>
            </div>
            {isHome && (
                <form
                    className=" md:w-1/2 2xl:1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-4">
                        <label
                            htmlFor="ingredient"
                            className="block text-white uppercase font-extrabold text-lg"
                        >Drink name or Ingredients</label>
                        <input
                            id="ingredient"
                            type="text"
                            name="ingredient"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Drink name or Ingredient. Ej. Vodka, Tequila, Coffee"
                            onChange={handleChange}
                            value={searchFilters.ingredient}
                        />
                    </div>

                    <div className="space-y-4">
                        <label
                            htmlFor="category"
                            className="block text-white uppercase font-extrabold text-lg"
                        >Category</label>
                        <select
                            id="category"
                            name="category"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handleChange}
                            value={searchFilters.category}
                        >
                            <option>-- Select an option--</option>
                            {categories.drinks.map(category => (
                                <option
                                    key={category.strCategory}
                                    value={category.strCategory}
                                >{category.strCategory}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="submit"
                        value={'search'}
                        className="cursor-pointer bg-orange-600 hover:bg-white text-white hover:text-orange-600 font-extrabold w-full p-2 rounded-lg uppercase transition-all"
                    />
                </form>
            )}
        </div>
    </header>
  )
}
