import React, { Component } from 'react';
import axios from 'axios';
import { getFromStorage } from '../../../utils/storage';
import { capitalize } from '../../../utils/util';
import { Link } from 'react-router-dom';
import './../css/Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dashboardName: '',
            dashboardError: '',
        };
    }
    componentDidMount() {
        document.body.style.backgroundColor = "#ffd1c3";
        const obj = getFromStorage('epi_tracker_app');

        if (obj && obj.token) {
            const { token } = obj;

            axios.get('http://localhost:5000/user/name?token=' + token)
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        const name = capitalize(res.data.name);

                        this.setState({
                            dashboardError: res.data.message,
                            dashboardName: name,
                        });
                    } else {
                        this.setState({
                            dashboardError: res.data.message,
                        });
                    }
                });
        } else {
            return <div><p>Whoops, there was an error</p></div>
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="mt-5 text-center py-5">Welcome to your dashboard, {this.state.dashboardName}!</h1>

                <div className="card-deck mb-3 justify-content-center">
                    <div className="card border col-md-4 text-center">
                        <div className="card-body">
                            <h5 className="card-title">Your Types</h5>
                            <p className="card-text">Holy moly. Lorem blah blah</p>
                            <button className="btn btn-primary"><Link to="/types" className="nav_link">Types</Link></button>
                        </div>
                    </div>
                    <div className="card border col-md-4 text-center">
                        <div className="card-body">
                            <h5 className="card-title">Your Medicines</h5>
                            <p className="card-text">Holy moly. Loren blah blah blah.</p>
                            <button className="btn btn-primary"><Link to="/medicines" className="nav_link">Medicines</Link></button>
                        </div>
                    </div>
                </div>
                <div className="card-deck justify-content-center">
                    <div className="card border col-md-4 text-center">
                        <div className="card-body">
                            <h5 className="card-title">Your Events</h5>
                            <p className="card-text">Holy moly. Lorem blah blah blah blah.</p>
                            <button className="btn btn-primary"><Link to="/events" className="nav_link">Events</Link></button>
                        </div>
                    </div>
                    <div className="card border col-md-4 text-center">
                        <div className="card-body">
                            <h5 className="card-title">Analyze the Data</h5>
                            <p className="card-text">Holy moly. Lorem blah blah blah blah.</p>
                            <button className="btn btn-primary"><Link to="/analysis" className="nav_link">Analysis</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Dashboard;