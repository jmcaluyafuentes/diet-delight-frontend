import React from 'react'
import './DisplayErrorMessage.css'

const DisplayErrorMessage = ({ message, style }) => {
    // If message prop is empty, return null to render nothing
    if (!message) {
        return null;
    }

    // Render the error message if it exists
    return (
        <div className={style}>
            {message}
        </div>
    )
}

export default DisplayErrorMessage
