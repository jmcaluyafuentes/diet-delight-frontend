import React from 'react'
import './DisplayErrorMessage.css'

const DisplayErrorMessage = ({ message, style }) => {
    // If message prop is empty or null, return null to render nothing
    if (!message) {
        return null;
    }

    // Combine provided style with a default 'error' class for consistent styling
    const combinedStyle = `${style} error`

    // Render the error message if it exists
    return (
        <div className={combinedStyle}>
            {message}
        </div>
    )
}

export default DisplayErrorMessage
