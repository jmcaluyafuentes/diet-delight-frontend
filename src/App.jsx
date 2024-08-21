import React, { useState } from 'react';
import DietarySelection from './pages/DietarySelection';
import PreviewRecipes from './pages/PreviewRecipes';

const App = () => {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async (dietCriteria, healthCriteria) => {
        try {
            const queryParams = new URLSearchParams();
            dietCriteria.forEach(diet => queryParams.append('diet', diet));
            healthCriteria.forEach(health => queryParams.append('health', health));

            const response = await fetch(`https://diet-delight-backend.onrender.com/recipes?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setRecipes([]);
        }
    };

    return (
        <div>
            <h1 className="title is-2 has-text-centered">Recipe Search</h1>
            <DietarySelection onFetchRecipes={fetchRecipes} />
            <PreviewRecipes recipes={recipes} />
        </div>
    );
};

export default App;
