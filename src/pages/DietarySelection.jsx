import React, { useState } from 'react';
import { dietOptions, healthOptions } from '../utils/dietHealthOptions.js';
import ShowRecipes from './ShowRecipes.jsx';
import CheckboxGroup from '../components/CheckboxGroup.jsx';
import DisplayErrorMessage from '../components/DisplayErrorMessage.jsx'
import SearchRecipeButton from '../components/SearchRecipeButton.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import './DietarySelection.css'

const DietarySelection = () => {
    const [dietCriteria, setDietCriteria] = useState([]);
    const [healthCriteria, setHealthCriteria] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

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

    return (
        <main className="section">
            <div className="box">
                <h1 className="title is-1 has-text-centered">Recipe Search</h1>
                <h2 className="title is-3 mt-6 is-flex is-justify-content-center has-text-centered">Select Your Dietary and Health Criteria</h2>

                {/* Display error message if exists */}
                <DisplayErrorMessage message={errorMessage} style={'no-option-selected'}/>

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
                
                {/* Add search button with its functionality */}
                <SearchRecipeButton 
                    dietCriteria={dietCriteria} 
                    healthCriteria={healthCriteria} 
                    setErrorMessage={setErrorMessage} 
                    setRecipes={setRecipes}
                    setIsSearchClicked={setIsSearchClicked}
                    setIsLoading={setIsLoading}
                />
                
                {/* Display the results after search button is clicked */}
                {isSearchClicked && (
                    // Display the loading spinner while waiting for the fetched data
                    isLoading ? (
                        <LoadingSpinner />
                    ) : (
                    // Display the recipes once available
                    <ShowRecipes recipes={recipes} />
                    )
                )}
            </div> 
        </main>
    );
};

export default DietarySelection;