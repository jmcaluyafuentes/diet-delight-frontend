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

    // Function to handle changes in checkbox selections
    const handleCheckboxChange = (event, type) => {
        const value = event.target.value;
        if (type === 'diet') {
            // Update diet criteria based on checkbox selection
            setDietCriteria(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        } else if (type === 'health') {
            // Update health criteria based on checkbox selection
            setHealthCriteria(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        }
    };

    return (
        <main className="section">
            <div className="box">
                <h1 className="title is-1 has-text-centered">Search Recipes</h1>
                <h2 className="title is-3 is-flex is-justify-content-center has-text-centered">Select Your Dietary and Health Criteria</h2>

                {/* Display error message if an error exists */}
                <DisplayErrorMessage message={errorMessage} style={'no-option-selected'}/>

                <div className="columns mt-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
                    {/* CheckboxGroup component for selecting dietary preferences */}
                    <CheckboxGroup
                        title="Dietary Preferences:"
                        options={dietOptions}
                        selectedOptions={dietCriteria}
                        onChange={(event) => handleCheckboxChange(event, 'diet')}
                    />
                    {/* CheckboxGroup component for selecting health considerations */}
                    <CheckboxGroup
                        title="Health Considerations:"
                        options={healthOptions}
                        selectedOptions={healthCriteria}
                        onChange={(event) => handleCheckboxChange(event, 'health')}
                    />
                </div>
                
                {/* Button to initiate recipe search */}
                <SearchRecipeButton 
                    dietCriteria={dietCriteria} 
                    healthCriteria={healthCriteria} 
                    setErrorMessage={setErrorMessage} 
                    setRecipes={setRecipes}
                    setIsSearchClicked={setIsSearchClicked}
                    setIsLoading={setIsLoading}
                />
                
                {/* Conditional rendering based on whether the search button has been clicked */}
                {isSearchClicked && (
                    // Display loading spinner while recipes are being fetched
                    isLoading ? (
                        <LoadingSpinner />
                    ) : (
                    // Display the fetched recipes once they are available
                    <ShowRecipes recipes={recipes} />
                    )
                )}
            </div> 
        </main>
    );
};

export default DietarySelection;