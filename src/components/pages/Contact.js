import React, { Component } from 'react';
import './css/Contact.css';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            message: '',
            error: '',
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    onChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        let nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
            service: process.env.NODEMAILER_PROCESS,
            auth: {
                user: process.env.NODEMAILER_USER,
                password: process.env.NODEMAILER_PASSWORD
            }
        });

        let mailOptions = {
            from: this.state.email,
            to: process.env.NODEMAILER_USER,
            Subject: 'Email from EpiTracker.com!!!',
            text: this.state.message
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                this.setState({
                    error: err,
                    email: ''
                });
                
            } else {
                console.log("success");
                this.setState({
                    error: 'Email sent: ' + info.response,
                    email: '',
                    name: '',
                    message: ''
                });
            }
        })

    }
    render() {
        document.body.style.backgroundColor = "#ffe190";

        const {
            email,
            name,
            message,
            error,
        } = this.state;

        return (
            <div className="text-align-center justify-content-center">
                <h1 className="text-center header">Need more Information?</h1>
                <form className="form-contact">
                    <h4 className="text-center pb-3">Ask our team a question and we will get back to you as soon as possible!</h4>
                    <br />
                    { (error) ? (<p>{error}</p>) : (null) }
                    <br/>
                    <label className="sr-only">Name</label>
                    <input type="text" id="inputText" className="form-control" placeholder="Name" value={name} onChange={this.onChangeName} required />
                    <br />
                    <label className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={email} onChange={this.onChangeEmail} required />
                    <br />
                    <label className="sr-only">Body</label>
                    <textarea type="text" id="inputText" className="form-control" rows="5" placeholder="Message" value={message} onChange={this.onChangeMessage} required />
                    <br /><br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        );
    }

}

export default Contact;