import React from 'react'

const RecipeTitle = ({ recipe, div1Style, div2Style, pStyle }) => {
    return (
    <div className={div1Style}>
        <div className={div2Style}>
            <p className={pStyle}>{recipe.title}</p>
        </div>
    </div>
    )
}

export default RecipeTitle
