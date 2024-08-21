import React from 'react';

const PreviewRecipes = ({ recipes }) => {
    return (
        <div>
            {recipes.length === 0 ? (
                <p>No recipes found</p>
            ) : (
                recipes.map(recipe => (
                    <div key={recipe.title} className="recipe">
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                        <p>Calories: {recipe.calories}</p>
                        <p>Total Time: {recipe.totalTime} minutes</p>
                        <a href={recipe.instructionsUrl}>View Recipe</a>
                    </div>
                ))
            )}
        </div>
    );
};

export default PreviewRecipes;
