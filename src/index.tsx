import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch,BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import Store from './store';
import { Home } from "./components/Home/Home"
import { SignIn } from "./components/Auth/SignIn"
import { SignUp } from "./components/Auth/SignUp"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
        <Provider store={Store}>
      <Router>
        <Switch>
            <Route path="/signin" component={SignIn}></Route>
              <Route path="/signup" component={SignUp}></Route>
              <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
