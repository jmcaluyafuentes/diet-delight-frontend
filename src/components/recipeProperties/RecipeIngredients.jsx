import React from 'react'

const RecipeIngredients = ({ recipe }) => {
    return (
    <>
        <h5 className="title is-5 has-text-centered">Ingredients:</h5>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
    </>
    )
}

export default RecipeIngredients
