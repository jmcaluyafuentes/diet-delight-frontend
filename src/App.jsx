import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DietarySelection from './pages/DietarySelection';
import PreviewRecipes from './pages/PreviewRecipes.jsx';
import PrintRecipes from './pages/PrintPreview.jsx';
import NavBar from './components/NavBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRecipes = async (dietCriteria, healthCriteria) => {
        setIsLoading(true); // Start loading before fetching

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

            // Simulate a delay
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setRecipes([]);
        } finally {
            setIsLoading(false); // End loading after a delay
        }
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<>
                    <NavBar />
                    <main className="section">
                        <h1 className="title is-2 has-text-centered">Recipe Search</h1>
                        <DietarySelection onFetchRecipes={fetchRecipes} />
                        {isLoading ? ( // Show spinner while loading
                            <LoadingSpinner />
                        ) : (
                            <PreviewRecipes recipes={recipes} />
                        )}
                    </main>
                </>} />
                <Route path="/print" element={<PrintRecipes />} />
            </Routes>
        </div>
    );
};

export default App;
