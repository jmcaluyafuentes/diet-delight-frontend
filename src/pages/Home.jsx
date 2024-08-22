import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';
import HeroBanner from '../components/Herobanner';

const Home = () => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-head">
              <NavBar />
            </div>

            <div className="hero-body" style={{
                padding: '0'
            }}>
                <HeroBanner backgroundImage="https://upload.wikimedia.org/wikipedia/commons/1/10/Red_Color.jpg" />
            </div>
            <Footer />
        </section>
    );
};

export default Home;
