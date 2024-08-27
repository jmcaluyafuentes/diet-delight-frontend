import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner({ backgroundImage }) {
  const heroBannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    textAlign: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',  
    justifyContent: 'center',  
    color: 'white',
    marginBottom: 'auto'
  };

    
  return (
    <section className="hero is-fullheight" style={heroBannerStyle}>
      <div
        className="container"
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <h1 className="title is-1">Welcome to Diet Delight</h1>
        <h2 className="subtitle is-4 mt-4">Your go-to app for healthy recipes</h2>
        <Link to="/search" className="button is-primary is-large mt-5">
          Search Recipes
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;