import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './Components/App';
import LandingContainer from './Components/LandingContainer';
import FlashCards from './Components/FlashCards';

// import routes from './routes';
import reducers from './Reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={LandingContainer} />
        <Route path="/question" component={FlashCards} />
      </Route >
    </Router>
  </Provider>,
  document.getElementById('app')
);
