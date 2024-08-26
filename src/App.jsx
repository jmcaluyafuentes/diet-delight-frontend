import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DietarySelection from './pages/DietarySelection';
import PreviewRecipes from './pages/PreviewRecipes.jsx';
import PrintRecipes from './pages/PrintPreview.jsx';
import NavBar from './components/NavBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { fetchRecipes } from './utils/fetchRecipes.js';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<>
                    <NavBar />
                    <main className="section">
                        <h1 className="title is-2 has-text-centered">Recipe Search</h1>
                        <DietarySelection onFetchRecipes={(dietCriteria, healthCriteria) => 
                            fetchRecipes(dietCriteria, healthCriteria, setIsLoading, setRecipes)
                        } />
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
