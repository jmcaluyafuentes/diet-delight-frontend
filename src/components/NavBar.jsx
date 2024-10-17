import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './NavBar.css';

const NavBar = () => {  

    const [cookies, _, removeCookies] = useCookies(["access_token"]);

    useEffect(() => {
        // Function to toggle menu visibility
        const toggleMenu = (event) => {
            // Get the target menu ID
            const target = event.currentTarget.dataset.target;
            // Find the target menu element
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the target menu
            event.currentTarget.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        };

        // Function to close the menu
        const closeMenu = () => {
            // Select all navbar burgers and remove "is-active" class
            const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
            const navbarMenu = document.getElementById('navbarMenu'); // Get the menu element

            navbarBurgers.forEach(el => el.classList.remove('is-active')); // Get the menu element
            if (navbarMenu) {
                // Remove active class from menu
                navbarMenu.classList.remove('is-active');
            }
        };

        // Add click event listeners to each navbar burger for toggling menu visibility
        const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
        navbarBurgers.forEach(el => el.addEventListener('click', toggleMenu));

        // Add click event listeners to each navbar item to close the menu when an item is clicked
        const navbarItems = Array.from(document.querySelectorAll('.navbar-item, .navbar-heading'));
        navbarItems.forEach(el => el.addEventListener('click', closeMenu));

    }, []);

    // Logout handler function
    const handleLogout = () => {
        removeCookies("access_token");
    }

    return (
        <nav className="navbar has-background-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link
                    to="/" 
                    className={'navbar-heading is-flex is-align-items-center'}

                >
                <h1 className="title is-4 ml-5 mr-5 has-text-centered" id="navbar-main">Diet Delight</h1>
                </Link>
                <Link 
                    role="button" 
                    aria-label="menu" 
                    aria-expanded="false" 
                    className="navbar-burger burger" 
                    data-target="navbarMenu"
                >
                    {/* Navbar burger icon with three lines */}
                    <span aria-hidden="true" className="has-text-black"></span>
                    <span aria-hidden="true" className="has-text-black"></span>
                    <span aria-hidden="true" className="has-text-black"></span>
                    <span aria-hidden="true" className="has-text-black"></span>
                </Link>
            </div>

            <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end mr-6">
                    {/* Navigation links */}
                    <Link 
                        to="/" 
                        className={`navbar-item has-text-black`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/search" 
                        className={`navbar-item has-text-black`}
                    >
                        Recipes
                    </Link>
                    <Link 
                        to="/about" 
                        className={`navbar-item has-text-black`}
                    >
                        About
                    </Link>
                    <Link 
                        to="/contact" 
                        className={`navbar-item has-text-black`}
                    >
                        Contact
                    </Link>
                    {!cookies.access_token ? (
                        <Link
                            to="/login"
                            className={`navbar-item has-text-black`}
                            >
                                Login
                        </Link> 
                    )   :   (
                        <Link
                            to="/login"
                            className={`navbar-item has-text-black`}
                            onClick = {handleLogout}
                        >
                            Logout
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;