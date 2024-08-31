import React from 'react'

const RecipeDishClassifications = ({ recipe }) => {
    return (
    <>
        <h5 className="title is-5 has-text-centered">Dish Classification:</h5>
        <p> 
            Dish Type: {recipe.dishType.map(dish => dish.charAt(0).toUpperCase() + dish.slice(1)).join(', ')}<br />
            Meal Type: {recipe.mealType.map(meal => meal.charAt(0).toUpperCase() + meal.slice(1)).join(", ")}<br />
            Cuisine: {recipe.cuisineType.map(cuisine => cuisine.charAt(0).toUpperCase() + cuisine.slice(1)).join(', ')}<br />
        </p>
    </>
    )
}

export default RecipeDishClassifications
