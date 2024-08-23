import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PrintPreview.css';

const PrintPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] };

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    fetch('/api/printRecipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipes }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recipes.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  const handleCancel = () => {
    navigate('/search');
  };

  return (
    <div className="print-preview-container">
      <div className="print-preview-header">
        <button onClick={handlePrint} className="button is-primary">Print</button>
        <button onClick={handleCancel} className="button is-link">Cancel</button>
      </div>
      <div className="print-preview-content">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.instructionsUrl} className="recipe-details">
              <h1 className="print-preview-title is-3">{recipe.title}</h1>
              <div className="recipe-info">
                <h5 className="print-preview-title is-5">Nutrition:</h5>
                <p>Calories: {`${recipe.caloriesPerServing.toFixed(2)} kcal`}</p>
                <p>Serving Size: {recipe.servingSize}</p>

                <h5 className="print-preview-title is-5">Diet and Health Information:</h5>
                <p className="diet-labels"><strong className="has-text-black">Diet Labels:</strong> {recipe.dietLabels.join(', ')}</p>
                <p className="health-labels"><strong className="has-text-black">Health Labels:</strong> {recipe.healthLabels.join(', ')}</p>

                <h5 className="print-preview-title is-5">Ingredients:</h5>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes to display.</p>
        )}
      </div>
    </div>
  );
};

export default PrintPreview;
