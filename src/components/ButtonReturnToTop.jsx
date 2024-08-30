import React from 'react'

const ButtonReturnToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop} className="button is-link mt-5 is-medium">Return to Top</button>
    )
}

export default ButtonReturnToTop