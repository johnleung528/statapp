import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <ul className="nav">
      <li className="button-win">
        <NavLink activeClassName="selected" to="/win">
          <span className="icon-win"></span>
          <b>Win</b>
        </NavLink>
      </li>
      <li className="button-build">
        <NavLink activeClassName="selected" to="/build">
          <span className="icon-win"></span>
          <b>Build</b>
        </NavLink>
      </li>
      <li className="button-campus">
        <NavLink activeClassName="selected" to="/campus">
          <span className="icon-win"></span>
          <b>Campus</b>
        </NavLink>
      </li>
      <li className="button-stat">
        <NavLink activeClassName="selected" to="/Stat">
          <span className="icon-stat"></span>
          <b>Stat</b>
        </NavLink>
      </li>
      <li className="button-profile">
        <NavLink activeClassName="selected" to="/profile">
          <span className="icon-win"></span>
          <b>Profile</b>
        </NavLink>
      </li>
    </ul>
  );
}
export default Nav;
