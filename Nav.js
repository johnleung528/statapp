import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import './Nav.css';

const styles = {
  select: {
    borderBottom: 'solid 3px red',
  },
  icon: {
    opacity: '1'
  }

}

const Nav = (props) => {


  return (
    <Paper style={{height: '9.8vh'}}>
      <ul className="nav">
        <li
          key={0}
          className="button-win"
          style={props.index === 0 ? styles.select : {}}
          onClick={() => {props.handleChange(0)}}
        >
            <span className="icon-win" style={props.index === 0 ? styles.icon : {}}></span>
            <b style={props.index === 0 ? styles.icon : {}}>Win</b>
        </li>
        <li
          key={1}
          className="button-build"
          onClick={() => {props.handleChange(1)}}
        >
            <span className="icon-build"></span>
            <b>Build</b>
        </li>
        <li
          key={2}
          className="button-campus"
          onClick={() => {props.handleChange(2)}}
        >
            <span className="icon-campus"></span>
            <b>Campus</b>
        </li>
        <li
          key={3}
          className="button-stat"
          onClick={() => {props.handleChange(3)}}
        >
            <span className="icon-stat"></span>
            <b>Stat</b>
        </li>
        <li
          key={4}
          className="button-profile"
          onClick={() => {props.handleChange(4)}}
        >
            <span className="icon-profile"></span>
            <b>Profile</b>
        </li>
      </ul>
    </Paper>
  );
}
export default Nav;
