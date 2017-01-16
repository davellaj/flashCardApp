import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';


console.log(`Client running in ${process.env.NODE_ENV} mode`);
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
