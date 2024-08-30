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
                            <RecipeImage recipe={recipe}/>
                            <div className="card-content">
                                <RecipeTitle recipe={recipe}/>

                                <div className="content">
                                    <h5 className="title is-5 has-text-centered">Nutrition:</h5>
                                    <RecipeCaloriesServing recipe={recipe}/>

                                    <h5 className="title is-5 has-text-centered">Diet and Health Information:</h5>
                                    <RecipeDietLabels recipe={recipe}/>
                                    <RecipeHealthLabels recipe={recipe}/>

                                    <RecipeDishClassifications recipe={recipe}/>
                                    <RecipeIngredients recipe={recipe}/>
                                    <RecipePreparation recipe={recipe}/>
                                    <RecipeSource recipe={recipe}/>
                                </div>

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

            <div className="has-text-centered mb-4">
                <PrintToPDFButton
                    recipes={recipes}
                    selectedRecipes={selectedRecipes}
                    isDisabled={selectedRecipes.size === 0}
                />  
                <br />

                <ButtonReturnToTop />
            </div>
        </div>
    );
};

export default ShowRecipes;
