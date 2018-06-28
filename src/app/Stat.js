import React, { Component } from 'react';
import './Stat.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: {
        month: 7,
      },
      personal: {
        rn: 0,
        mc: 0,
        inv: 0,
        prc: 0,
        hsb: 0,
        ahs: 0,
        startFu: 0,
        completeFU: 0,
        startChurch: 0,
        fuJoinJM1: 0,
        JM1Member: 0
      },
      team: {
        rn: 0,
        mc: 0,
        inv: 0,
        prc: 0,
        hsb: 0,
        ahs: 0,
        startFu: 0,
        completeFU: 0,
        startChurch: 0,
        fuJoinJM1: 0,
        JM1Member: 0
      }

    }

  }

  render() {
    return (
        <div className="stat">
          <header className="stat-header">
            <h1>Header Stat</h1>
            <Select
              value={this.state.period.month}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </header>
          <section>
            ABC
          </section>
        </div>
    );
  }
}

export default Stat;
