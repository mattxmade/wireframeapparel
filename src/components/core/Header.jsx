import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "../../styles/Header.css";
import logo from "../../assets/brand/wireframe.png";
import AwesomeSvg from "../svg-icons/Awesome.module";

const Header = (props) => {
  const navigate = useNavigate();
  const [SearchBar, Nav, BasketWidget] = Array.from(props.children);
  const MenuIcon = AwesomeSvg.BarsIcon;

  const handleDesktopHeader = (e) => (window.innerWidth > 1000 ? true : false);
  const handleSmallVPHeader = (e) => (window.innerWidth <= 1000 ? true : false);
  const handleMobileHeader = (e) => (window.innerWidth <= 570 ? true : false);

  const [renderDesktopHeader, setDesktopHeader] = useState(handleDesktopHeader);
  const [renderSmallVPHeader, setSmallVPHeader] = useState(handleSmallVPHeader);
  const [renderMobileHeader, setMobileHeader] = useState(handleMobileHeader);

  const handleViewportSize = (e) => {
    setDesktopHeader(handleDesktopHeader());
    setSmallVPHeader(handleSmallVPHeader());
    setMobileHeader(handleMobileHeader());
  };

  // TODO | refactor/recompose aS three elements based on viewport size

  useEffect(() => {
    window.addEventListener("resize", handleViewportSize);
    return () => window.removeEventListener("resize", handleViewportSize);
  }, []);

  useEffect(() => {}, [renderDesktopHeader, renderSmallVPHeader]);

  return (
    <header>
      <ul className="outline">
        {renderSmallVPHeader && (
          <li
            className="header__item header__item--cart"
            style={{
              cursor: "pointer",
            }}
          >
            {
              <i
                style={{
                  width: "3rem",
                  height: "auto",
                  fill: "white",
                  padding: "0.5rem",
                  background:
                    "linear-gradient(45deg, rgb(122, 122, 122), rgb(110, 109, 109), rgb(122, 122, 122))",
                }}
              >
                <MenuIcon />
              </i>
            }
          </li>
        )}

        <li
          className="header__item header__item--branding outline "
          onClick={() => navigate("/")}
        >
          <h1 className="outline">
            Wireframe <span className="outline">Apparel</span>
          </h1>
          <img className="outline" src={logo} alt="wireframe apparel logo" />
        </li>

        {!renderMobileHeader && (
          <li className="header__item header__item--search">{SearchBar}</li>
        )}

        {renderDesktopHeader && (
          <li className="header__item--nav outline">{Nav}</li>
        )}

        <li className="header__item header__item--cart">{BasketWidget}</li>

        {renderMobileHeader && (
          <li className="header__item header__item--search">{SearchBar}</li>
        )}

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
