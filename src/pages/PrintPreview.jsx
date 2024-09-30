import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PrintPreview.css';

const PrintPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve recipes from the location state or initialize as an empty array
  const { recipes } = location.state || { recipes: [] };

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to handle PDF generation and download
  const handlePrint = () => {
    fetch('https://diet-delight-backend.onrender.com/recipes/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipes }),
    })
    .then((response) => response.blob()) // Convert response to a blob
    .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob
        const a = document.createElement('a'); // Create a temporary anchor element
        a.href = url;
        a.download = 'recipes.pdf'; // Set the file name for the downloaded PDF
        document.body.appendChild(a); // Append anchor to the document body
        a.click(); // Trigger a click event to download the PDF
        a.remove(); // Remove the anchor element from the document body
    })
    .catch((error) => console.error('Error generating PDF:', error));
  };

  // Function to handle navigation back to the search page
  const handleCancel = () => {
    navigate('/search');
  };

  return (
    <div className="section print-preview-container">
      <div className="print-preview-header">
        {/* Button to download the PDF */}
        <button onClick={handlePrint} className="button is-primary" id="btn-download">Download PDF</button>
        {/* Button to cancel and navigate back */}
        <button onClick={handleCancel} className="button is-link" id="btn-cancel">Cancel</button>
      </div>
      <div className="print-preview-content">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.instructionsUrl} className="recipe-details">
              <h1 className="print-preview-title is-3">{recipe.title}</h1>
              <div className="recipe-info">
                {/* Nutrition information */}
                <h5 className="print-preview-title is-5">Nutrition</h5>
                <p className="spaced">Calories: {`${recipe.caloriesPerServing.toFixed(2)} kcal`}</p>
                <p className="spaced">Serving Size: {recipe.servingSize}</p>

                {/* Diet and Health labels */}
                <h5 className="print-preview-title is-5">Diet and Health Information</h5>
                <p className="diet-labels spaced"><strong className="has-text-black">Diet Labels:</strong> {recipe.dietLabels.join(', ')}</p>
                <p className="health-labels spaced"><strong className="has-text-black">Health Labels:</strong> {recipe.healthLabels.join(', ')}</p>

                {/* Ingredients list */}
                <h5 className="print-preview-title is-5 ">Ingredients</h5>
                <ul className="spaced">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes to display.</p> // Message displayed if there are no recipes
        )}
      </div>
    </div>
  );
};

export default PrintPreview;
