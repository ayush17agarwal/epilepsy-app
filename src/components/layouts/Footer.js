import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

    return (
        <footer id="sticky-footer" className="pt-4 mb-auto bg-secondary text-white  ">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 text-white pb-auto">
                        <h4><Link to="/contact" className="deco-none">Contact</Link></h4>
                        <ul className="list-unstyled">
                            <li>EPITracker</li>
                            <li>+1 (224)-253-0940</li>
                            <li>Chicago, Illinois</li>
                            <li>support@epitracker.com</li>
                        </ul>
                    </div>
                </div>
                <hr color="white" />
                <div className="footer-bottom py-auto">
                    <p className="text-xs-center text-white">
                        &copy; {new Date().getFullYear()} EPITracker | All Rights Reserved
                     </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;