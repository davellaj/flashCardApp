import React, { Component } from 'react'
import LandingContainer from './LandingContainer'
import Header from './Common/Header'

export class App extends Component {
  render() {
    return(
      <div>
        <Header />
        <LandingContainer />
      </div>
    )
  }
}

export default App;
