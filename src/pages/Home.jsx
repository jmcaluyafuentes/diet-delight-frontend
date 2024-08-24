import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';
import HeroBanner from '../components/Herobanner';
import RecipeDisplay from '../components/HomePreview';

const Home = () => {
    return (
        <section className="hero is-fullheight" style={{
            minHeight: '80vh'
        }}>
            <div className="hero-head">
                <NavBar />
            </div>

            <div className="hero-body" style={{
                padding: '0'
            }}>
                <HeroBanner backgroundImage="https://upload.wikimedia.org/wikipedia/commons/1/10/Red_Color.jpg" />
            </div>

            <div className="featured-recipes" style={{ 
                paddingLeft: '2vw', paddingRight: '2vw', paddingBottom: '5vh'
            }}>
                <RecipeDisplay />
            </div>
            <Footer />
        </section>
    );
};

export default Home;
