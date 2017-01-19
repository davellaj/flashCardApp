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
        <Link to='question'>FlashCards</Link>
      </div>
    )
  }
}

export default LandingContainer
