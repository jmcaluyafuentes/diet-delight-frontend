import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrintToPDFButton = ({ recipes, selectedRecipes, isDisabled }) => {
    const navigate = useNavigate();

    const handlePrintToPDF = () => {
        const selectedRecipeDetails = recipes.filter((recipe) =>
            selectedRecipes.has(recipe.instructionsUrl) // Use unique property
        );
        navigate('/print', { state: { recipes: selectedRecipeDetails } });
    };

    return (
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
