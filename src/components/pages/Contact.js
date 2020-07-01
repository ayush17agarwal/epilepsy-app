import React, { Component } from 'react';
import './css/Contact.css';

class Contact extends Component {
    render() {
        document.body.style.backgroundColor = "#ffe190";
        return (
            <div className="text-align-center justify-content-center">
                <h1 className="text-center header">Need more Information?</h1>

                <form className="form-contact mt-3">
                    <h5 class="text-center pb-3">Ask our team a question and we will get back to you as soon as possible!</h5>
                    <br />
                    <label className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                    <br />
                    <label className="sr-only">Subject</label>
                    <input type="text" id="inputText" className="form-control" placeholder="Subject" required />
                    <br />
                    <label className="sr-only">Body</label>
                    <textarea type="text" id="inputText" className="form-control" placeholder="Message" required />
                    <br /><br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        );
    }

}

export default Contact;