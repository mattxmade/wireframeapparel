import React, { Fragment, useEffect, useRef, useState } from "react";

import bag from "../../assets/carousel/wf_bag.webp";
import sign from "../../assets/carousel/wf_sign.webp";
import shop from "../../assets/carousel/wf_shop.webp";
import shoe from "../../assets/carousel/wf_shoe.webp";
import tees from "../../assets/carousel/wf_tees.webp";

import AwesomeSvg from "../svg-icons/Awesome.module";
import "./Carousel.style.scss";
// import(/* webpackChunkName: "Carousel.style" */ "./Carousel.style.scss");

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

// const getComputedWidth = (cssVariableName) => {
//   const root = document.querySelector(":root");

//   return window.innerWidth > 2375
//     ? 1920
//     : Number(
//         getComputedStyle(root).getPropertyValue(cssVariableName).slice(0, -2)
//       ); // slice -3 rem -2 px vw vh
// };

const getComputedWidth = (cssVariableName) => {
  const root = document.querySelector(":root");

  return Number(
    getComputedStyle(root).getPropertyValue(cssVariableName).slice(0, -2)
  ); // slice -3 rem -2 px vw vh
};

const isLargeViewport = () => (window.innerWidth > 608 ? true : false);

const handleUnits = () => {
  const width = window.innerWidth;

  if (width > 608 && width >= 2375) return "px"; // 1920
  if (width > 608) return "vw";

  return "vh";
};

const handleWidth = () => {
  const width = window.innerWidth;

  if (width > 608 && width > 2375) return 1920;
  if (width > 608) return 100;

  return 100;
};

const Carousel = (props) => {
  const tabsRef = useRef();
  const carouselRef = useRef();

  const autoplayRef = useRef();
  const [autoplay, setAutoplay] = useState(true);

  //const [unit, setUnit] = useState(handleUnits());
  const [unit, setUnit] = useState(isLargeViewport() ? "vw" : "vh");
  const [width, setWidth] = useState(getComputedWidth("--carousel-width"));

  const images = [sign, shop, bag, shoe, tees];

  let currentImage = 0;
  let currentPosition = 0;
  let imageCount = images.length - 1;

  const ChevronLeft = Chevron.left;
  const ChevronRight = Chevron.right;
  const { PlayIcon, PauseIcon } = AwesomeSvg;

  const handleViewportChange = (e) => {
    //setUnit(handleUnits());
    setUnit(isLargeViewport() ? "vw" : "vh");
    setWidth(getComputedWidth("--carousel-width"));
  };

  const resetSlides = () => {
    carouselRef.current.style.transform = "translate(0,0)";

    tabsRef.current.childNodes.forEach((tab) =>
      tab.classList.remove("illuminate-tab")
    );

    tabsRef.current.childNodes[0].classList.add("illuminate-tab");

    currentImage = 0;
    currentPosition = 0;
  };

  const autoplaySlides = (playState) => {
    if (playState && carouselRef.current && currentImage < imageCount)
      moveToNextSlide();

    if (currentImage === 4) {
      const resetTimeout = setTimeout(() => {
        resetSlides();
        clearTimeout(resetTimeout);
      }, 7000);
    }
  };

  const moveToPrevSlide = (e) => {
    if (currentImage >= 1) {
      carouselRef.current.style.transform = `translate(${(currentPosition +=
        width)}${unit}, 0)`;

      tabsRef.current.childNodes.forEach((tab) =>
        tab.classList.remove("illuminate-tab")
      );

      currentImage--;
      tabsRef.current.childNodes[currentImage].classList.add("illuminate-tab");
    }
  };

  const moveToNextSlide = (e) => {
    if (currentImage < imageCount) {
      carouselRef.current.style.transform = `translate(${(currentPosition -=
        width)}${unit}, 0)`;

      tabsRef.current.childNodes.forEach((tab) =>
        tab.classList.remove("illuminate-tab")
      );

      currentImage++;
      tabsRef.current.childNodes[currentImage].classList.add("illuminate-tab");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleViewportChange);
    tabsRef.current.childNodes[0].classList.add("illuminate-tab");

    const autoplayInterval = setTimeout(() => {
      setInterval(() => autoplaySlides(autoplayRef.current), 7000);
    }, 5000);

    return () => {
      clearInterval(autoplayInterval);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    autoplayRef.current = autoplay;
  }, [autoplay]);

  useEffect(() => resetSlides(), [width]);

  const mediaIconStyle = {
    fill: "white",
    width: "2rem",
    height: "2rem",
    cursor: "pointer",
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
            <i
              className="fas fa-chevron-left  chevron"
              onClick={moveToPrevSlide}
            >
              <ChevronLeft />
            </i>
            <i
              className="fas fa-chevron-right chevron"
              onClick={moveToNextSlide}
            >
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

          <ul ref={tabsRef} className="carousel__bar">
            {[...new Array(images.length)].map((val, index) => (
              <li
                key={index}
                className="image-tab"
                style={{ width: `calc(100${unit}/${imageCount + 1})` }}
              />
            ))}
          </ul>

          <div className="autoplay-controls">
            {!autoplay ? (
              <i style={mediaIconStyle} onClick={() => setAutoplay(true)}>
                <PlayIcon />
              </i>
            ) : (
              <i style={mediaIconStyle} onClick={() => setAutoplay(false)}>
                <PauseIcon />
              </i>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Carousel;
