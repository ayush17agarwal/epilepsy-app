import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { getFromStorage } from './utils/storage';
import Navbar1 from './components/layouts/Navbar1';
import Navbar2 from './components/layouts/Navbar2';
import Footer from './components/layouts/Footer';
import { Switch, Route } from 'react-router-dom';
import HowItWorks from './components/pages/HowItWorks';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Types from './components/pages/Types';
import Medicines from './components/pages/Medicines';
import Analysis from './components/pages/Analysis';
import Events from './components/pages/Events';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const obj = getFromStorage('epi_tracker_app');
    console.log(obj);
    if (obj && obj.token && obj.time) {
      const { token, time } = obj;
      const milliseconds = Date.now() - time;
      if (Math.floor(milliseconds / 1000) > 900000) {

        localStorage.removeItem('epi_tracker_app');
        this.setState({
          isLoading: false,
        });
      }

      //verify token
      axios.get('http://localhost:5000/signin/verify?token=' + token)
        .then(res => {
          if (res.data.success) {
            console.log('all good here');
            this.setState({
              token: token,
              isLoading: false,
            });
          } else {
            console.log('whoops, wrong token :(');
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      console.log('whoops, no token :((((');
      this.setState({
        isLoading: false,
      });
    }
  }



  render() {

    const {
      isLoading,
      token
    } = this.state;

    if (isLoading) {
      return (<div></div>)
    }

    if (!token) {
      return (
        <div>
          <Navbar1 />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/contact" component={Contact} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />

          </Switch>
          <Footer />
        </div>
      );
    }

    return (
      <div>
        {/* <p>Account stuff</p>
        <button>Logout</button> */}
        <Navbar2 />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/contact" component={Contact} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/types" component={Types} />
          <Route path="/events" component={Events} />
          <Route path="/medicines" component={Medicines} />
          <Route path="/analysis" component={Analysis} />

        </Switch>
        <Footer />
      </div>
    )
  }
}




export default App;
