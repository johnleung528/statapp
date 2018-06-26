import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
      <ul className="nav">
        <li className="button-win">
          <NavLink activeClassName="selected" to="/dashboard/win">
            <span className="icon-win"></span>
            <b>Win</b>
          </NavLink>
        </li>
        <li className="button-build">
          <NavLink activeClassName="selected" to="/dashboard/build">
            <span className="icon-build"></span>
            <b>Build</b>
          </NavLink>
        </li>
        <li className="button-campus">
          <NavLink activeClassName="selected" to="/dashboard/campus">
            <span className="icon-campus"></span>
            <b>Campus</b>
          </NavLink>
        </li>
        <li className="button-stat">
          <NavLink activeClassName="selected" to="/dashboard/Stat">
            <span className="icon-stat"></span>
            <b>Stat</b>
          </NavLink>
        </li>
        <li className="button-profile">
          <NavLink activeClassName="selected" to="/dashboard/profile">
            <span className="icon-profile"></span>
            <b>Profile</b>
          </NavLink>
        </li>
      </ul>
    );
}
export default Nav;
