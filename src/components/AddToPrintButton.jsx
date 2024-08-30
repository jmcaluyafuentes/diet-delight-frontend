import React from 'react';

const AddToPrintButton = ({ isSelected, onClick }) => {
    return (
        <button
        onClick={onClick}
        className={`button is-link ${isSelected ? 'is-danger' : ''}`}
        id="btn-add-to-print"
        >
        {isSelected ? 'Remove' : 'Add to Print'}
        </button>
    );
};

export default AddToPrintButton;
