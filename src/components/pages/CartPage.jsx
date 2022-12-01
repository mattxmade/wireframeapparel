import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./CartPage.style.scss";
import AwesomeSvg from "../svg-icons/Awesome.module.jsx";
import PaymentSvg from "../svg-icons/Payment.module.jsx";
import capitaliseString from "../../utility/capitaliseString";
import depluraliseString from "../../utility/depluraliseString.js";
import LocalStorage from "../../data/LocalStorage.module.js";

const fixPrice = (price) => Number.parseFloat(price).toFixed(2);

const CartItem = (props) => {
  const { item, variantID, handleCartItem } = props;

  const TrashIcon = AwesomeSvg.TrashIcon;
  const { AngleUpIcon, AngleDownIcon } = AwesomeSvg;

  // TODO: Break up component

  return (
    <div className="cart-item">
      <img
        className="cart-item__thumbnail"
        src={item.image.src}
        alt={item.image.alt}
      />

      <div className="cart-item__overview">
        <ul className="cart-item__heading">
          <li className="cart-item__name">
            {capitaliseString(item.name)} {depluraliseString(item.type)}
          </li>

          {/* <p>{"£" + fixPrice(item.price * item.quantity)}</p> */}
          <li className="cart-item__price">
            {"£" + item.price * item.quantity}
          </li>
        </ul>

        <ul className="cart-item__options">
          <li className="cart-item__attributes">
            <p>{item.size}</p>
            <p>{item.color === "#202020" ? "black" : item.color}</p>
          </li>

          <li className="cart-item__edit">
            <i onClick={() => handleCartItem(variantID, "remove")}>
              <TrashIcon className="cart-icon" />
            </i>

            <div className="cart-item__quantity">
              <i
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleCartItem(variantID, "increment");
                }}
              >
                <AngleUpIcon />
              </i>

              <p>{item.quantity}</p>

              <i
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleCartItem(variantID, "decrement");
                }}
              >
                <AngleDownIcon />
              </i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  itemsInCart: PropTypes.array,
  handleCartItem: PropTypes.func,
};

const CartPage = (props) => {
  const [customerCart, setCustomerCart] = useState(
    LocalStorage.get("cart-items") ?? [...props.itemsInCart]
  );

  const [cartOrderTotal, setCartOrderTotal] = useState(0);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  const location = useLocation();
  useEffect(() => () => props.handleLastPath(location.pathname), []);

  const { GlobeIcon } = AwesomeSvg;
  const { AmazonPayLogo, ApplePayLogo, DigitalPayLogos } = PaymentSvg;
  const { GooglePayLogo, PayPalLogo, VisaLogo } = PaymentSvg;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflowY = "scroll";

    return () => {
      body.style.overflowY = "hidden";
      props.updateCustomerOrder(customerCart);
    };
  }, []);

  const updateItemQuantity = (itemVariantID, action) => {
    const updateCart = [...customerCart];

    const itemToUpdate = customerCart.find(
      (item) => item.variant === itemVariantID
    );

    // for (const [key, value] of Object.entries(itemToUpdate)) {
    //   console.log(`${key}: ${value}`);
    // }

    action === "increment"
      ? (itemToUpdate.quantity += 1)
      : (itemToUpdate.quantity -= 1);

    if (itemToUpdate.quantity !== 0) return setCustomerCart([...updateCart]);

    removeItemFromCart(itemVariantID);
  };

  const removeItemFromCart = (itemByVariantID) => {
    if (customerCart.length === 1) return setCustomerCart([]);

    setCustomerCart((prevCart) =>
      prevCart.map((item) => item.variant !== itemByVariantID && item)
    );
  };

  const handleCartItem = (item, action) => {
    switch (action) {
      case "increment":
        return updateItemQuantity(item, action);
      case "decrement":
        return updateItemQuantity(item, action);
      case "remove":
        return removeItemFromCart(item);
    }
  };

  useEffect(() => {
    let cartTotal = 0;
    let prevTotal = 0;
    let totalNumberOfItems = 0;

    const updatedOrder = [];
    customerCart.forEach((item) => (item ? updatedOrder.push(item) : null));

    updatedOrder.map((item) => {
      totalNumberOfItems += item.quantity;

      cartTotal = prevTotal + item.price * item.quantity;
      prevTotal = cartTotal;
    });

    // cartTotal = fixPrice(cartTotal);
    LocalStorage.set("cart-total", totalNumberOfItems);
    LocalStorage.set("cart-items", updatedOrder);

    setCartOrderTotal(cartTotal);
    setNumberOfItemsInCart(totalNumberOfItems);

    props.handleCartCount(updatedOrder);
  }, [customerCart]);

  return (
    <main className="cart-page">
      <h2 className="cart-page__heading">
        <span>
          {numberOfItemsInCart} {numberOfItemsInCart === 1 ? "item" : "items"}{" "}
          in your cart
        </span>
      </h2>

      <div className="cart-page__content">
        <div className="cart-items">
          {!customerCart.length ? (
            <div
              style={{
                width: "100%",
                gap: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "-webkit-fill-available",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
              }}
            >
              <i
                style={{
                  fill: "darkslategrey",
                  width: "2rem",
                  height: "auto",
                  position: "relative",
                  bottom: "0.15rem",
                }}
              >
                <GlobeIcon />
              </i>
              <h2 style={{ fontSize: "3rem", color: "darkslategrey" }}>
                Your Cart is Empty
              </h2>
            </div>
          ) : null}

          {customerCart.length
            ? customerCart.map((item, index) => {
                return item ? (
                  <CartItem
                    key={item.id + index}
                    item={item}
                    variantID={item.variant}
                    handleCartItem={handleCartItem}
                  />
                ) : null;
              })
            : null}

          {numberOfItemsInCart ? (
            <ul className="cart-total">
              <li className="cart-total__title">Total</li>
              <li className="cart-total__price">{"£" + cartOrderTotal}</li>
            </ul>
          ) : null}
        </div>

        <div className="cart-checkout">
          <h3>Guest checkout</h3>

          <ul className="payment-list">
            {/* component */}
            <li>
              <AmazonPayLogo
                className="pay-logo"
                backgroundClassName={"pay-logo-bg"}
              />
            </li>
            <li>
              <ApplePayLogo
                className="pay-logo"
                backgroundClassName={"pay-logo-bg"}
              />
            </li>
            <li>
              <DigitalPayLogos
                className="pay-logo"
                backgroundClassName={"pay-logo-bg"}
              />
            </li>
            <li>
              <GooglePayLogo
                className="pay-logo"
                backgroundClassName={"pay-logo-bg"}
              />
            </li>
            <li>
              <PayPalLogo
                className="pay-logo"
                backgroundClassName="pay-logo-bg"
              />
            </li>
            <li>
              <VisaLogo
                className="pay-logo"
                backgroundClassName={"pay-logo-bg"}
              />
            </li>
          </ul>

          <button
            className="checkout-button action-button"
            // TODO onClick={() => handleProductOrder(product, quantity)}
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
