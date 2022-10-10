import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const [SearchBar, Nav, BasketWidget] = Array.from(props.children);

  return (
    <header>
      <ul>
        <li className="header__item--branding">
          <h1>
            Wireframe <span>Apparel</span>
          </h1>
          <img src="" alt="wireframe apparel logo" />
        </li>
        <li className="header__item--search">{SearchBar}</li>
        <li className="header__item--nav">
          {Nav}
          {BasketWidget}
        </li>

        {props.children.map((element, index) => {
          if (index >= 3) {
            return <li key={index}>{element}</li>;
          }
        })}
      </ul>
    </header>
  );
};

export default Header;

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
