import React from 'react'
import { fetchRecipes } from '../utils/fetchRecipes.js';
import './SearchRecipeButton.css'

const SearchRecipeButton = ({ dietCriteria, healthCriteria, setErrorMessage, setRecipes, setIsSearchClicked, setIsLoading }) => {
    // Function to handle the search button click
    const handleSearch = () => {
        // Set search clicked state to true
        setIsSearchClicked(true)

        // Check if no dietary or health criteria are selected
        if (dietCriteria.length === 0 && healthCriteria.length === 0) {
            // Set error message if no criteria are selected
            setErrorMessage('Please tick at least one dietary or health criterion below')
            // Clear recipes and return
            setRecipes([])
            return;
        }
        // Clear error message if criteria are selected
        setErrorMessage('');
        // Fetch recipes based on selected criteria
        fetchRecipes(dietCriteria, healthCriteria, setRecipes, setIsLoading);
    };

    return (
        <div className="is-flex is-justify-content-center">
            {/* Button to trigger search */}
            <button className="button is-warning is-medium mt-5 mb-5" id="btn-search" onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchRecipeButton
