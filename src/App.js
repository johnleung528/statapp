import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import SwipeableRoutes from "react-swipeable-routes";
import Win from './routes/Win';
import Build from './routes/Build';
import Campus from './routes/Campus';
import Stat from './routes/Stat';
import Profile from './routes/Profile';
import Nav from './Nav';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <div className="content-container">
          <SwipeableRoutes>
            <Route exact path="/dashboard/win" component={Win}/>
            <Route path="/dashboard/build" component={Build}/>
            <Route path="/dashboard/campus" component={Campus}/>
            <Route path="/dashboard/stat" component={Stat}/>
            <Route path="/dashboard/profile" component={Profile}/>
          </SwipeableRoutes>

        </div>
        <nav className="nav-container">
          <Nav />
        </nav>
      </div>
    );
  }
}

export default App;
