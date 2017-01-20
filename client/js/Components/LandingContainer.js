import React, { Component } from 'react'
import { Link } from 'react-router'


class LandingContainer extends Component {
  componentWillMount() {
  }
  render() {
    console.log('LandingContainer')
    return (
      <div>
        <h1>German</h1>
        <div>
          <div><a className="btn btn-default btn-lg"  href="/auth/google">Alt Login</a></div>
        </div>
      </div>
    )
  }
}

export default LandingContainer

// <Link className="btn btn-default btn-lg" to='/auth/google'>Login</Link>
