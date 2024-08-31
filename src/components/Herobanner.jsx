import React from 'react';
import { Link } from 'react-router-dom';
import './Herobanner.css'

function HeroBanner({ backgroundImage }) {
  // Inline style for the hero banner background image
  const heroBannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <section className="hero is-fullheight" style={heroBannerStyle} id="herobanner">
      <div className="container" id="herocontainer">
        {/* Main title of the hero banner */}
        <h1 className="title is-1">Welcome to Diet Delight</h1>
        {/* Subtitle with styling */}
        <h2 className="subtitle is-4 mt-4 has-text-primary has-text-weight-bold">Your go-to app for healthy recipes</h2>

        {/* CTA (Call-to-Action) button that navigates to the Dietary Selection page */}
        <Link to="/search" className="button is-warning is-large mt-5" id="cta-search-recipes">
          Search Recipes
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;