import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar has-background-primary">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <h1 className="title is-4 has-text-black ml-6">Diet Delight</h1>
                </Link>
                <span className="navbar-burger burger" data-target="navbarMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>

            <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end mr-6">
                    <Link to="/" className="navbar-item has-text-black">
                        Home
                    </Link>
                    <Link to="/features" className="navbar-item has-text-black">
                        Features
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
