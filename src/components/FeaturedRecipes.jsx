import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { dietOptions, healthOptions } from '../utils/dietHealthOptions.js';
import './FeaturedRecipes.css';

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const FeaturedRecipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const [displayedRecipes, setDisplayedRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState(new Set());
    const [randomDiet, setRandomDiet] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isShuffling, setIsShuffling] = useState(true);
    const navigate = useNavigate();

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true); // Start loading

            const selectedDiet = getRandomElement(dietOptions);
            const randomHealth = getRandomElement(healthOptions);

            setRandomDiet(selectedDiet);

            try {
                const queryParams = new URLSearchParams();
                queryParams.append('diet', selectedDiet);
                queryParams.append('health', randomHealth);

                const response = await fetch(`https://diet-delight-backend.onrender.com/recipes?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllRecipes(data.recipes);
                setDisplayedRecipes(data.recipes.slice(0, 4));
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setAllRecipes([]);
                setDisplayedRecipes([]);
            } 
            finally {
                setTimeout(() => {
                    setIsLoading(false); // End loading after a delay
                }, 1000);
            }
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        let intervalId;
        if (isShuffling) {
            intervalId = setInterval(() => {
                if (allRecipes.length > 0) {
                    const shuffled = shuffleArray([...allRecipes]);
                    setDisplayedRecipes(shuffled.slice(0, 4));
                }
            }, 5000);
        }

        return () => clearInterval(intervalId);
    }, [allRecipes, isShuffling]);

    const handleAddToPrint = (recipeIdentifier) => {
        setSelectedRecipes((prevSelected) => {
            const updatedSelections = new Set(prevSelected);
            if (updatedSelections.has(recipeIdentifier)) {
                updatedSelections.delete(recipeIdentifier);
            } else {
                updatedSelections.add(recipeIdentifier);
            }

            // Toggle shuffling based on the number of selected recipes
            setIsShuffling(updatedSelections.size === 0);
            return updatedSelections;
        });
    };

    const handlePrintToPDF = () => {
        const selectedRecipeDetails = displayedRecipes.filter((recipe) =>
            selectedRecipes.has(recipe.instructionsUrl)
        );
        navigate('/print', { state: { recipes: selectedRecipeDetails } });
    };

    return (
        <div className="recipe-display">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h2 className="title is-3 has-text-centered mt-5">
                        Featured Recipes for a {randomDiet} Diet
                    </h2>
                    <div className="columns is-multiline is-centered">
                        {displayedRecipes.map(recipe => (
                            <div key={recipe.instructionsUrl} className="column is-one-quarter-desktop is-full-mobile">
                                <div className="recipe card">
                                    <div className="card-image is-flex is-justify-content-center is-align-items-center">
                                        <figure className="image mt-3 ">
                                            <a href={recipe.instructionsUrl} className="button ml-2" target="_blank" rel="noopener noreferrer">
                                                <img src={recipe.image} alt={recipe.title}/>
                                            </a>
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-content is-flex is-justify-content-center is-align-items-center has-text-centered">
                                                <p className="title is-5">{recipe.title}</p>
                                            </div>
                                        </div>
                                        <div className="content is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
                                            <p>Calories: {`${recipe.caloriesPerServing.toFixed(2)} kcal`} <br />
                                                Serving Size: {recipe.servingSize}</p>
                                            <p><strong>Diet Labels:</strong> {recipe.dietLabels.join(', ')}</p>
                                            <p className="mt-2 ml-4">Source: <a href={recipe.instructionsUrl} target="_blank" rel="noopener noreferrer" className="has-text-info"><em>{recipe.source}</em></a></p>
                                        </div>
                                        <div className="has-text-centered mt-3">
                                            <button
                                                onClick={() => handleAddToPrint(recipe.instructionsUrl)}
                                                className={`button is-link ${selectedRecipes.has(recipe.instructionsUrl) ? 'is-danger' : ''}`}
                                            >
                                                {selectedRecipes.has(recipe.instructionsUrl) ? 'Remove from Print' : 'Add to Print'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedRecipes.size > 0 && (
                        <div className="has-text-centered mt-4">
                            <button onClick={handlePrintToPDF} className="button is-primary">
                                Print to PDF
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeaturedRecipes;
