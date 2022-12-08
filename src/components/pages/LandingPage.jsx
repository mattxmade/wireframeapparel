import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Carousel from "../widgets/Carousel";
import GridPlaneSvg from "../svg-images/GridPlaneSvg";
import LocalStorage from "../../data/LocalStorage.module";
import AssetsFromDirectory from "../../assets/AssetsFromDirectory";

import "./LandingPage.style.scss";

const animations = {
  translatePositionY: {
    animation: [
      { transform: "translate(0, -30vh)" },
      { transform: "translate(0,0)" },
    ],
  },
  colorToTransparent: {
    animation: [
      { color: "black", backgroundColor: "aliceblue" },
      { color: "transparent", backgroundColor: "transparent" },
    ],
  },
  transparentToColor: {
    animation: [
      { color: "transparent", backgroundColor: "transparent" },
      { color: "black", backgroundColor: "aliceblue" },
    ],
  },
};

const animTiming = (delay, duration, iterations, fill) => {
  return { fill, delay, duration, iterations };
};

const getCarouselHeight = () =>
  getComputedStyle(document.querySelector(".carousel-container")).height;

const LandingPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const visited = LocalStorage.get("visited") ?? false;

  const tshirts = AssetsFromDirectory("tshirts");
  const skateboards = AssetsFromDirectory("skateboards");

  const imageTree = [];
  const resources = [tshirts, skateboards];
  resources.map((resource) =>
    resource.map((item, index) => {
      if (item.name === "wireframe_wf_ts_bwc_fmbn_y.png") return;

      if (index >= 13 && index <= 19) imageTree.push(item);
    })
  );

  const refHeading = useRef();

  const [actionText, setActionText] = useState(
    !visited ? "// WELCOME TO WIREFRAME APPAREL" : "// SHOP APPAREL"
  );

  const animationProps_h2 = !visited ? "apply-anims__h2-call-to-action" : "";

  const [cursor, setCursor] = useState("auto");
  const [styleProps, setStyleProps] = useState({});

  const handleViewportChange = (e) => {
    setTimeout(() => setStyleProps({ height: getCarouselHeight() }), 1000);
  };

  useEffect(() => {
    const header = document.querySelector("header");

    const pageMask = document.querySelector("#mask");
    const gridCont = document.querySelector(".grid-container__grid");

    const grid = document.querySelector("#svg-line-grid");
    const gridSky = document.querySelector("#svg-rect-sky");
    const gridPln = document.querySelector("#svg-grid-plane");

    const action = document.querySelector(".landing__call-to-action");
    const carousel = document.querySelector(".carousel");

    if (!visited) {
      setTimeout(() => {
        carousel.parentNode.classList.add("animate--carousel__clip-path");
      }, 4000); // 2000// 1200

      setTimeout(() => {
        setActionText("// SHOP APPAREL");
        setCursor("pointer");
      }, 6000);

      refHeading.current.animate(
        animations.colorToTransparent.animation,
        animTiming(4000, 2000, 1, "forwards")
      );
      refHeading.current.animate(
        animations.translatePositionY.animation,
        animTiming(6250, 0, 1, "forwards")
      );
      refHeading.current.animate(
        animations.transparentToColor.animation,
        animTiming(7000, 600, 1, "forwards")
      );

      let offset = 200;

      setTimeout(() => {
        pageMask.classList.add("animate--mask__transparency");
      }, 100 + offset);

      setTimeout(() => {
        grid.classList.add("animate--grid__fill");
        gridCont.classList.add("animate--grid__rotation");
      }, 200 + offset);

      setTimeout(() => {
        pageMask.classList.add("animate--mask_z-index");
      }, 800 + offset);

      setTimeout(() => {
        header.style.zIndex = 2;
        gridSky.classList.add("animate--grid-sky__fill");
      }, 2000 + offset);

      LocalStorage.set("visited", true);
    } else {
      pageMask.style.zIndex = -100;
      grid.style.fill = "aliceblue";

      setCursor("pointer");

      refHeading.current.animate(
        animations.translatePositionY.animation,
        animTiming(0, 0, 1, "forwards")
      );

      carousel.parentNode.style.clipPath =
        "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    }

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);

    return () => {
      header.classList.remove("landing__header");
      props.handleLastPath(location.pathname);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return (
    <Fragment>
      <div id="mask" />

      <main className="main--landing">
        <Carousel />

        <button
          style={{ cursor: cursor }}
          className="landing__call-to-action"
          onClick={() => navigate("/shop")}
        >
          <h2
            ref={refHeading}
            className={`h2-call-to-action ${animationProps_h2}`}
          >
            {actionText}
          </h2>
        </button>

        <div className="grid-container">
          <div
            className={`grid-container__mask ${visited && "animate--mask__bg"}`}
          />
          <GridPlaneSvg
            className={`grid-container__grid ${
              visited && "animate--grid__rotation animate--grid__fill"
            }`}
          />
        </div>
      </main>
    </Fragment>
  );
};

export default LandingPage;
