import React from 'react'

const ButtonReturnToTop = () => {
    // Function to scroll the window to the top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth', // Scroll to the top of the page
        });
    };

    return (
        <button 
            onClick={scrollToTop} 
            className="button is-link mt-5 is-medium"
        >
            Return to Top
        </button>
    )
}

export default ButtonReturnToTop