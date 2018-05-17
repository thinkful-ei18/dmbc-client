import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./login";
import Logo from "./logo";
import QuickAbout from "./quickAbout";
import "../styles/splash.css";
class Splash extends Component {
  render() {
    return (
      <div className="splash-container">
        <div className="splash-logo">
          <Logo />
        </div>
        <div className="jumbotron-container">
          <div className="jumbotron-copy">
            <h1>Your Personal Concierge</h1>
            <p>
              Want to see a play on Broadway? Shop in Tokyo? Hike in Brazil?
              Dine in Paris? Dance in Toronto?
              {/* <br/> */}
              Pley pairs you with an expert insider who knows the hottest new
              places, local favorites, hidden gems, and insider tips for your
              next destination so you can spend less time chosing and more time
              doing.
            </p>
          </div>
          <div className="jumbotron-form">
            <Login />
          </div>
        </div>
        <div>
          <QuickAbout />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: null
});

export default connect(mapStateToProps)(Splash);
