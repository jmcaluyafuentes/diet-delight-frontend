import React, { useState } from 'react';
import CheckboxGroup from '../components/CheckboxGroup.jsx';

const DietarySelection = ({ onFetchRecipes }) => {
    const [dietCriteria, setDietCriteria] = useState([]);
    const [healthCriteria, setHealthCriteria] = useState([]);

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

    const handleSearch = () => {
        onFetchRecipes(dietCriteria, healthCriteria);
    };

    const dietOptions = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'];
    const healthOptions = ['dairy-free', 'egg-free', 'gluten-free', 'low-potasium', 'low-sugar', 'Mediterranean', 'mustard-free', 'no-oil-added', 'soy-free', 'sugar-conscious', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'];

    return (
        <div className="container">
            <h1 className="title is-3 mt-6">Select Your Dietary and Health Criteria</h1>
            <div className="columns mt-5">
              <CheckboxGroup
                title="Dietary Preferences"
                options={dietOptions}
                selectedOptions={dietCriteria}
                onChange={handleCheckboxChange}
              />
              <CheckboxGroup
                title="Health Considerations"
                options={healthOptions}
                selectedOptions={healthCriteria}
                onChange={handleCheckboxChange}
              />
            </div>
            <button className="button is-primary mt-5 mb-5" onClick={handleSearch}>Search</button>
        </div>
    );
};

export default DietarySelection;
