import React, { Component } from 'react';
import './Build.css';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      stat: {
        startFu: 0,
        completeFU: 0,
        startChurch: 0,
        fuJoinJM1: 0,
        JM1Member: 0
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.target.select();
  }

  handleChange(event) {
    this.setState({
      stat: {startFu: event.target.value}
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({stat: {startFu: 0}});
  }

  handleMinus() {
    let value = this.state.stat.startFu;
    value = value > 0 ? --value : value;
    this.setState({stat: {startFu: value}});
  }

  handlePlus() {
    let value = this.state.stat.startFu;
    value++;
    this.setState({stat: {startFu: value}})
  }

  toggleDrawer() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
        <div className="build">
          <Paper className='build-header'>
            <div className="build-box">
              <h1>Hi! John</h1>
              <Button onClick={this.toggleDrawer}>Open Drawer</Button>
            </div>
            <div className='build-box'>
              <h1 style={{marginRight: "30%"}}>Hi!</h1>
              <Select
                value={this.state.stat.startFu}
                onChange={this.handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </Paper>

          <Drawer open={this.state.open} onClose={this.toggleDrawer}>
            <div
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              abc
            </div>
          </Drawer>

          <section className='build-section'>
            RN
            <button onClick={this.handleMinus} >minus</button>
            <TextField
              id="number"
              value={this.state.stat.startFu}
              onClick={this.handleClick}
              onChange={this.handleChange}
              type="number"
              margin="dense"
              className='statNumber'
            />
            <button onClick={this.handlePlus} >plus</button>
          </section>
        </div>
    );
  }
}

export default Build;
