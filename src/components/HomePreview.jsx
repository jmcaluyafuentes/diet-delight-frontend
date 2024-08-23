import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePreview.css'

const dietOptions = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'];
const healthOptions = ['dairy-free', 'egg-free', 'gluten-free', 'low-potasium', 'low-sugar', 'Mediterranean', 'mustard-free', 'no-oil-added', 'soy-free', 'sugar-conscious', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const RecipeDisplay = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState(new Set());
    const [randomDiet, setRandomDiet] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const selectedDiet = getRandomElement(dietOptions);
            const randomHealth = getRandomElement(healthOptions);

            setRandomDiet(selectedDiet); // Store the selected diet for display

            try {
                const queryParams = new URLSearchParams();
                queryParams.append('diet', selectedDiet);
                queryParams.append('health', randomHealth);

                const response = await fetch(`https://diet-delight-backend.onrender.com/recipes?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipes(data.slice(0, 4)); // Get only 4 recipes
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setRecipes([]);
            }
        };

        fetchRecipes();
    }, []);

    // Handle adding or removing recipes for printing
    const handleAddToPrint = (recipeIdentifier) => {
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

    // Navigate to PrintPreview with the selected recipes
    const handlePrintToPDF = () => {
        const selectedRecipeDetails = recipes.filter((recipe) =>
            selectedRecipes.has(recipe.instructionsUrl)
        );
        navigate('/print', { state: { recipes: selectedRecipeDetails } });
    };

    return (
        <div className="recipe-display">
            <h2 className="title is-4 has-text-centered mt-5">
                Featured Recipes for a {randomDiet} Diet
            </h2>
            <div className="columns is-multiline is-centered">
                {recipes.map(recipe => (
                    <div key={recipe.instructionsUrl} className="column is-one-quarter">
                        <div className="recipe card">
                                <div className="card-image">
                                    <figure className="image">
                                        <a href={recipe.instructionsUrl} className="button ml-2" target="_blank">
                                            <img src={recipe.image} alt={recipe.title} /> 
                                        </a>
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
        </div>
    );
};

export default RecipeDisplay;