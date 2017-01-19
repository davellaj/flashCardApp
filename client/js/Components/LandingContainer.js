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
        <button>Login</button>
        <div>
          <Link to='question'>FlashCards</Link>
        </div>
      </div>
    )
  }
}

export default LandingContainer
