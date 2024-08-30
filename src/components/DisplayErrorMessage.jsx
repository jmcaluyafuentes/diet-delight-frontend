import React from 'react'
import './DisplayErrorMessage.css'

const DisplayErrorMessage = ({ message, style }) => {
    // If message prop is empty, return null to render nothing
    if (!message) {
        return null;
    }

    const combinedStyle = `${style} error`

    // Render the error message if it exists
    return (
        <div className={combinedStyle}>
            {message}
        </div>
    )
}

export default DisplayErrorMessage
