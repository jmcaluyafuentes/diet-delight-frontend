import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';

const Home = () => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-head">
              <NavBar />
            </div>

            <div className="hero-body has-text-centered">
                <div className="container">
                    <h1 className="title is-1">Welcome to Diet Delight</h1>
                    <h2 className="subtitle is-4 mt-4">Your go-to app for healthy recipes</h2>
                    <Link to="/search" className="button is-primary is-large mt-5">
                        Search Recipes
                    </Link>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Home;
