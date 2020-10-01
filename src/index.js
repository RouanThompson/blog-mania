import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
import { BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
  );
  
  
  
  
  // import './index.css';
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  // import * as serviceWorker from './serviceWorker';
  // serviceWorker.unregister();
