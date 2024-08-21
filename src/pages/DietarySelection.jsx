import React, { useState } from 'react';

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

    return (
        <div className="container">
            <h1 className="title is-3">Select Your Dietary and Health Criteria</h1>
            <div className="columns mt-5">
                <div className="column is-half">
                    <h2 className="subtitle is-4">Dietary Preferences</h2>
                    <label className="checkbox">
                        <input type="checkbox" value="balanced" onChange={(e) => handleCheckboxChange(e, 'diet')} />
                        balanced
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" value="high-fiber" onChange={(e) => handleCheckboxChange(e, 'diet')} />
                        high-fiber
                    </label>
                    {/* Add more dietary options as needed */}
                </div>
                <div className="column is-half">
                    <h2 className="subtitle is-4">Health Considerations</h2>
                    <label className="checkbox">
                        <input type="checkbox" value="dairy-free" onChange={(e) => handleCheckboxChange(e, 'health')} />
                        dairy-free
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" value="egg-free" onChange={(e) => handleCheckboxChange(e, 'health')} />
                        egg-free
                    </label>
                    {/* Add more health options as needed */}
                </div>
            </div>
            <button className="button is-primary mt-5" onClick={handleSearch}>Search</button>
        </div>
    );
};

export default DietarySelection;
