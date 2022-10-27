import React, { useEffect, useState } from "react";
import AwesomeSvg from "../svg-icons/Awesome.module";
import LocalStorage from "../../data/LocalStorage.module";

const Dropdown = ({ children, handleSetSort, handleSortProductsBy }) => {
  const restoreSelection = LocalStorage.get("sort");

  useEffect(() => {
    if (restoreSelection) {
      setSelection(restoreSelection);

      setTimeout(() => {
        handleSetSort(true);
        handleSortProductsBy(restoreSelection);
      }, 0);
    }
  }, []);

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [selection, setSelection] = useState(children[0]);

  const sortOptions = children;
  const CaretDown = AwesomeSvg.CaretDown;

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
    if (string === selection) return setToggleDropdown(false);

    setSelection(string);
    setToggleDropdown(false);

    handleSetSort(true);
    handleSortProductsBy(string.toLowerCase());
  };

  return (
    <ul
      style={dropdownStyle.dropdown}
      className="dropdown"
      data-state={toggleDropdown}
    >
      <li
        style={dropdownStyle.option}
        className="dropdown-selected"
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        <p>{selection}</p> <CaretDown parent={"dropdown"} />
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
            <p>{option}</p>
          </li>
        ))}
    </ul>
  );
};

export default Dropdown;
