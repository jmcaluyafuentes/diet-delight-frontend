import React from 'react'

const RecipeSource = ({ recipe }) => {
    return (
    <p className="mt-2 ml-4 has-text-centered">
        Source:{' '}
        <a
            href={recipe.instructionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="has-text-info"
        >
        <em>{recipe.source}</em>
        </a>
    </p>
    )
}

export default RecipeSource