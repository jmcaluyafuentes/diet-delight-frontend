import React from 'react';
import './LoadingSpinner.css';

// Functional component to display a loading spinner
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
