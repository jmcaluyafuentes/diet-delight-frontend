import React from 'react';
import HeroBanner from '../components/Herobanner';
import FeaturedRecipes from '../components/FeaturedRecipes';
import './Home.css'

const Home = () => {
    return (
        <section className="hero is-fullheight">
            {/* Hero section for the landing page */}
            <div id="hero-body">
                {/* HeroBanner component displays a full-screen background image */}
                <HeroBanner backgroundImage="https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>

            {/* Section to display featured recipes */}
            <div id="featuredrecipes" className="featured-recipes">
                <FeaturedRecipes />
            </div>
        </section>
    );
};

export default Home;
