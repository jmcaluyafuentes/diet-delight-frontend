import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-head">
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <h1 className="title">Diet Delight</h1>
            </a>
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <Link to="/features" className="navbar-item">
                Features
              </Link>
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/contact" className="navbar-item">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title">Welcome to Diet Delight</h1>
          <h2 className="subtitle">Your go-to app for healthy recipes</h2>
          <Link to="/search" className="button is-primary is-large">
            Find Recipes
          </Link>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>Diet Delight</strong> is a recipe app tailored for your dietary needs. Discover, save, and enjoy healthy recipes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
