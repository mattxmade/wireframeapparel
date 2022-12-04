import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./Header.style.scss";
import NavBar from "./NavBar";
import logo from "../../assets/brand/wireframe.webp";
import AwesomeSvg from "../svg-icons/Awesome.module";

const paths = ["/", "/shop", "/checkout"];

const handleDesktopHeader = (e) => (window.innerWidth > 1000 ? true : false);
const handleSmallVPHeader = (e) => (window.innerWidth <= 1000 ? true : false);
const handleMobileHeader = (e) => (window.innerWidth <= 570 ? true : false);

const Header = (props) => {
  const navigate = useNavigate();
  const MenuIcon = AwesomeSvg.BarsIcon;

  const navBarRef = useRef();
  const [SearchBar, BasketWidget] = Array.from(props.children);
  // const [SearchBar, Nav, BasketWidget] = Array.from(props.children);

  const [toggleNavBar, setToggleNavBar] = useState(false);
  const [renderDesktopHeader, setDesktopHeader] = useState(handleDesktopHeader);
  const [renderSmallVPHeader, setSmallVPHeader] = useState(handleSmallVPHeader);
  const [renderMobileHeader, setMobileHeader] = useState(handleMobileHeader);

  const handleViewportSize = (e) => {
    setDesktopHeader(handleDesktopHeader());
    setSmallVPHeader(handleSmallVPHeader());
    setMobileHeader(handleMobileHeader());
  };

  const handleToggleNavBar = (e) => setToggleNavBar(!toggleNavBar);

  const showNavBar = () => {
    navBarRef.current.classList.remove("hide-nav");
    navBarRef.current.classList.add("show-nav");
  };

  const hideNavBar = () => {
    navBarRef.current.classList.remove("show-nav");
    navBarRef.current.classList.add("hide-nav");
  };

  useEffect(() => {
    if (!renderDesktopHeader) return toggleNavBar ? showNavBar() : hideNavBar();

    navBarRef.current.classList.remove("show-nav");
    navBarRef.current.classList.remove("hide-nav");
  }, [renderDesktopHeader, toggleNavBar]);

  // TODO | refactor

  useEffect(() => {
    window.addEventListener("resize", handleViewportSize);
    return () => window.removeEventListener("resize", handleViewportSize);
  }, []);

  return (
    <header>
      <ul className="outline">
        {renderSmallVPHeader && (
          <li
            className="header__item header__item--cart"
            style={{
              zIndex: 11,
              cursor: "pointer",
              position: "relative",
            }}
            onClick={handleToggleNavBar}
          >
            {
              <i
                style={{
                  width: "3rem",
                  height: "3rem",
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

        <li ref={navBarRef} className="header__item--nav outline">
          <NavBar paths={paths} openNavBar={setToggleNavBar} />
        </li>

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
