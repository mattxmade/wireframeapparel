import React, { Fragment, useEffect, useRef, useState } from "react";

import bag from "../../assets/carousel/wf_bag.webp";
import sign from "../../assets/carousel/wf_sign.webp";
import shop from "../../assets/carousel/wf_shop.webp";
import shoe from "../../assets/carousel/wf_shoe.webp";
import tees from "../../assets/carousel/wf_tees.webp";

import "../../styles/Carousel.style.css";

const images = [sign, shop, bag, shoe, tees];
// x1 === 0
// x2 === 0.5
// x3 === 1
// x4 === 1.5
// x5 === 2 and so on

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

const Carousel = (props) => {
  const [tabs, setTabs] = useState();
  const [carousel, setCarousel] = useState();

  const root = document.querySelector(":root");
  const width = Number(
    getComputedStyle(root).getPropertyValue("--carousel-width").slice(0, -2) // -3 rem -2 px vw vh
  );

  let currentImage = 0;
  let imageCount = images.length - 1;

  let currentPosition = 0;
  const startPosition = imageCount * 0.5;

  const ChevronLeft = Chevron.left;
  const ChevronRight = Chevron.right;

  useEffect(() => {
    setTabs(Array.from(document.querySelectorAll(".image-tab")));
    setCarousel(document.querySelector(".carousel"));
  }, []);

  useEffect(() => {
    if (!carousel) return;

    setTimeout(() => {
      return carousel.parentNode.classList.add("animate--carousel__path");
    }, 1200);
  }, [carousel]);

  useEffect(() => {
    tabs && tabs[0].classList.add("illuminate-tab");
  }, [tabs]);

  const handleLeft = (e) => {
    if (currentImage >= 1) {
      console.log(currentImage);

      carousel.style.transform = `translate(${(currentPosition +=
        width)}vw, 0)`;

      tabs[currentImage].classList.remove("illuminate-tab");
      currentImage--;
      tabs[currentImage].classList.add("illuminate-tab");
    }
  };

  // setTimeout(() => {
  //   setInterval(() => {
  //     if (carousel && currentImage < imageCount) handleRight();
  //   }, 3500);
  // }, 3500);

  const handleRight = (e) => {
    if (currentImage < imageCount) {
      carousel.style.transform = `translate(${(currentPosition -=
        width)}vw, 0)`;

      tabs[currentImage].classList.remove("illuminate-tab");
      currentImage++;

      tabs[currentImage].classList.add("illuminate-tab");
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

          <ul
            className="carousel"
            style={{ left: `${width * startPosition}vw` }}
          >
            {images.map((image, index) => {
              return (
                <li key={index} className="carousel__img">
                  <img src={image} alt="" />
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="carousel__bar header__item--widgets">
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
