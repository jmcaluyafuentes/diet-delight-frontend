import React from 'react'

const RecipeDietLabels = ({ recipe }) => {
  return (
    <p><strong>Diet Labels: </strong> {recipe.dietLabels.join(', ')}</p>
  )
}

export default RecipeDietLabels