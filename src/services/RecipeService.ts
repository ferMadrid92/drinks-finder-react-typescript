import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../schemas/recipes-schema"
import { Drink, Drinks, SearchFilter } from "../types"

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success) {
        return result.data
    }
}

//si la API permitiera utilizar multiples parametros en la peticion:
// export async function getRecipes(filters: SearchFilter) {
//     const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
//     const { data } = await axios(url)
//     const result = DrinksAPIResponse.safeParse(data)
//     if(result.success) {
//         return result.data
//     }
// }

export async function getRecipes(filters: SearchFilter) {
    const urlCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}`
    const { data } = await axios(urlCategory)
    const categoryResult = DrinksAPIResponse.safeParse(data)

    if (!categoryResult.success) {
        throw new Error('Error al validar la respuesta de la categoría')
    }
    const filterByCategory = categoryResult.data.drinks

    const urlIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}`
    const { data: ingredientsData } = await axios(urlIngredient)
    const ingredientsResult = DrinksAPIResponse.safeParse(ingredientsData)

    if (!ingredientsResult.success) {
        throw new Error('Error al validar la respuesta del ingrediente')
    }
    const filterByIngredient = ingredientsResult.data.drinks

    const result = filterByCategory.filter((drink: Drink) => filterByIngredient.some((filteredDrink : Drink) => filteredDrink.idDrink === drink.idDrink))

    const formattedResult: Drinks = {
        drinks: result.map(drink => ({
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strDrinkThumb: drink.strDrinkThumb
        }))
    }

    return formattedResult
}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result.success) {
        return result.data
    }
}