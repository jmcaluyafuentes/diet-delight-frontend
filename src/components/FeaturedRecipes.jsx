import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { dietOptions, healthOptions } from '../utils/dietHealthOptions.js';
import { fetchRecipes } from '../utils/fetchRecipes.js';
import RecipeImage from '../components/recipeProperties/RecipeImage.jsx'
import RecipeTitle from '../components/recipeProperties/RecipeTitle.jsx'
import RecipeCaloriesServing from './recipeProperties/RecipeCaloriesServing.jsx';
import RecipeDietLabels from './recipeProperties/RecipeDietLabels.jsx';
import RecipeSource from './recipeProperties/RecipeSource.jsx';
import AddToPrintButton from './AddToPrintButton.jsx';
import PrintToPDFButton from './PrintToPDFButton.jsx';
import './FeaturedRecipes.css';

const FeaturedRecipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const [displayedRecipes, setDisplayedRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState(new Set());
    const [randomDiet, setRandomDiet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShuffling, setIsShuffling] = useState(true);
    const navigate = useNavigate();

    // Get random element as reference in featuring the recipes
    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
    // Shuffle the array
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    useEffect(() => {
            const selectedDiet = getRandomElement(dietOptions);
            const randomHealth = getRandomElement(healthOptions);

            setRandomDiet(selectedDiet);

            // Convert selectedDiet and randomHealth to arrays
            const selectedDietArray = [selectedDiet];
            const randomHealthArray = [randomHealth];

            fetchRecipes(selectedDietArray, randomHealthArray, setAllRecipes, setIsLoading);
    }, []);

    useEffect(() => {
        if (allRecipes.length > 0) {
            setDisplayedRecipes(allRecipes.slice(0, 4));
        }
    }, [allRecipes]);

    // Shuffle the recipes every 5 seconds and select 4 recipes for display
    useEffect(() => {
        let intervalId;
        if (isShuffling) {
            intervalId = setInterval(() => {
                if (allRecipes.length > 0) {
                    const shuffled = shuffleArray([...allRecipes]);
                    setDisplayedRecipes(shuffled.slice(0, 4));
                }
            }, 5000); // 5 seconds
        }

        return () => clearInterval(intervalId);
    }, [allRecipes, isShuffling]);

    return (
        <div className="recipe-display">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h2 className="title is-3 has-text-centered mt-5" id="homepagefeaturedrecipetitle">
                        Featured Recipes for a {randomDiet} Diet
                    </h2>

                    <div className="columns is-multiline is-centered">
                        {displayedRecipes.map(recipe => (
                            <div key={recipe.instructionsUrl} className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
                                <div className="recipe card">

                                    {/* Image */}
                                    <RecipeImage 
                                        recipe={recipe} 
                                        divStyle={'card-image is-flex is-justify-content-center is-align-items-center'}
                                        figureStyle={'image mt-3'}
                                    />

                                    <div className="card-content">
                                        {/* Title */}
                                        <RecipeTitle 
                                            recipe={recipe} 
                                            div1Style={'media'}
                                            div2Style={'media-content is-flex is-justify-content-center is-align-items-center has-text-centered'}
                                            pStyle={'title is-5'}
                                        />

                                        <div className="content is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
                                            {/* Calories and Serving size */}
                                            <RecipeCaloriesServing recipe={recipe} />
                                            {/* Diet labels */}
                                            <RecipeDietLabels recipe={recipe} />
                                            {/* Recipe source */}
                                            <RecipeSource recipe={recipe} />
                                        </div>

                                        <div className="has-text-centered mt-3">
                                            {/* AddToPrintButton component */}
                                            <AddToPrintButton
                                                recipe={recipe}
                                                setSelectedRecipes={setSelectedRecipes}
                                                isSelected={selectedRecipes.has(recipe.instructionsUrl)}
                                                setIsShuffling={setIsShuffling}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedRecipes.size > 0 && (
                        <div className="has-text-centered mt-4">
                            <PrintToPDFButton
                                recipes={displayedRecipes}
                                selectedRecipes={selectedRecipes}
                                isDisabled={selectedRecipes.size === 0}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeaturedRecipes;
