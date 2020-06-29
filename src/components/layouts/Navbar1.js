import React from 'react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark scrolling-navbar">
            <div className="container ml-5">
                <Link className="navbar-brand" to="/">
                    <b>EPITracker</b>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav smooth-scroll mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link " to="/"><b>Home</b>
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/how-it-works" data-offset="90"><b>How it Works</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" data-offset="90"><b>Contact Us</b></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="button-container mr-5">
                <button className="btn btn-outline-primary mr-2" aria-pressed="true"><NavLink to="/signin" className="nav_link">Sign In</NavLink></button>
                <button className="btn btn-outline-secondary" aria-pressed="true"><NavLink to="/signup" className="nav_link">Sign Up</NavLink></button>
            </div>
        </nav>
    )
}

export default Navbar;