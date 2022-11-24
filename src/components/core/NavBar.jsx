import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import errorLog from "../../logging/errorLog";

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
      <ul>
        {paths.map((path, index) => {
          return (
            <li key={index}>
              <NavLink to={path}>
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
