import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';
import Nav from './Nav';
import './App.css';

const Loading = () => <div>Loading...</div>;

const NoMatch = () => <div>404 Not Found</div>;

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

const Win = Loadable({
    loader: () => import('./routes/Win'),
    loading: Loading,
});

const Build = Loadable({
    loader: () => import('./routes/Build'),
    loading: Loading,
});

const Campus = Loadable({
    loader: () => import('./routes/Campus'),
    loading: Loading,
});

const Stat = Loadable({
    loader: () => import('./routes/Stat'),
    loading: Loading,
});

const Profile = Loadable({
    loader: () => import('./routes/Profile'),
    loading: Loading,
});

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <div className="content-container">
            <Switch>
              <Route path="/win" component={Win}/>
              <Route path="/build" component={Build}/>
              <Route path="/campus" component={Campus}/>
              <Route path="/stat" component={Stat}/>
              <Route path="/profile" component={Profile}/>
              {/* when none of the above match, <NoMatch> will be rendered */}
              <Route component={NoMatch}/>
            </Switch>
          </div>

          <nav className="nav-container">
            <Nav />
          </nav>
        </div>
      </Router>
    );
  }
}

export default App;
