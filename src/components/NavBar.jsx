import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar is-light">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <h1 className="title is-3">Diet Delight</h1>
                </Link>
                <span className="navbar-burger burger" data-target="navbarMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>

            <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        Home
                    </Link>
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
    );
};

export default NavBar;
