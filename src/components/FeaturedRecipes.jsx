import React, { useEffect, useState } from 'react';
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

// Utility function to get a random element from an array
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Utility function to shuffle the elements of an array randomly
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const FeaturedRecipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const [displayedRecipes, setDisplayedRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState(new Set());
    const [randomDiet, setRandomDiet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShuffling, setIsShuffling] = useState(true);

    // Fetch recipes when the component mounts
    useEffect(() => {
            // Select random diet and health options to filter recipes
            const selectedDiet = getRandomElement(dietOptions);
            const randomHealth = getRandomElement(healthOptions);
            setRandomDiet(selectedDiet);

            // Convert selectedDiet and randomHealth to arrays for the fetch function
            const selectedDietArray = [selectedDiet];
            const randomHealthArray = [randomHealth];

            // Fetch recipes based on random diet and health options
            fetchRecipes(selectedDietArray, randomHealthArray, setAllRecipes, setIsLoading);
    }, []);

    // Set the initial set of displayed recipes after fetching
    useEffect(() => {
        if (allRecipes.length > 0) {
            // Show only the first 4 recipes initially
            setDisplayedRecipes(allRecipes.slice(0, 4));
        }
    }, [allRecipes]);

    // Shuffle the recipes every 5 seconds and update the displayed recipes
    useEffect(() => {
        let intervalId;
        if (isShuffling) {
            // Set up an interval to shuffle the recipes every 5 seconds
            intervalId = setInterval(() => {
                if (allRecipes.length > 0) {
                    const shuffled = shuffleArray([...allRecipes]);
                    // Update the displayed recipes with the shuffled selection
                    setDisplayedRecipes(shuffled.slice(0, 4));
                }
            }, 5000); // 5 seconds interval
        }

        // Cleanup function to clear the interval when the component unmounts or when shuffling stops
        return () => clearInterval(intervalId);
    }, [allRecipes, isShuffling]);

    return (
        <div className="recipe-display">
            {isLoading ? (
                // Show loading spinner while recipes are being fetched
                <LoadingSpinner />
            ) : (
                <>
                    {/* Display the featured recipes title based on the random diet selected */}
                    <h2 className="title is-3 has-text-centered mt-5" id="homepagefeaturedrecipetitle">
                        Featured Recipes for a {randomDiet} Diet
                    </h2>

                    <div className="columns is-multiline is-centered">
                        {/* Render each recipe in a responsive column layout */}
                        {displayedRecipes.map(recipe => (
                            <div key={recipe.instructionsUrl} className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
                                <div className="recipe card">

                                    {/* Recipe Image */}
                                    <RecipeImage 
                                        recipe={recipe} 
                                        divStyle={'card-image is-flex is-justify-content-center is-align-items-center'}
                                        figureStyle={'image mt-3'}
                                    />

                                    <div className="card-content">
                                        {/* Recipe Title */}
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
                                            {/* Button to add or remove recipes from the print list */}
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
                    {/* Conditionally render the 'Print to PDF' button if there are selected recipes */}
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
