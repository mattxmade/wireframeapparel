import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import hexToColorName from "../../utility/hexToColorName";
import ProductViewer from "../r3f/ProductViewer";
import "./ProductPage.style.scss";

const ProductPage = (props) => {
  const location = useLocation();
  const { product, handleProductToCart } = props;

  const [quantity, setQuantity] = useState(1);
  const [itemColor, setItemColor] = useState(product.color.initial);

  const sizeHeadingRef = useRef();
  const [sizeSelect, setSizeSelect] = useState(
    product.sizing.length > 1 ? "select from below" : product.sizing.size
  );

  const handleQuantity = (action) => {
    action === "+"
      ? setQuantity((prevQuantity) => prevQuantity + 1)
      : setQuantity((prevQuantity) => {
          return prevQuantity === 1 ? prevQuantity : prevQuantity - 1;
        });
  };

  const handleItemColor = (color) => {
    if (color === itemColor) return;

    const colorChoice = color === "#202020" ? "Black" : color;
    product.color.choice = colorChoice;
    setItemColor(color);
  };

  const handleSizeSelect = (size) => {
    if (size === sizeSelect) return;
    setSizeSelect(size);
  };

  const handleNoSizeSelected = () => {
    sizeHeadingRef.current.style.color = "red";
    setSizeSelect("Please select a size!");
  };

  useEffect(() => {
    return () => {
      props.handleLastPath(location.pathname);
    };
  }, []);

  return (
    <Fragment>
      <main className="product-page">
        {/* <ul className="product-images">
          <li style={{ backgroundColor: product.color.initial }}>
            <img src={product.image.design} />
          </li>
          <li>
            <img src={product.image.src} />
          </li>
          <li>3D view</li>
        </ul> */}

        <ProductViewer product={product} itemColor={itemColor} />

        <div className="product-details">
          <h2 className="product-name">
            {product.name} {product.type.kind}
            <p>{` by ${product.brand}`}</p>
          </h2>

          <p
            style={{
              padding: "0.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "#efdddd",
            }}
            className="product-price"
          >
            {"£" + product.price}
          </p>

          {/* <p>{product.type.kind}</p> */}

          <div className="product-color">
            <h3 id="color-select" style={{ marginBottom: "0.5rem" }}>
              // color:{" "}
              {itemColor === "Transparent" ? "N/A" : hexToColorName(itemColor)}
            </h3>
            <ul
              style={{
                width: "fit-content",
                height: "max-content",
                display: "flex",
                flexWrap: "wrap",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "#efdddd",
              }}
            >
              {product.color.options.map((col, index) => (
                <li
                  tabIndex={itemColor !== "Transparent" ? 0 : 1}
                  aria-labelledby="color-select"
                  key={index}
                  style={{
                    margin: "0.5rem",
                    backgroundColor: col,
                    cursor: "pointer",
                    boxShadow: "0 0 0.2rem 0.1rem black",
                  }}
                  onClick={() => handleItemColor(col)}
                >
                  {/* <button
                    
                    
                  /> */}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-sizing">
            <h3 ref={sizeHeadingRef} style={{ marginBottom: "0.5rem" }}>
              // size: {sizeSelect}
            </h3>
            <ul
              className="product-sizing__list"
              style={{
                width: "fit-content",
                height: "max-content",
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "#efdddd",
              }}
            >
              {product.sizing.chart.map((size, index) => (
                <li
                  tabIndex={0}
                  className="size"
                  key={index}
                  style={{
                    cursor: "pointer",
                    width: "4rem",
                    height: "auto",
                    margin: "0.5rem",
                    textAlign: "center",
                    backgroundColor: "aliceblue",
                    boxShadow: "0 0 0.2rem 0.1rem black",
                  }}
                  onClick={(e) => {
                    sizeHeadingRef.current.style.color = "black";

                    e.target.parentNode.childNodes.forEach((node) => {
                      node.style.color = "black";
                      node.style.backgroundColor = "aliceblue";
                    });

                    e.target.style.color = "white";
                    e.target.style.backgroundColor = "black";
                    handleSizeSelect(size);
                  }}
                >
                  <span className="sr-only">{`Select size: ${size}`}</span>
                  {size}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-options">
            <div className="quantity-options">
              <button
                aria-label="decrease product quantity by 1"
                className="button--highlight"
                onClick={(e) => handleQuantity(e.target.textContent)}
              >
                <div className="box-mask"></div>-
              </button>
              <h3 aria-label="product quantity">{quantity}</h3>
              <button
                aria-label="increase product quantity by 1"
                className="button--highlight"
                onClick={(e) => handleQuantity(e.target.textContent)}
              >
                +
              </button>
            </div>
            <button
              className="add-to-cart"
              onClick={() => {
                if (sizeSelect === "unset") return handleNoSizeSelected();

                const newCartItem = {
                  id: product.id,
                  size: sizeSelect,
                  name: product.name,
                  brand: product.brand,
                  image: product.image,
                  price: product.price,
                  type: product.type.kind,
                  color: product.color.choice,
                  variant:
                    product.id.toString() +
                    sizeSelect.toString() +
                    product.color.choice.toString(),
                };

                handleProductToCart(newCartItem, quantity);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ProductPage;
