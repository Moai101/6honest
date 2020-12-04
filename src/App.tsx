import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import Store from './store';
import { Home } from "./components/Home"



class App extends React.Component {

  render(){
    return (
      <Provider store={Store}>
        <Router>
          <Route path="/" component={Home}></Route>
        </Router>

    </Provider>
    );

  }

}

export default App;