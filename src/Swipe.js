import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import PhoneIcon from '@material-ui/icons/Phone';
import Paper from '@material-ui/core/Paper';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Win from './app/Win';
import Build from './app/Build';
import Campus from './app/Campus';
import Stat from './app/Stat';
import Profile from './app/Profile';

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 0,
    minHeight: 100,
    color: '#000',
  },
  slide1: {
    backgroundColor: '#FEA900',
    height: '10vh'
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

class DemoTabs extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, value) => {
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
        <Paper>
          <Tabs
            value={index}
            fullWidth
            onChange={this.handleChange}
            style={{height: '10vh'}}
          >
            <Tab icon={<PhoneIcon />} label="Win" style={styles.slide1} />
            <Tab  label="Build" style={styles.slide2}/>
            <Tab icon={<PersonPinIcon />} label="Campus" style={styles.slide3}/>
            <Tab icon={<PersonPinIcon />} label="Stat" style={styles.slide3}/>
            <Tab icon={<PersonPinIcon />} label="Profile" style={styles.slide3}/>
          </Tabs>

        </Paper>

      </div>

    );
  }
}

export default DemoTabs;
