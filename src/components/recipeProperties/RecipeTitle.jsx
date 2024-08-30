import React from 'react'

const RecipeTitle = ({ recipe }) => {
    return (
    <div className="media">
        <div className="media-content">
            <p className="title is-4 has-text-centered">{recipe.title}</p>
        </div>
    </div>
    )
}

export default RecipeTitle
