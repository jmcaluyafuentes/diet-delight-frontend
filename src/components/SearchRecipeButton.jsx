import React from 'react'
import { fetchRecipes } from '../utils/fetchRecipes.js';
import './SearchRecipeButton.css'

const SearchRecipeButton = ({ dietCriteria, healthCriteria, setErrorMessage, setRecipes, setIsSearchClicked, setIsLoading }) => {
    const handleSearch = () => {
        setIsSearchClicked(true)
        if (dietCriteria.length === 0 && healthCriteria.length === 0) {
            setErrorMessage('Please tick at least one dietary or health criterion below')
            setRecipes([])
            return;
        }
        setErrorMessage('');
        fetchRecipes(dietCriteria, healthCriteria, setRecipes, setIsLoading);
    };

    return (
        <div className="is-flex is-justify-content-center">
            <button className="button is-warning is-medium mt-5 mb-5" id="btn-search" onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchRecipeButton
