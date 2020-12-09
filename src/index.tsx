import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch,BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import Store, { persistor } from './store';
import { Home } from "./components/Home/Home"
import { SignIn } from "./components/Auth/SignIn"
import { SignUp } from "./components/Auth/SignUp"
import { New } from "./components/New/New"
import { Edit } from "./components/Edit/Edit"
import { PersistGate } from 'redux-persist/integration/react'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
        <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>

      <Router>
        <Switch>
            <Route path="/signin" component={SignIn}></Route>
              <Route path="/signup" component={SignUp}></Route>
              <Route path="/new" component={New}></Route>
              <Route path="/edit" component={Edit}></Route>
              <Route path="/" component={Home}></Route>
              
        </Switch>
      </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
