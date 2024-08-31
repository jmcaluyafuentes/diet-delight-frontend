import React from 'react';

const CheckboxGroup = ({ title, options, selectedOptions, onChange }) => {
    // Determine the type based on the title (diet or health)
    const type = title.toLowerCase().includes('diet') ? 'diet' : 'health';
    
    return (
        <div className="column is-half">
            {/* Render the title for the group */}
            <h2 className="subtitle is-4">{title}</h2>

            {/* Map through the options to create a list of checkboxes */}
            {options.map(option => (
                <label className="checkbox mr-2" key={option}>
                    <input
                        type="checkbox"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={(e) => onChange(e, type)}
                    />
                    <span style={{ marginLeft: '4px' }}>{option}</span> 
                </label>
            ))}
        </div>
    );
};


export default CheckboxGroup;
