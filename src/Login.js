import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import App from './App';

const account = {
  name: 'john',
  password: 'iamjohn'
}

const Home = () => (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route exact path="/dashboard/win" component={App} />

    </div>
  </Router>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      name: "",
      password: ""
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signout = this.signout.bind(this);
  }

  signout() {
    this.setState({isAuthenticated: false});
  }

  handleChange(event) {
    if (event.target.name  === "password")
      this.setState({password: event.target.value});
    else if (event.target.name === "name")
      this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name === account.name && this.state.password === account.password)
      this.setState({isAuthenticated: true});
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/dashboard"/>
    } else {
      return (
        <div>
          <p>Please Sign In</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" placeholder="Enter your name here" value={this.state.name} onChange={this.handleChange} />
            </label>
            <br/>
            <label>
              Password:
              <input type="text" name="password" value={this.state.password} placeholder="Enter your password here" onChange={this.handleChange}/>
            </label>
            <br/>
            <input type="submit" value="Login"/>
          </form>
        </div>
      );
    }
  }
}

export default Home;
