import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import Logo from './logo';
import '../styles/splash.css'
class Splash extends Component {
  render(){
    return (
      <div className="splash-container">
        <div className="splash-logo">
          <Logo />
        </div>
        <div className="jumbotron-container">
          <div className="jumbotron-copy">
            <h1>Let Us Decide</h1>
            <p>Our application pairs you with an ambassador for your trip so that you can
              receive trusted local suggestions for your trip only for the times you need.</p>
          </div>
          <div className="jumbotron-form">
            <Login/>
          </div>
        </div>
        <div className="placeholder-1">
          <span>this is a placeholder for section</span>
        </div>
        <div className="footer">
          <span>this is placeholder for the footer</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn:null
})


export default connect(mapStateToProps)(Splash);
