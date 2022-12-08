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
      ref={dropdownRef}
      tabIndex={-1}
      style={dropdownStyle.dropdown}
      className="dropdown"
    >
      <li
        tabIndex={0}
        role="button"
        aria-label="Sort products dropdown menu button"
        style={dropdownStyle.option}
        className="dropdown-selected"
        onClick={() => setTimeout(() => setToggleDropdown(!toggleDropdown), 0)}
        onKeyDown={(e) =>
          e.code === "Space" || e.code === "Enter" || e.code === "NumpadEnter"
            ? setToggleDropdown(!toggleDropdown)
            : null
        }
      >
        {selection} <CaretDown parent={"dropdown"} />
      </li>

      {toggleDropdown ? (
        sortOptions.map((option, index) => (
          <li
            key={index}
            className="dropdown-choice"
            style={dropdownStyle.option}
            onClick={(e) => {
              handleSortOption(e.target.textContent);
            }}
            onKeyDown={(e) =>
              e.code === "Space" || e.code === "Enter" || e.code === "Return"
                ? handleSortOption(e.target.textContent)
                : null
            }
            tabIndex={0}
            role="button"
            aria-label={`Sort by: ${option}`}
          >
            {option}
          </li>
        ))
      ) : (
        <li style={{ width: 0, height: 0 }}></li>
      )}
    </ul>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  handleSetSort: PropTypes.func,
  handleSortProductsBy: PropTypes.func,
};

export default Dropdown;
