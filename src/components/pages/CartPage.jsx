import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import AwesomeSvg from "../svg-icons/Awesome.module.jsx";
import PaymentSvg from "../svg-icons/Payment.module.jsx";
import GridTunnelSvg from "../svg-images/GridTunnelSvg.jsx";
import depluraliseString from "../../utility/depluraliseString.js";

import "./CartPage.style.scss";

const fixPrice = (price) => Number.parseFloat(price).toFixed(2);

const CartItem = (props) => {
  const { item, variantID, handleCartItem } = props;

  const TrashIcon = AwesomeSvg.TrashIcon;
  const { AngleUpIcon, AngleDownIcon } = AwesomeSvg;

  return (
    <Fragment>
      <ul className="cart-items">
        <li>
          <img src={item.image.src} alt={item.image.alt} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>
              {item.name} {depluraliseString(item.type)}
            </p>
            <p>{item.size}</p>
            <p>{item.color}</p>
          </div>
        </li>
        <li>
          <div onClick={() => handleCartItem(variantID, "remove")}>
            <TrashIcon className="cart-icon" />
          </div>

          <div className="cart-item-quantity-container">
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

          <p>{"£" + fixPrice(item.price * item.quantity)}</p>
        </li>
      </ul>
    </Fragment>
  );
};

CartItem.propTypes = {
  itemsInCart: PropTypes.array,
  handleCartItem: PropTypes.func,
};

const CartPage = (props) => {
  const [customerCart, setCustomerCart] = useState([...props.itemsInCart]);

  const [cartOrderTotal, setCartOrderTotal] = useState(0);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  const location = useLocation();
  useEffect(() => () => props.handleLastPath(location.pathname), []);

  let cartTotal = 0;
  let prevTotal = 0;
  let totalNumberOfItems = 0;

  const { AmazonPayLogo, ApplePayLogo, DigitalPayLogos } = PaymentSvg;
  const { GooglePayLogo, PayPalLogo, VisaLogo } = PaymentSvg;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflowY = "scroll";

    return () => {
      body.style.overflowY = "hidden";
    };
  }, []);

  const updateItemQuantity = (itemIndexToUpdate, action) => {
    let updateCart = customerCart.map((item) => item);
    const itemToUpdate = updateCart[itemIndexToUpdate];

    action === "increment"
      ? (itemToUpdate.quantity += 1)
      : (itemToUpdate.quantity -= 1);

    if (itemToUpdate.quantity !== 0) return setCustomerCart(updateCart);

    updateCart.splice(itemIndexToUpdate, 1);
    if (updateCart.length === 0) updateCart = [];

    setCustomerCart(updateCart);
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
    const updatedOrder = [];
    customerCart.forEach((item) => (item ? updatedOrder.push(item) : null));

    updatedOrder.map((item) => {
      totalNumberOfItems += item.quantity;

      cartTotal = prevTotal + item.price * item.quantity;
      prevTotal = cartTotal;
    });

    cartTotal = fixPrice(cartTotal);

    setCartOrderTotal(cartTotal);
    setNumberOfItemsInCart(totalNumberOfItems);

    props.handleCartCount(updatedOrder);

    return () => props.updateCustomerOrder(updatedOrder);
  }, [customerCart]);

  return (
    <main className="cart">
      <h2 className="cart__heading">
        <span>
          {numberOfItemsInCart} {numberOfItemsInCart === 1 ? "item" : "items"}{" "}
          in your cart
        </span>
      </h2>

      <div className="cart__staging">
        <div className="cart__staging--details">
          {/* TODO: render placeholder if no items in cart */}

          {/* {!itemsInCart.length ? (
            <div
              style={{
                width: "100%",
                height: "-webkit-fill-available",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
              }}
            >
              <GridTunnelSvg height="100vh" fill={"darkcyan"} />
            </div>
          ) : null} */}

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
              <li>Total</li>
              <li>{"£" + cartOrderTotal}</li>
            </ul>
          ) : null}
        </div>

        <div className="cart__staging--place-order">
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
