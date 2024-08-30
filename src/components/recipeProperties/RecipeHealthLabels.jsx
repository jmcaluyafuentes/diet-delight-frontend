import React from 'react'

const RecipeHealthLabels = ({ recipe }) => {
    return (
        <p><strong>Health Labels: </strong>{recipe.healthLabels.join(', ')}</p>
    )
}

export default RecipeHealthLabels
