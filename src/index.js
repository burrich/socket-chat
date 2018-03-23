import React from 'react';
import ReactDOM from 'react-dom';
// import { hot } from 'react-hot-loader';
import App from './App';


// React hello world
ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);

// Hot module reload
// if (module.hot) {
//   module.hot.accept();
// }
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     console.log('module App accepted');
//   });
// }