import React, { useState } from 'react';
import DisplayErrorMessage from '../components/DisplayErrorMessage';
import AddToPrintButton from '../components/AddToPrintButton';
import PrintToPDFButton from '../components/PrintToPDFButton';
import ButtonReturnToTop from '../components/ButtonReturnToTop';
import RecipeImage from '../components/recipeProperties/RecipeImage.jsx'
import RecipeTitle from '../components/recipeProperties/RecipeTitle.jsx'
import RecipeCaloriesServing from '../components/recipeProperties/RecipeCaloriesServing.jsx';
import RecipeDietLabels from '../components/recipeProperties/RecipeDietLabels.jsx';
import RecipeHealthLabels from '../components/recipeProperties/RecipeHealthLabels.jsx';
import RecipeDishClassifications from '../components/recipeProperties/RecipeDishClassifications.jsx';
import RecipeIngredients from '../components/recipeProperties/RecipeIngredients.jsx';
import RecipePreparation from '../components/recipeProperties/RecipePreparation.jsx';
import RecipeSource from '../components/recipeProperties/RecipeSource.jsx';
import './ShowRecipes.css'

const ShowRecipes = ({ recipes }) => {
    const [selectedRecipes, setSelectedRecipes] = useState(new Set());

    // If there are no recipes available, display an error message
    if (recipes.length === 0) {
        return (
            <DisplayErrorMessage 
                message={'Sorry, there are no recipes found. Please try other criteria.'} 
                style={'no-recipe-found'}
            />
        );
    }

    return (
        <div className="container">
            <div className="columns is-multiline">
            {recipes.map((recipe) => {
                return (
                    <div key={recipe.instructionsUrl} className="column is-one-third-desktop is-half-tablet">
                        <div className="recipe card">

                            {/* Image */}
                            <RecipeImage 
                                recipe={recipe} 
                                divStyle={'card-image'}
                                figureStyle={'image'}
                            />

                            <div className="card-content">
                                {/* Title */}
                                <RecipeTitle 
                                    recipe={recipe}
                                    div1Style={'media'}
                                    div2Style={'media-content'}
                                    pStyle={'title is-4 has-text-centered'}
                                />

                                <div className="content">
                                    <h5 className="title is-5 has-text-centered">Nutrition:</h5>
                                    {/* Calories and Serving size */}
                                    <RecipeCaloriesServing recipe={recipe} />

                                    {/* Diet and Health labels */}
                                    <h5 className="title is-5 has-text-centered">Diet and Health Information:</h5>
                                    <RecipeDietLabels recipe={recipe} />
                                    <RecipeHealthLabels recipe={recipe} />

                                    {/* Other information */}
                                    <RecipeDishClassifications recipe={recipe} />
                                    <RecipeIngredients recipe={recipe} />
                                    <RecipePreparation recipe={recipe} />

                                    {/* Recipe source */}
                                    <RecipeSource recipe={recipe} />
                                </div>

                                {/* Button to add or remove recipe for printing */}
                                <div className="has-text-centered mt-3">
                                    <AddToPrintButton
                                        recipe={recipe}
                                        setSelectedRecipes={setSelectedRecipes}
                                        isSelected={selectedRecipes.has(recipe.instructionsUrl)}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>

            {/* Button to print PDF */}
            <div className="has-text-centered mb-4">
                <PrintToPDFButton
                    recipes={recipes}
                    selectedRecipes={selectedRecipes}
                    isDisabled={selectedRecipes.size === 0}
                />  
                <br />

                {/* Button that will scroll the page to the top */}
                <ButtonReturnToTop />
            </div>
        </div>
    );
};

export default ShowRecipes;
