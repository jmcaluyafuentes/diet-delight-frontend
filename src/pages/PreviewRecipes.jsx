import React from 'react';
import Footer from '../components/Footer.jsx';

const PreviewRecipes = ({ recipes }) => {
    if (recipes.length === 0) {
        return (
        <>
            <div className="container"><p className="has-text-centered">No recipes found.</p></div>
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
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="column is-one-third">
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
                                        <p>Calories: {`${recipe.caloriesPerServing.toFixed(2)} kcal`}</p>
                                        <p>Serving Size: {recipe.servingSize}</p>

                                        <h5 className="title is-5">Diet and Health Information:</h5>
                                        <p><strong>Diet Labels:</strong> {recipe.dietLabels.join(', ')}</p>
                                        <p><strong>Health Labels:</strong> {recipe.healthLabels.join(', ')}</p>

                                        <h5 className="title is-5">Ingredients:</h5>
                                        <ul>
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>

                                        <h5 className="title is-5">Preparation:</h5>
                                        <a href={recipe.instructionsUrl} className="button is-primary ml-4">
                                            See instructions
                                        </a>
                                        <p className="mt-2 ml-4">Source: <a href={recipe.instructionsUrl} target="_blank" rel="noopener noreferrer" className="has-text-info"><em>{recipe.source}</em></a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 pt-6">
                <Footer />
            </div>
        </>
    );
};

export default PreviewRecipes;
