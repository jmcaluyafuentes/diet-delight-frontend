import React from 'react'

const RecipeCaloriesServing = ({ recipe }) => {
    return (
        <>
            <p>Calories: {`${recipe.caloriesPerServing.toFixed(2)} kcal/serving`}</p>
            <p>Serving Size: {recipe.servingSize}</p>
        </>
    )
}

export default RecipeCaloriesServing
