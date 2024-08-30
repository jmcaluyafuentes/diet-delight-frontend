import React from 'react';
import HeroBanner from '../components/Herobanner';
import FeaturedRecipes from '../components/FeaturedRecipes';

const Home = () => {
    return (
        <section className="hero is-fullheight" style={{minHeight: '80vh'}}>
            <div className="hero-body" style={{padding: '0'}}>
                <HeroBanner backgroundImage="https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>

            <div id="featuredrecipes" className="featured-recipes"  style={{paddingLeft: '2vw', paddingRight: '2vw', paddingBottom: '5vh'}}>
                <FeaturedRecipes />
            </div>
        </section>
    );
};

export default Home;
