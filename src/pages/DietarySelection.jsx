import React, { useState } from 'react';
import CheckboxGroup from '../components/CheckboxGroup.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import PreviewRecipes from './ShowRecipes.jsx'; // Adjust the import if necessary
import { fetchRecipes } from '../utils/fetchRecipes.js'; // Adjust the import if necessary

const DietarySelection = ({ onFetchRecipes }) => {
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

    const dietOptions = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'];
    const healthOptions = ['dairy-free', 'egg-free', 'gluten-free', 'low-potasium', 'low-sugar', 'Mediterranean', 'mustard-free', 'no-oil-added', 'soy-free', 'sugar-conscious', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'];

    return (
        <main className="section">
            <h1 className="title is-2 has-text-centered">Recipe Search</h1>
            <h1 className="title is-3 mt-6">Select Your Dietary and Health Criteria</h1>

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
                <PreviewRecipes recipes={recipes} />
            )}
        </main>
    );
};

export default DietarySelection;
