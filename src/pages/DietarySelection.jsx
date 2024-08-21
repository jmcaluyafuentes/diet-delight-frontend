import React, { useState } from 'react';

const dietOptions = [
    'balanced',
    'high-fiber',
    'high-protein',
    'low-carb',
    'low-fat',
    'low-sodium'
];

const healthOptions = [
    'dairy-free',
    'egg-free',
    'gluten-free',
    'low-potasium',
    'low-sugar',
    'Mediterranean',
    'mustard-free',
    'no-oil-added',
    'red-meat-free',
    'soy-free',
    'sugar-conscious',
    'tree-nut-free',
    'vegan',
    'vegetarian',
    'wheat-free'
];

const DietarySelection = ({ onFetchRecipes }) => {
    const [selectedDiet, setSelectedDiet] = useState([]);
    const [selectedHealth, setSelectedHealth] = useState([]);

    const handleCheckboxChange = (event, type) => {
        const value = event.target.value;
        if (type === 'diet') {
            setSelectedDiet(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        } else if (type === 'health') {
            setSelectedHealth(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFetchRecipes(selectedDiet, selectedHealth);
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Select Diet Categories</legend>
                {dietOptions.map(option => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedDiet.includes(option)}
                            onChange={(e) => handleCheckboxChange(e, 'diet')}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>
            <fieldset>
                <legend>Select Health Categories</legend>
                {healthOptions.map(option => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedHealth.includes(option)}
                            onChange={(e) => handleCheckboxChange(e, 'health')}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>
            <button type="submit">Search Recipes</button>
        </form>
    );
};

export default DietarySelection;
