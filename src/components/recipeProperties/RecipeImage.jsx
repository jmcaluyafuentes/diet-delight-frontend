import React from 'react'

const RecipeImage = ({ recipe }) => {
  return (
    <div className="card-image">
        <figure className="image">
            <img src={recipe.image} alt={recipe.title} />
        </figure>
    </div>
  )
}

export default RecipeImage
