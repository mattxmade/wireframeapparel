import React, { Fragment } from "react";
import PropTypes from "prop-types";

import depluraliseString from "../../utility/depluraliseString.js";

import AwesomeSvg from "../svg-icons/Awesome.module.jsx";
import PaymentSvg from "../svg-icons/Payment.module.jsx";
import "../../styles/Cart.style.css";

function fixPrice(price) {
  const fixedToOne = Number.parseFloat(price).toFixed(1);
  const fixedToTwo = Number.parseFloat(price).toFixed(2);

  const isLastDigit = fixedToTwo.toString().slice(fixedToTwo.length - 1);
  return isLastDigit === "0" ? fixedToOne : fixedToTwo;
}

const CartItem = (props) => {
  const TrashSvg = AwesomeSvg.Trash;
  const { item, index, handleCartItem } = props;

  return (
    <Fragment>
      {/* <p>Item details: thumbnail, name, price, quantity, total</p> */}
      <ul className="cart-items">
        <li>
          <img src={item.image.src} alt={item.image.alt} />
          <p>
            {item.name} {depluraliseString(item.type.kind)}
          </p>
        </li>
        <li onClick={() => handleCartItem(index, "remove")}>
          <TrashSvg className="cart-icon" />
          <p>{item.quantity}</p>
          <p>{"£" + fixPrice(item.price * item.quantity)}</p>
        </li>
      </ul>
    </Fragment>
  );
};

const Cart = ({ itemsInCart, handleCartItem }) => {
  let priceTotal = 0;
  let totalNumberOfItems = 0;

  itemsInCart.map((item) => (totalNumberOfItems += item.quantity));

  const { AmazonPayLogo, ApplePayLogo, DigitalPayLogos } = PaymentSvg;
  const { GooglePayLogo, PayPalLogo, VisaLogo } = PaymentSvg;

  return (
    <main className="cart">
      <h2 className="cart__heading">
        {/* Your cart: */}
        <span>
          {totalNumberOfItems} {totalNumberOfItems === 1 ? "item" : "items"} in
          your cart
        </span>
      </h2>

      <div className="cart__staging">
        <div className="cart__staging--details">
          {/* TODO: render placeholder if no items in cart */}

          {itemsInCart.length
            ? itemsInCart.map((item, index) => {
                fixPrice((priceTotal += item.price * item.quantity));
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    index={index}
                    handleCartItem={handleCartItem}
                  />
                );
              })
            : ""}

          {priceTotal ? (
            <ul className="cart-total">
              <li>Total</li>
              <li>{"£" + priceTotal}</li>
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="cart__staging--place-order">
          <h3>Guest checkout</h3>

          <ul className="payment-list">
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
            //onClick={() => handleProductOrder(product, quantity)}
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;

CartItem.propTypes = {
  itemsInCart: PropTypes.array,
  handleCartItem: PropTypes.func,
};
