import React, { Component } from 'react';
import './Navbar.css';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { getFromStorage } from './../../utils/storage';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logoutError: '',
        };

        this.onLogOut = this.onLogOut.bind(this);
    }


    onLogOut(event) {
        event.preventDefault();

        const obj = getFromStorage('epi_tracker_app');

        if (obj && obj.token) {
            const { token } = obj;
            axios.get('http://localhost:5000/logout/account?token=' + token)
                .then(res => {
                    if (res.data.success) {
                        console.log('all good here');
                        localStorage.removeItem('epi_tracker_app');
                        this.setState({
                            logoutError: res.data.message,
                        });

                        window.location = "/";
                    } else {
                        console.log('whoops, wrong token :(');
                        this.setState({
                            logoutError: res.data.message,
                        });
                    }
                });
        }

    }

    render() {
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
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard" data-offset="90"><b>Dashboard</b></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="button-container mr-5">
                    <button className="btn btn-outline-primary mr-2" aria-pressed="true"><NavLink to="/profile" className="nav_link">Profile</NavLink></button>
                    <button className="btn btn-outline-danger" aria-pressed="true" onClick={this.onLogOut}>Logout</button>
                </div>
            </nav>
        )

    }
}

export default Navbar;