import React, { Component } from 'react';
import axios from 'axios';
import './css/Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signupName: '',
            signupDob: '',
            signupEmail: '',
            signupPassword: '',
            signupError: '',
        };

        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    onChangeEmail(event) {
        this.setState({
            signupEmail: event.target.value,
        });
    }

    onChangePassword(event) {
        this.setState({
            signupPassword: event.target.value,
        });
    }

    onChangeName(event) {
        this.setState({
            signupName: event.target.value,
        });
    }

    onChangeDob(event) {
        this.setState({
            signupDob: event.target.value,
        });
    }

    onSignUp(event) {
        event.preventDefault();

        const user = {
            name: this.state.signupName,
            dob: this.state.signupDob,
            email: this.state.signupEmail,
            password: this.state.signupPassword,
        };

        axios.post('http://localhost:5000/signup/', user)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        signupError: res.data.message,
                    });

                    if (window.confirm('Your account has been created successfully! \n Please login to your account.')) {
                        window.location = '/';
                    }
                } else {
                    this.setState({
                        signupError: res.data.message,
                        signupPassword: '',
                    })
                }
            });
    }

    render() {
        document.body.style.backgroundColor = "#ffbdaa";

        const {
            signupDob,
            signupEmail,
            signupError,
            signupName,
            signupPassword,
        } = this.state;

        return (
            <div className="text-center">
                <h1 className="h1 my-5 font-weight-normal">Create your new account</h1>
                {
                    (signupError) ? (<p>{signupError}</p>) : (null)
                }
                <form className="form-signup">
                    <h6>Name:</h6>
                    <label className="sr-only">Name</label>
                    <input type="name" id="inputName" className="form-control" value={signupName} onChange={this.onChangeName} placeholder="Name" required autoFocus="" />
                    <br />
                    <h6>Date of Birth:</h6>
                    <label className="sr-only">Date of Birth</label>
                    <input type="date" id="inputDOB" name="dob" className="form-control" value={signupDob} onChange={this.onChangeDob} placeholder="Date of Birth" required autoFocus=""></input>
                    <br />
                    <h6>Email Address:</h6>
                    <label className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" value={signupEmail} onChange={this.onChangeEmail} placeholder="Email address" required autoFocus="" />
                    <br />
                    <h6>Password:</h6>
                    <label className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" value={signupPassword} onChange={this.onChangePassword} placeholder="Password" required />
                    <p className="text-muted password-reqs">Your password must be at least 8 characters long</p>
                    <br /><br />
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.onSignUp} type="submit">Sign up</button>
                </form>
            </div>
        );
    }

}

export default Signup;