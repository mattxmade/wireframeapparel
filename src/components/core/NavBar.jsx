import React from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import errorLog from "../../logs/errorLog";

import "./NavBar.style.scss";

const validPaths = (paths) => {
  if (!paths.length) errorLog("NavBar: array is empty");

  paths.map((path) => {
    if (typeof path !== "string") errorLog("NavBar: path must be a string");
  });

  return true;
};

const capitaliseString = (string, start, end) =>
  string.slice(start, end).toUpperCase() + string.slice(end);

const processPath = (string) => {
  const pathToProcess = string;

  return pathToProcess.slice(0, 1) === "/"
    ? capitaliseString(pathToProcess, 1, 2)
    : capitaliseString(pathToProcess, 0, 1);
};

const NavBar = ({ paths, openNavBar }) => {
  if (!validPaths(paths)) return;

  // <li onClick={() => openNavBar(false)}/>

  return (
    <nav>
      <ul id="primary-navigation">
        {paths.map((path, index) => {
          return (
            <li key={index}>
              <NavLink className="nav-link--select" to={path}>
                {path === "/" ? "Home" : processPath(path)}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;

NavBar.propTypes = {
  paths: PropTypes.array,
};

// .at() string method requires core-js | https://stackoverflow.com/a/59285424
// required for jest testing
