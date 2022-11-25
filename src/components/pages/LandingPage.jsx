import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Carousel from "../widgets/Carousel";
import GridPlaneSvg from "../svg-images/GridPlaneSvg";
import LocalStorage from "../../data/LocalStorage.module";
import AssetsFromDirectory from "../../assets/AssetsFromDirectory";

import "../../styles/Landing.style.css";

const LandingPage = (props) => {
  const location = useLocation();
  const visited = LocalStorage.get("visited") ?? false;

  const tshirts = AssetsFromDirectory("tshirts");
  const skateboards = AssetsFromDirectory("skateboards");

  const imageTree = [];
  const resources = [tshirts, skateboards];
  resources.map((resource) =>
    resource.map((item) => {
      if (item.name === "wireframe_wf_ts_bwc_fmbn_y.png") return;
      imageTree.push(item);
    })
  );

  useEffect(() => {
    const header = document.querySelector("header");

    if (!visited) {
      const pageMask = document.querySelector("#mask");
      const gridCont = document.querySelector(".grid-container__grid");

      const grid = document.querySelector("#svg-line-grid");
      const gridSky = document.querySelector("#svg-rect-sky");
      const gridPln = document.querySelector("#svg-grid-plane");

      // const content = document.querySelector(".reveal");
      // timer(content.style.zIndex = 3, 300)

      let offset = 200;

      setTimeout(() => {
        pageMask.classList.add("animate--mask__transparency");
      }, 100 + offset);

      setTimeout(() => {
        grid.classList.add("animate--grid__fill");
        gridCont.classList.add("animate--grid__rotation");
      }, 400 + offset);

      setTimeout(() => {
        pageMask.classList.add("animate--mask_z-index");
      }, 800 + offset);

      setTimeout(() => {
        header.style.zIndex = 2;
        gridSky.classList.add("animate--grid-sky__fill");
      }, 2000 + offset);

      LocalStorage.set("visited", false);
    }

    return () => {
      header.classList.remove("landing__header");
      props.handleLastPath(location.pathname);
    };
  }, []);

  return (
    <Fragment>
      <div id="mask" />

      <main className="main--landing">
        <Carousel />

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

        <ul
          style={{
            zIndex: 900,
            position: "absolute",
            bottom: "2.5rem",
            display: "flex",
            width: "100%",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          {imageTree &&
            imageTree.map((image, index) => (
              <li
                key={index}
                style={{
                  gap: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    width: `calc(100vw/${imageTree.length} * 5)`,
                  }}
                  src={image.uri}
                  alt={image.name}
                />

                <div
                  className="image-shadow"
                  style={{
                    borderRadius: "100%",
                    width: `calc(100vw/${imageTree.length} * 5 / 2)`,
                    height: "1rem",
                    opacity: 0.6,
                    background: "darkslategrey",
                  }}
                />
              </li>
            ))}
        </ul>
      </main>
    </Fragment>
  );
};

export default LandingPage;
