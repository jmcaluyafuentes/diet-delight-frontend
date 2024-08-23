import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const PreviewRecipes = ({ recipes }) => {
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

    if (recipes.length === 0) {
        return (
        <>
            <div className="container">
            <p className="has-text-centered">No recipes found.</p>
            </div>
            <div className="mt-6 pt-6">
            <Footer />
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
                            <p className="title is-4">{recipe.title}</p>
                        </div>
                        </div>
                        <div className="content">
                        <h5 className="title is-5">Nutrition:</h5>
                        <p>
                            Calories: {`${recipe.caloriesPerServing.toFixed(2)} kcal/serving`}
                        </p>
                        <p>Serving Size: {recipe.servingSize}</p>

                        <h5 className="title is-5">Diet and Health Information:</h5>
                        <p>
                            <strong>Diet Labels:</strong> {recipe.dietLabels.join(', ')}
                        </p>
                        <p>
                            <strong>Health Labels:</strong>{' '}
                            {recipe.healthLabels.join(', ')}
                        </p>

                        <h5 className="title is-5">Ingredients:</h5>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                            ))}
                        </ul>

                        <h5 className="title is-5">Preparation:</h5>
                        <a
                            href={recipe.instructionsUrl}
                            className="button is-primary ml-4"
                        >
                            See instructions
                        </a>
                        <p className="mt-2 ml-4">
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
                        >
                            {selectedRecipes.has(recipe.instructionsUrl)
                            ? 'Remove from Print'
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
                className="button is-primary"
                disabled={selectedRecipes.size === 0}
            >
                Print to PDF
            </button>
            </div>
        </div>

        <div className="mt-6 pt-6">
            <Footer />
        </div>
        </>
    );
};

export default PreviewRecipes;
