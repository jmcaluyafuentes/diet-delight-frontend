import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowRecipes.css'

const ShowRecipes = ({ recipes }) => {
    const [selectedRecipes, setSelectedRecipes] = useState(new Set());
    const navigate = useNavigate();

    const handleAddToPrint = (recipeIdentifier) => {
        if (recipeIdentifier == null) {
            console.error("Recipe identifier is undefined or null");
            return;
        }

        setSelectedRecipes((prevSelected) => {
        const updatedSelections = new Set(prevSelected);
        if (updatedSelections.has(recipeIdentifier)) {
            updatedSelections.delete(recipeIdentifier);
        } else {
            updatedSelections.add(recipeIdentifier);
        }
        return updatedSelections;
        });
    };

    const handlePrintToPDF = () => {
        const selectedRecipeDetails = recipes.filter((recipe) =>
        selectedRecipes.has(recipe.instructionsUrl) // Use unique property
        );
        navigate('/print', { state: { recipes: selectedRecipeDetails } });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (recipes.length === 0) {
        return (
        <>
            <div className="container">
                <p className="has-text-centered">Sorry, there are no recipes found. Please try other criteria.</p>
            </div>
                <div className="mt-6 pt-6">
            </div>
        </>
        );
    }

    return (
        <>
        <div className="container">
            <div className="columns is-multiline">
            {recipes.map((recipe) => {
                if (recipe.instructionsUrl == null) {
                console.error("Recipe identifier is missing:", recipe);
                }
                return (
                <div key={recipe.instructionsUrl} className="column is-one-third">
                    <div className="recipe card">
                    <div className="card-image">
                        <figure className="image">
                            <img src={recipe.image} alt={recipe.title} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4 has-text-centered">{recipe.title}</p>
                            </div>
                        </div>
                        <div className="content">
                            <h5 className="title is-5 has-text-centered">Nutrition:</h5>
                            <p>Calories: {`${recipe.caloriesPerServing.toFixed(2)} kcal/serving`}</p>
                            <p>Serving Size: {recipe.servingSize}</p>

                            <h5 className="title is-5 has-text-centered">Diet and Health Information:</h5>
                            <p><strong>Diet Labels: </strong> {recipe.dietLabels.join(', ')}</p>
                            <p><strong>Health Labels: </strong>{recipe.healthLabels.join(', ')}</p>

                            <h5 className="title is-5 has-text-centered">Dish Classification:</h5>
                            <p> 
                                Dish Type: {recipe.dishType.map(dish => dish.charAt(0).toUpperCase() + dish.slice(1)).join(', ')}<br />
                                Meal Type: {recipe.mealType.map(meal => meal.charAt(0).toUpperCase() + meal.slice(1)).join(", ")}<br />
                                Cuisine: {recipe.cuisineType.map(cuisine => cuisine.charAt(0).toUpperCase() + cuisine.slice(1)).join(', ')}<br />
                            </p>

                            <h5 className="title is-5 has-text-centered">Ingredients:</h5>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>

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
                        </div>
                        <div className="has-text-centered mt-3">
                        <button
                            onClick={() => handleAddToPrint(recipe.instructionsUrl)} // Use unique property
                            className={`button is-link ${
                            selectedRecipes.has(recipe.instructionsUrl) ? 'is-danger' : ''
                            }`}
                            id="btn-add-to-print"
                        >
                            {selectedRecipes.has(recipe.instructionsUrl)
                            ? 'Remove'
                            : 'Add to Print'}
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>

            <div className="has-text-centered mb-4">
            <button
                onClick={handlePrintToPDF}
                className="button is-primary mt-5 mb-5 is-medium"
                disabled={selectedRecipes.size === 0}
                id="btn-print-to-pdf"
            >
                Print to PDF
            </button>
            <br />
            <button onClick={scrollToTop} className="button is-link mt-5 is-medium">Return to Top</button>
            </div>
        </div>
        </>
    );
};

export default ShowRecipes;
