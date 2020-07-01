import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Signin.css';
import { setInStorage } from './../../utils/storage';

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signinEmail: '',
            signinPassword: '',
            signinError: '',
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }


    onChangeEmail(event) {
        this.setState({
            signinEmail: event.target.value,
        });
    }

    onChangePassword(event) {
        this.setState({
            signinPassword: event.target.value,
        });
    }

    onSignIn(event) {
        event.preventDefault();

        const user = {
            email: this.state.signinEmail,
            password: this.state.signinPassword,
        };

        console.log(user);

        axios.post('http://localhost:5000/signin/', user)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    setInStorage('epi_tracker_app', { token: res.data.token, time: Date.now() });
                    this.setState({
                        signinError: res.data.message,
                        signinEmail: '',
                        signinPassword: ''
                    });

                    window.location = '/dashboard';
                } else {
                    this.setState({
                        signinError: res.data.message,
                        signinPassword: '',
                    })
                }
            });
    }

    render() {
        document.body.style.backgroundColor = "#ffbdaa";

        const {
            signinEmail,
            signinPassword,
            signinError,
        } = this.state;


        return (
            <div className="text-center-signin py-5">
                <h2 className="h2 my-5 font-weight-normal">Sign in to gain access to all your data.</h2>
                <form className="form-signin">
                    <br />
                    {
                        (signinError) ? (<p>{signinError}</p>) : (null)
                    }
                    <label className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={signinEmail} onChange={this.onChangeEmail} required />
                    <br />
                    <label className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" value={signinPassword} onChange={this.onChangePassword} placeholder="Password" required />
                    <br /><br />
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.onSignIn} type="submit">Sign in</button>
                </form>
                <p className="my-3 text-muted">New to EPITracker? <Link to="/signup">create an account</Link></p>
                <p className="my-3 text-muted">&copy; EPITracker.com | 2020-{new Date().getFullYear()}</p>
            </div>
        );
    }

}

export default Signin;