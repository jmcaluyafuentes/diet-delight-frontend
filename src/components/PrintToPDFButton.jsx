import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrintToPDFButton = ({ recipes, selectedRecipes, isDisabled }) => {
    const navigate = useNavigate();

    // Function to handle the print to PDF button click
    const handlePrintToPDF = () => {
        // Filter the recipes to include only those that are selected for printing
        const selectedRecipeDetails = recipes.filter((recipe) =>
            selectedRecipes.has(recipe.instructionsUrl) // Use unique property
        );

        // Navigate to the print preview page with the selected recipes in state
        navigate('/print', { state: { recipes: selectedRecipeDetails } });
    };

    return (
        // Button to trigger print to PDF functionality
        <button
            onClick={handlePrintToPDF}
            className="button is-primary mt-5 mb-5 is-medium"
            disabled={isDisabled}
            id="btn-print-to-pdf"
        >
            Print to PDF
        </button>
    );
};

export default PrintToPDFButton;
