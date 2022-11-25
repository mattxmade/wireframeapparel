import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import AwesomeSvg from "../svg-icons/Awesome.module.jsx";
import PaymentSvg from "../svg-icons/Payment.module.jsx";
import GridTunnelSvg from "../svg-images/GridTunnelSvg.jsx";
import depluraliseString from "../../utility/depluraliseString.js";

import "../../styles/Cart.style.css";

function fixPrice(price) {
  const fixedToOne = Number.parseFloat(price).toFixed(1);
  const fixedToTwo = Number.parseFloat(price).toFixed(2);

  const isLastDigit = fixedToTwo.toString().slice(fixedToTwo.length - 1);
  return isLastDigit === "0" ? fixedToOne : fixedToTwo;
}

const CartItem = (props) => {
  const { AngleUpIcon, AngleDownIcon } = AwesomeSvg;
  const TrashIcon = AwesomeSvg.TrashIcon;
  const { item, index, handleCartItem } = props;

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
          <div onClick={() => handleCartItem(index, "remove")}>
            <TrashIcon className="cart-icon" />
          </div>

          <div className="cart-item-quantity-container">
            <i
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                handleCartItem(index, "increment");
              }}
            >
              <AngleUpIcon />
            </i>
            <p>{item.quantity}</p>
            <i
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                handleCartItem(index, "decrement");
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
  const { itemsInCart, handleCartItem } = props;

  const location = useLocation();
  useEffect(() => () => props.handleLastPath(location.pathname), []);

  let priceTotal = 0;
  let totalNumberOfItems = 0;

  itemsInCart.map((item) => (totalNumberOfItems += item.quantity));

  const { AmazonPayLogo, ApplePayLogo, DigitalPayLogos } = PaymentSvg;
  const { GooglePayLogo, PayPalLogo, VisaLogo } = PaymentSvg;

  return (
    <main className="cart">
      <h2 className="cart__heading">
        <span>
          {totalNumberOfItems} {totalNumberOfItems === 1 ? "item" : "items"} in
          your cart
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

          {itemsInCart.length
            ? itemsInCart.map((item, index) => {
                priceTotal = fixPrice(item.price * item.quantity);

                return (
                  <CartItem
                    key={item.id + index}
                    item={item}
                    index={index}
                    handleCartItem={handleCartItem}
                  />
                );
              })
            : null}

          {priceTotal ? (
            <ul className="cart-total">
              <li>Total</li>
              <li>{"£" + priceTotal}</li>
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
