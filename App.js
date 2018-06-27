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
          <Tabs
            value={index}
            fullWidth
            onChange={this.handleChange}
            textColor="primary"
            style={{height: '10vh'}}
          >
            <Tab icon={<PhoneIcon style={{opacity: '0'}} />} label='Win' style={{backgroundColor: 'red'}} className='icon-win' />
            <Tab icon={<PhoneIcon />} label="Build" style={{backgroundColor: '#93e2ff'}}/>
            <Tab icon={<PersonPinIcon />} label="Campus" style={{backgroundColor: '#ffe375'}}/>
            <Tab icon={<PersonPinIcon />} label="Stat" style={{backgroundColor: '#80e591'}}/>
            <Tab icon={<PersonPinIcon />} label="Profile" style={{backgroundColor: '#dbaaff'}}/>
          </Tabs>
        </nav>
      </div>
    );
  }
}

export default App;
