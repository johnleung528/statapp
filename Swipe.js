import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import PhoneIcon from '@material-ui/icons/Phone';

import PersonPinIcon from '@material-ui/icons/PersonPin';
import Win from './app/Win';
import Build from './app/Build';
import Campus from './app/Campus';
import Stat from './app/Stat';
import Profile from './app/Profile';
import SvgIcon from '@material-ui/core/SvgIcon';
import Nav from './Nav';

class DemoTabs extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div style={{height: '100vh'}}>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <Win />
          <Build />
          <Campus />
          <Stat />
          <Profile />
        </SwipeableViews>
        <Nav index={index} handleChange={this.handleChange}/>


      </div>

    );
  }
}

export default DemoTabs;
