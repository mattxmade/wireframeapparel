import React, { Fragment } from "react";

import "./Footer.style.scss";
import Modal from "./Modal";
import AwesomeSvg from "../svg-icons/Awesome.module";
import { useLocation } from "react-router-dom";

const InfoIcon = AwesomeSvg.CircleExclamationMarkIcon;
const { TwitterIcon, GitHubIcon, GlobeIcon } = AwesomeSvg;

let open = false;

const showModal = () => {
  open = !open;
  const modal = document.querySelector("dialog");
  modal.showModal();
};

const ExternalLink = (props) =>
  props.link && (
    <a href={props.link} target="_blank">
      <i>{props.children}</i>
    </a>
  );

const Footer = (props) => {
  const location = useLocation();

  return location.pathname !== "/" ? null : (
    <Fragment>
      <Modal
        title="React Shopping Cart"
        logo={<GlobeIcon />}
        author="mattxmade"
        year="2022"
        content={["React", "React-Three-Fibre", "Sass", "Webpack"]}
        credit={[
          "3D Models: Turbosquid | TheBaseMesh",
          "Images: Pixabay | Pexels",
          "Progamming language logos by abrahamcalf",
          "",
          "Wireframe Apparel designs by mattxmade",
        ]}
        icons={[TwitterIcon]}
      >
        <ExternalLink link="https://github.com/mattxmade/shopping-cart">
          <GitHubIcon />
        </ExternalLink>

        <ExternalLink link="https://twitter.com/mattxmade">
          <TwitterIcon />
        </ExternalLink>
      </Modal>

      <footer>
        <ul>
          <ExternalLink link="https://github.com/mattxmade/shopping-cart">
            <GitHubIcon />
          </ExternalLink>

          <ExternalLink link="https://twitter.com/mattxmade">
            <TwitterIcon />
          </ExternalLink>

          <i onClick={showModal}>
            <InfoIcon />
          </i>
        </ul>
      </footer>
    </Fragment>
  );
};

export default Footer;
