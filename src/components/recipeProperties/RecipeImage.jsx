import React from 'react'

const RecipeImage = ({ recipe, divStyle, figureStyle }) => {
  return (
    <div className={divStyle}>
        <figure className={figureStyle}>
            <img src={recipe.image} alt={recipe.title} />
        </figure>
    </div>
  )
}

export default RecipeImage
