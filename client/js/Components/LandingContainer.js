import React, { Component } from 'react';
import { Link } from 'react-router';


class LandingContainer extends Component {
  componentWillMount() {
  }
  render() {
    console.log('LandingContainer');
    return (
        <div className="googleButton">
          <a href="/auth/google">
            <img className="googleButtonImg" src="../../assets/googleButton.png" />
          </a>
        </div>
    );
  }
}

export default LandingContainer;

// <Link className="btn btn-default btn-lg" to='/auth/google'>Login</Link>
