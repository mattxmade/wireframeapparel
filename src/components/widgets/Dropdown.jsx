import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import "./Dropdown.style.scss";
import AwesomeSvg from "../svg-icons/Awesome.module";
import LocalStorage from "../../data/LocalStorage.module";

const Dropdown = ({ children, handleSortProductsBy }) => {
  const dropdownRef = useRef();
  const restoreSelection = LocalStorage.get("sort");

  useEffect(() => {
    window.addEventListener("click", closeDropdown);

    if (restoreSelection) {
      setSelection(restoreSelection);
      setTimeout(() => handleSortProductsBy(restoreSelection), 0);
    }

    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  const toggleRef = useRef();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [selection, setSelection] = useState(children[0]);

  const closeDropdown = () => {
    if (toggleRef.current) setToggleDropdown(false);
  };

  const sortOptions = children;
  const CaretDown = AwesomeSvg.CaretDownIcon;

  const dropdownStyle = {
    dropdown: {
      zIndex: 2,
      display: "flex",
      width: "100%",
      flexDirection: "column",
      position: "absolute",
      backgroundColor: "white",
      left: 0,
      top: 0,
    },

    option: {
      width: "100%",
      cursor: "pointer",
    },
  };

  const handleSortOption = (string) => {
    dropdownRef.current.focus();
    if (string === selection) return setToggleDropdown(false);

    setSelection(string);
    setToggleDropdown(false);
    handleSortProductsBy(string.toLowerCase());
  };

  useEffect(() => {
    toggleRef.current = toggleDropdown;
    dropdownRef.current.setAttribute("aria-expanded", toggleDropdown);
  }, [toggleDropdown]);

  return (
    <ul
      tabIndex={-1}
      ref={dropdownRef}
      style={dropdownStyle.dropdown}
      className="dropdown"
      aria-label="Sort products dropdown menu"
    >
      <li
        style={dropdownStyle.option}
        className="dropdown-selected"
        onClick={() => setTimeout(() => setToggleDropdown(!toggleDropdown), 0)}
      >
        <button>{selection}</button> <CaretDown parent={"dropdown"} />
      </li>

      {toggleDropdown &&
        sortOptions.map((option, index) => (
          <li
            key={index}
            className="dropdown-choice"
            style={dropdownStyle.option}
            onClick={(e) => {
              handleSortOption(e.target.textContent);
            }}
          >
            <button>{option}</button>
          </li>
        ))}
    </ul>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  handleSetSort: PropTypes.func,
  handleSortProductsBy: PropTypes.func,
};

export default Dropdown;
