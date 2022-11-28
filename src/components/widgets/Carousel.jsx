import React, { Fragment, useEffect, useRef, useState } from "react";

import bag from "../../assets/carousel/wf_bag.webp";
import sign from "../../assets/carousel/wf_sign.webp";
import shop from "../../assets/carousel/wf_shop.webp";
import shoe from "../../assets/carousel/wf_shoe.webp";
import tees from "../../assets/carousel/wf_tees.webp";

import "./Carousel.style.scss";
// import(/* webpackChunkName: "Carousel.style" */ "./Carousel.style.scss");

const images = [sign, shop, bag, shoe, tees];

const Chevron = (() => {
  const left = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );

  const right = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );

  return { left, right };
})();

const Tab = (props) => {
  return (
    <div className="carousel__bar">
      <ul></ul>
    </div>
  );
};

const getComputedWidth = (cssVariableName) => {
  const root = document.querySelector(":root");
  return Number(
    getComputedStyle(root).getPropertyValue(cssVariableName).slice(0, -2)
  ); // slice -3 rem -2 px vw vh
};

const Carousel = (props) => {
  const tabsRef = useRef();
  const carouselRef = useRef();

  const [width, setWidth] = useState(getComputedWidth("--carousel-width"));

  let currentImage = 0;
  let imageCount = images.length - 1;

  let currentPosition = 0;

  const ChevronLeft = Chevron.left;
  const ChevronRight = Chevron.right;

  const handleViewportChange = (e) =>
    setWidth(getComputedWidth("--carousel-width"));

  useEffect(() => {
    carouselRef.current.style.transform = "translate(0,0)";

    tabsRef.current.childNodes.forEach((tab) =>
      tab.classList.remove("illuminate-tab")
    );

    tabsRef.current.childNodes[0].classList.add("illuminate-tab");

    currentImage = 0;
    currentPosition = 0;
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", handleViewportChange);
    tabsRef.current.childNodes[0].classList.add("illuminate-tab");

    return () => {
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  const handleLeft = (e) => {
    if (currentImage >= 1) {
      carouselRef.current.style.transform = `translate(${(currentPosition +=
        width)}vw, 0)`;

      tabsRef.current.childNodes.forEach((tab) =>
        tab.classList.remove("illuminate-tab")
      );

      currentImage--;
      tabsRef.current.childNodes[currentImage].classList.add("illuminate-tab");
    }
  };

  // setTimeout(() => {
  //   setInterval(() => {
  //     if (carousel && currentImage < imageCount) handleRight();
  //   }, 3500);
  // }, 3500);

  const handleRight = (e) => {
    if (currentImage < imageCount) {
      carouselRef.current.style.transform = `translate(${(currentPosition -=
        width)}vw, 0)`;

      tabsRef.current.childNodes.forEach((tab) =>
        tab.classList.remove("illuminate-tab")
      );

      currentImage++;
      tabsRef.current.childNodes[currentImage].classList.add("illuminate-tab");
    }
  };

  return (
    <Fragment>
      <div
        className="carousel-container"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="carousel-viewer">
          <div className="carousel-border"></div>
          <div className="carousel__navigators">
            <i className="fas fa-chevron-left  chevron" onClick={handleLeft}>
              <ChevronLeft />
            </i>
            <i className="fas fa-chevron-right chevron" onClick={handleRight}>
              <ChevronRight />
            </i>
          </div>

          <ul ref={carouselRef} className="carousel">
            {images.map((image, index) => {
              return (
                <li key={index} className="carousel__img">
                  <img src={image} alt="" />
                </li>
              );
            })}
          </ul>
        </div>

        <ul ref={tabsRef} className="carousel__bar header__item--widgets">
          {[...new Array(images.length)].map((val, index) => (
            <li
              key={index}
              className="image-tab"
              style={{ width: `calc(100vw/${imageCount + 1})` }}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Carousel;
