import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./ResultCard.style.scss";

const enhanceImage = (e) => {
  e.target.parentNode.nextSibling.style.width = "256px";
};

const resetImage = (e) => {
  e.target.parentNode.nextSibling.style.width = "100%";
};

const ResultCard = ({ item, type, handleProductSelection }) => {
  const ref = useRef();
  const maskRef = useRef();
  const productRef = useRef();

  useEffect(() => {
    // maskRef.current.addEventListener("mouseover", enhanceImage);
    // maskRef.current.addEventListener("mouseleave", resetImage);
    // cleanup remove ??

    maskRef.current.classList.add("reveal-item");
    setTimeout(() => maskRef.current.remove(), 300);
    productRef.current.classList.add("clip-container-path");
  }, []);

  return (
    <div ref={productRef} className="product-result">
      <Link ref={ref} to={`/shop/${item.id}`}>
        <span className="sr-only">{`${item.name} ${item.type.kind}`}</span>
        <div
          ref={maskRef}
          className="product-mask"
          onClick={() => {
            const selectedItem = item;
            handleProductSelection(selectedItem);
          }}
          onKeyDown={(e) => {
            if (
              e.code === "Space " ||
              e.code === "Enter" ||
              e.code === "Return"
            ) {
              const selectedItem = item;
              handleProductSelection(selectedItem);
            }
          }}
        />
      </Link>

      <img src={item.image.src} alt={item.image.alt} />

      <div className="product-result__content">
        <h4 className="product-name">{`${item.name} ${item.type.kind}`}</h4>
        <p className="product-price">{"£" + item.price}</p>
      </div>
    </div>
  );
};

export default ResultCard;

ResultCard.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
  handleProductSelection: PropTypes.func,
};
