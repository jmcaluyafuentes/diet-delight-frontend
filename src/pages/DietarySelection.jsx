import React, { useState } from 'react';
import { dietOptions, healthOptions } from '../utils/dietHealthOptions.js';
import ShowRecipes from './ShowRecipes.jsx';
import CheckboxGroup from '../components/CheckboxGroup.jsx';
import DisplayErrorMessage from '../components/DisplayErrorMessage.jsx'
import { fetchRecipes } from '../utils/fetchRecipes.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import './DietarySelection.css'

const DietarySelection = () => {
    const [dietCriteria, setDietCriteria] = useState([]);
    const [healthCriteria, setHealthCriteria] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
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
            setErrorMessage('Please select at least one dietary or health criterion');
            return;
        }
        setErrorMessage('');
        fetchRecipes(dietCriteria, healthCriteria, setIsLoading, setRecipes);
    };

    return (
        <main className="section">
            <div className="box">
                <h1 className="title is-1 has-text-centered">Recipe Search</h1>
                <h2 className="title is-3 mt-6 is-flex is-justify-content-center has-text-centered">Select Your Dietary and Health Criteria</h2>

                {/* Display error message if exists */}
                <DisplayErrorMessage message={errorMessage} />

                <div className="columns mt-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
                    <CheckboxGroup
                        title="Dietary Preferences:"
                        options={dietOptions}
                        selectedOptions={dietCriteria}
                        onChange={(event) => handleCheckboxChange(event, 'diet')}
                    />
                    <CheckboxGroup
                        title="Health Considerations:"
                        options={healthOptions}
                        selectedOptions={healthCriteria}
                        onChange={(event) => handleCheckboxChange(event, 'health')}
                    />
                </div>
                <div className="is-flex is-justify-content-center">
                    <button className="button is-warning is-medium mt-5 mb-5" id="btn-search" onClick={handleSearch}>Search</button>
                </div>
                {isLoading ? ( // Show spinner while loading
                    <LoadingSpinner />
                ) : (
                    <ShowRecipes recipes={recipes} />
                )}
            </div> 
        </main>
    );
};

export default DietarySelection;