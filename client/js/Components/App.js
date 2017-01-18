import React, { Component } from 'react'
import LandingContainer from './LandingContainer'
import Header from './Common/Header'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default App;
