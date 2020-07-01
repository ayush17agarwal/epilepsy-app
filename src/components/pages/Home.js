import React, { Component } from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {
        document.body.style.backgroundColor = "#ffd1c3";
        return (
            <div>
                <div className="justify-content-center align-items-center">
                    <div className="container px-md-3 px-sm-0">
                        <div className="col-lg-12 mb-4 text-white text-center">
                            <h3 className="display-3 font-weight-bold text-white mb-0 pt-md-5 pt-5">Epi Tracker</h3>
                            <h4 className="subtext-header mt-2 mb-4">The best and most user friendly epilepsy tracking application on the market!</h4>
                            <hr className="hr-white my-4 w-75" />
                            <button className="btn btn-round btn-outline-light btn-lg"><Link to="/how-it-works" className="link">Get Started</Link></button>
                        </div>
                    </div>
                </div>
                <div className="statistics justify-content-center align-items-center">
                    <div className="stats-container px-md-3 px-sm-0">
                        <h5 className="h5 pt-5 text-center text-white text-wrap">
                            "quote 1...blah blah blah...."
                        </h5>
                        <h5 className="h5 py-auto text-center text-white text-wrap">
                            "quote 2 ... blah blah blah..."
                        </h5>
                        <h5 className="h5 py-auto text-center text-white text-wrap">
                            "quote 3 ... blah blah blah ...."
                        </h5>
                    </div>
                </div>
            </div >
        );
    }

}

export default Home;