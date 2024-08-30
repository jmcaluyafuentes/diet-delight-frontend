import React from 'react';

const AddToPrintButton = ({ recipe, setSelectedRecipes, isSelected, setIsShuffling }) => {

    const handleAddToPrint = (recipeIdentifier) => {
        setSelectedRecipes((prevSelected) => {
            const updatedSelections = new Set(prevSelected);
            if (updatedSelections.has(recipeIdentifier)) {
                updatedSelections.delete(recipeIdentifier);
            } else {
                updatedSelections.add(recipeIdentifier);
            }

            // Update shuffling state based on the number of selected recipes
            // Check if setIsShuffling is provided before calling it
            if (setIsShuffling) {
                setIsShuffling(updatedSelections.size === 0);
            }

            return updatedSelections;
        });
    };

    return (
        <button
            onClick={() => handleAddToPrint(recipe.instructionsUrl)}
            className={`button is-link ${isSelected ? 'is-danger' : ''}`}
            id="btn-add-to-print"
            >
            {isSelected ? 'Remove' : 'Add to Print'}
        </button>
    );
};

export default AddToPrintButton;
