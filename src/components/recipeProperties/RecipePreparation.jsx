import React from 'react'

const RecipePreparation = ({ recipe }) => {
    return (
    <>
        <h5 className="title is-5 has-text-centered">Preparation:</h5>
        <div className="has-text-centered">
            <a
                href={recipe.instructionsUrl}
                className="tag is-info ml-4"
                target="_blank"
            >
                See instructions
            </a>
        </div>
    </>
    )
}

export default RecipePreparation