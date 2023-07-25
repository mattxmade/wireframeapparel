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
  const modal = document.querySelector(".modal--footer");
  modal.showModal();
};

const ExternalLink = (props) =>
  props.link && (
    <button>
      <a tabIndex={-1} href={props.link} target="_blank">
        <span className="sr-only">{props.screenreader}</span>
        <i>{props.children}</i>
      </a>
    </button>
  );

const Footer = (props) => {
  const location = useLocation();

  return location.pathname !== "/" ? null : (
    <Fragment>
      <Modal
        className="modal--footer"
        title="React Shopping Cart"
        heading="// Built with:"
        subheading="// Credits:"
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
        <ExternalLink
          link="https://github.com/mattxmade/wireframeapparel"
          screenreader="GitHub"
        >
          <GitHubIcon />
        </ExternalLink>

        <ExternalLink
          link="https://twitter.com/mattxmade"
          screenreader="Twitter"
        >
          <TwitterIcon />
        </ExternalLink>
      </Modal>

      <footer>
        <ul>
          <li>
            <ExternalLink
              link="https://github.com/mattxmade/wireframeapparel"
              screenreader="GitHub"
            >
              <GitHubIcon />
            </ExternalLink>
          </li>

          <li>
            <ExternalLink
              link="https://twitter.com/mattxmade"
              screenreader="Twitter"
            >
              <TwitterIcon />
            </ExternalLink>
          </li>

          <li>
            <button>
              <i onClick={showModal} style={{ transform: "rotate(180deg)" }}>
                <span className="sr-only">Project info modal</span>
                <InfoIcon />
              </i>
            </button>
          </li>
        </ul>
      </footer>
    </Fragment>
  );
};

export default Footer;
