import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Signin from './components/Signin';
import Chat from './components/chat/Chat';

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/">
              <Signin />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;