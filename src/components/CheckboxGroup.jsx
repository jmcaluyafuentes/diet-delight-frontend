import React from 'react';

const CheckboxGroup = ({ title, options, selectedOptions, onChange }) => {
    const type = title.toLowerCase().includes('diet') ? 'diet' : 'health';
    
    return (
        <div className="column is-half">
            <h2 className="subtitle is-4">{title}</h2>
            {options.map(option => (
                <label className="checkbox mr-2" key={option}>
                    <input
                        type="checkbox"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={(e) => onChange(e, type)}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};


export default CheckboxGroup;
