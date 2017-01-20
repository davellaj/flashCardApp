import React, { Component } from 'react';
import { Link } from 'react-router';


class LandingContainer extends Component {
  componentWillMount() {
  }
  render() {
    console.log('LandingContainer');
    return (
      <div className="LandingContainer">
        <div>
          <div className="googleButton"><a className="googleButtonURL" href="/auth/google"><img className="googleButtonImg" src="../../assets/googleButton.png" /></a></div>
        </div>
      </div>
    );
  }
}

export default LandingContainer;

// <Link className="btn btn-default btn-lg" to='/auth/google'>Login</Link>
