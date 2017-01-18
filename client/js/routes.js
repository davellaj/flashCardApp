import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './Components/App';
import LandingContainer from './Components/LandingContainer';
import FlashCards from './Components/FlashCards'

export default (
  <Route path="/" component={App} >
    <IndexRoute component={FlashCards} />
    <Route path="/question" component={LandingContainer} />
  </ Route >
)
