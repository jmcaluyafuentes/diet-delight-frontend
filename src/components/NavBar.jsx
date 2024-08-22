import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  useEffect(() => {
    // Add click event listener to toggle hamburger menu
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
  }, []);

    return (
        <nav className="navbar has-background-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <h1 className="title is-4 has-text-black ml-6">Diet Delight</h1>
                </Link>
                <Link role="button" aria-label="menu" aria-expanded="false" className="navbar-burger burger" data-target="navbarMenu">
                  <span aria-hidden="true" className="has-text-black"></span>
                  <span aria-hidden="true" className="has-text-black"></span>
                  <span aria-hidden="true" className="has-text-black"></span>
                  <span aria-hidden="true" className="has-text-black"></span>
                </Link>
            </div>

            <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end mr-6">
                    <Link to="/" className="navbar-item has-text-black">
                        Home
                    </Link>
                    <Link to="/search" className="navbar-item has-text-black">
                        Search Recipe
                    </Link>
                    <Link to="/about" className="navbar-item has-text-black">
                        About
                    </Link>
                    <Link to="/contact" className="navbar-item has-text-black">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
