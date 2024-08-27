import React, { useState } from 'react';
import CheckboxGroup from '../components/CheckboxGroup.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ShowRecipes from './ShowRecipes.jsx';
import { fetchRecipes } from '../utils/fetchRecipes.js';
import { dietOptions, healthOptions } from '../utils/dietHealthOptions.js';

const DietarySelection = () => {
    const [dietCriteria, setDietCriteria] = useState([]);
    const [healthCriteria, setHealthCriteria] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckboxChange = (event, type) => {
        const value = event.target.value;
        if (type === 'diet') {
            setDietCriteria(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        } else if (type === 'health') {
            setHealthCriteria(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        }
    };

    const handleSearch = () => {
        if (dietCriteria.length === 0 && healthCriteria.length === 0) {
            setErrorMessage('Please select at least one dietary or health criterion before searching.');
            return;
        }
        setErrorMessage('');
        setIsLoading(true);
        fetchRecipes(dietCriteria, healthCriteria, setIsLoading, setRecipes);
    };

    return (
        <main className="section">
            <h1 className="title is-2 has-text-centered">Recipe Search</h1>
            <h2 className="title is-3 mt-6">Select Your Dietary and Health Criteria</h2>

            {/* Display error message if exists */}
            {errorMessage && (
                <div className="notification is-danger is-light">
                    {errorMessage}
                </div>
            )}

            <div className="columns mt-5">
                <CheckboxGroup
                    title="Dietary Preferences"
                    options={dietOptions}
                    selectedOptions={dietCriteria}
                    onChange={(event) => handleCheckboxChange(event, 'diet')}
                />
                <CheckboxGroup
                    title="Health Considerations"
                    options={healthOptions}
                    selectedOptions={healthCriteria}
                    onChange={(event) => handleCheckboxChange(event, 'health')}
                />
            </div>
            <button className="button is-primary mt-5 mb-5" onClick={handleSearch}>Search</button>

            {isLoading ? ( // Show spinner while loading
                <LoadingSpinner />
            ) : (
                <ShowRecipes recipes={recipes} />
            )}
        </main>
    );
};

export default DietarySelection;
