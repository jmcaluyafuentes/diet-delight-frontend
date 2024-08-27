import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const location = useLocation();

    useEffect(() => {
        // Function to toggle menu visibility
        const toggleMenu = (event) => {
            const target = event.currentTarget.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the target menu
            event.currentTarget.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        };

        // Function to close the menu
        const closeMenu = () => {
            const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
            const navbarMenu = document.getElementById('navbarMenu');

            navbarBurgers.forEach(el => el.classList.remove('is-active'));
            if (navbarMenu) {
                navbarMenu.classList.remove('is-active');
            }
        };

        // Add click event listeners to each navbar burger
        const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
        navbarBurgers.forEach(el => el.addEventListener('click', toggleMenu));

        // Add click event listeners to each navbar item to close the menu
        const navbarItems = Array.from(document.querySelectorAll('.navbar-item '));
        navbarItems.forEach(el => el.addEventListener('click', closeMenu));

    }, []);

    return (
        <nav className="navbar has-background-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand" id="navbar-main">
                {/* <Link to="/" className="navbar-item" >
                    <h1 className="title is-4 has-text-black ml-5 mr-5">Diet Delight</h1>
                </Link> */}
                <Link 
                    to="/" 
                    className={`navbar-main ${location.pathname === '/' ? 'active' : ''} has-text-black is-flex is-align-items-center`}
                >
                <h1 className="title is-4 has-text-black ml-5 mr-5 has-text-centered">Diet Delight</h1>
                </Link>
                <Link 
                    role="button" 
                    aria-label="menu" 
                    aria-expanded="false" 
                    className="navbar-burger burger" 
                    data-target="navbarMenu"
                >
                    <span aria-hidden="true" className="has-text-black"></span>
                    <span aria-hidden="true" className="has-text-black"></span>
                    <span aria-hidden="true" className="has-text-black"></span>
                    <span aria-hidden="true" className="has-text-black"></span>
                </Link>
            </div>

            <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end mr-6">
                    <Link 
                        to="/" 
                        className={`navbar-item ${location.pathname === '/' ? 'active' : ''} has-text-black`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/search" 
                        className={`navbar-item ${location.pathname === '/search' ? 'active' : ''} has-text-black`}
                    >
                        Search Recipe
                    </Link>
                    <Link 
                        to="/about" 
                        className={`navbar-item ${location.pathname === '/about' ? 'active' : ''} has-text-black`}
                    >
                        About
                    </Link>
                    <Link 
                        to="/contact" 
                        className={`navbar-item ${location.pathname === '/contact' ? 'active' : ''} has-text-black`}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;