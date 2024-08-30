import React, { useState } from 'react';
import DisplayErrorMessage from '../components/DisplayErrorMessage';
import AddToPrintButton from '../components/AddToPrintButton';
import PrintToPDFButton from '../components/PrintToPDFButton';
import './ShowRecipes.css'

const ShowRecipes = ({ recipes }) => {
    const [selectedRecipes, setSelectedRecipes] = useState(new Set());

    // const handleAddToPrint = (recipeIdentifier) => {
    //     setSelectedRecipes((prevSelected) => {
    //         const updatedSelections = new Set(prevSelected);
    //         if (updatedSelections.has(recipeIdentifier)) {
    //             updatedSelections.delete(recipeIdentifier);
    //         } else {
    //             updatedSelections.add(recipeIdentifier);
    //         }
    //         return updatedSelections;
    //     });
    // };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (recipes.length === 0) {
        return (
            <DisplayErrorMessage message={'Sorry, there are no recipes found. Please try other criteria.'} style={'no-recipe-found'}/>
        );
    }

    return (
        <div className="container">
            <div className="columns is-multiline">
            {recipes.map((recipe) => {
                return (
                    <div key={recipe.instructionsUrl} className="column is-one-third-desktop is-half-tablet">
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
                                <AddToPrintButton
                                    recipe={recipe}
                                    setSelectedRecipes={setSelectedRecipes}
                                    isSelected={selectedRecipes.has(recipe.instructionsUrl)}
                                    // onClick={() => handleAddToPrint(recipe.instructionsUrl)}
                                />
                            </div>
                            
                        </div>
                        </div>
                    </div>
                );
            })}
            </div>

            <div className="has-text-centered mb-4">
                <PrintToPDFButton
                    recipes={recipes}
                    selectedRecipes={selectedRecipes}
                    isDisabled={selectedRecipes.size === 0}
                />  
                <br />
            <button onClick={scrollToTop} className="button is-link mt-5 is-medium">Return to Top</button>
            </div>

        </div>
    );
};

export default ShowRecipes;
