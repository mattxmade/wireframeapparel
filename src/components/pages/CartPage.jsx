import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./CartPage.style.scss";
import Modal from "../core/Modal";
import Dropdown from "../widgets/Dropdown";
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
            <p>
              {capitaliseString(
                item.color === "#202020" ? "Black" : item.color
              )}
            </p>
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
  const formRefA = useRef();
  const formRefB = useRef();

  const submitBtnA = useRef();
  const submitBtnB = useRef();

  const checkoutModalRef = useRef();
  const formSubmissionRef = useRef();

  // form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const [customerCart, setCustomerCart] = useState(
    LocalStorage.get("cart-items") ?? [...props.itemsInCart]
  );

  const [cartOrderTotal, setCartOrderTotal] = useState(0);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  const location = useLocation();
  useEffect(() => () => props.handleLastPath(location.pathname), []);

  const { GlobeIcon, GemIcon } = AwesomeSvg;
  const { AmazonPayLogo, ApplePayLogo, DigitalPayLogos } = PaymentSvg;
  const { GooglePayLogo, PayPalLogo, VisaLogo } = PaymentSvg;

  const paymentOptions = [
    "Select Payment",
    "PayPal",
    "Apple Pay",
    "Amazon Pay",
    "Google Pay",
    "Debit Card",
    "Credit Card",
  ];

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflowY = "scroll";

    checkoutModalRef.current = document.querySelector(".modal--checkout");

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

  const handleFormSubmission = () => {
    if (numberOfItemsInCart === 0) return;

    formSubmissionRef.current = [];

    formSubmissionRef.current = [
      firstName,
      lastName,
      email,
      telephone,
      address,
      street,
      city,
      postcode,
    ].filter((userInfo) => userInfo === "");

    return formSubmissionRef.current.length
      ? [formRefA, formRefB].forEach((ref) =>
          ref.current.classList.add("animate--checkout-form__translate-x")
        )
      : checkoutModalRef.current.showModal();
  };

  return (
    <main className="cart-page">
      <div className="cart-page__navbar">
        <h2 className="cart-page__heading">
          <span>
            {numberOfItemsInCart}{" "}
            {numberOfItemsInCart === 1 ? "item " : "items "}
            in your cart
          </span>
        </h2>
        <div
          className="call-confirmation-view"
          onClick={() => {
            [formRefA, formRefB].map((ref) => {
              if (
                ref.current.classList.contains(
                  "animate--checkout-form__translate-x"
                )
              )
                return ref.current.classList.remove(
                  "animate--checkout-form__translate-x"
                );
              ref.current.classList.add("animate--checkout-form__translate-x");
            });
          }}
        >
          <i style={{ width: "2rem", height: "2rem" }}>
            <GlobeIcon />
          </i>
          <h3>Order details</h3>
        </div>
      </div>

      <div className="cart-page__content">
        <div className="cart-items">
          <div ref={formRefA} className="confirm-order--details">
            <form
              id="form--checkout"
              action=""
              method="get"
              onSubmit={(e) => {
                e.preventDefault();
                checkoutModalRef.current.showModal();
              }}
            >
              <ul>
                <li>
                  <h3>Details</h3>
                  <div className="confirm-input">
                    <label htmlFor="first">
                      first
                      <input
                        name="first"
                        type="text"
                        required
                        placeholder="first name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                    <label htmlFor="last">
                      last
                      <input
                        name="last"
                        type="text"
                        required
                        placeholder="last name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="confirm-input">
                    <label htmlFor="email">
                      email
                      <input
                        className="confirm-email"
                        name="email"
                        type="email"
                        required
                        placeholder="holmes@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <label htmlFor="telephone">
                      telephone
                      <input
                        className="confirm-telephone"
                        name="telephone"
                        type="telephone"
                        required
                        placeholder="Contact number"
                        onChange={(e) => setTelephone(e.target.value)}
                      />
                    </label>
                  </div>

                  <h3>Shipping Address</h3>
                  <div className="confirm-input">
                    <label htmlFor="address-1">
                      address 1
                      <input
                        name="address-1"
                        type="text"
                        required
                        placeholder="221B"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </label>

                    <label htmlFor="address-2">
                      address 2
                      <input
                        name="address-2"
                        type="text"
                        required
                        placeholder="Baker Street"
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </label>
                    <label htmlFor="city">
                      city
                      <input
                        name="address-2"
                        type="text"
                        required
                        placeholder="London"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </label>
                    <label htmlFor="postcode">
                      postcode
                      <input
                        name="address-2"
                        type="text"
                        required
                        placeholder="NW1 6XE"
                        onChange={(e) => setPostcode(e.target.value)}
                      />
                    </label>
                  </div>
                </li>

                <li>
                  <h3>{`Order Total: £${fixPrice(cartOrderTotal + 3.5)}`}</h3>
                  <p>{`Items: ${numberOfItemsInCart}`}</p>
                  <p>Delivery: £3.50</p>
                  <div className="confirm-input">
                    <button
                      ref={submitBtnA}
                      type="submit"
                      className="checkout-button action-button"
                      onClick={handleFormSubmission}
                    >
                      Confirm & Pay
                      {numberOfItemsInCart === 0 ? (
                        <div className="button--inactive" />
                      ) : null}
                    </button>
                  </div>
                </li>
              </ul>
            </form>
          </div>

          {!customerCart.length ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                gap: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
              }}
            >
              <i
                style={{
                  cursor: "auto",
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
          <div ref={formRefB} className="confirm-order--options">
            <ul>
              <li>
                <h3>Payment</h3>
                <div className="confirm-input">
                  <label className="checkout-select-payment" htmlFor="type">
                    type
                    <select
                      name="type"
                      id="payment-type"
                      placeholder="payment method"
                    >
                      {paymentOptions.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="promo">
                    promocode <input name="promo" type="text" />
                  </label>
                </div>
              </li>
              <li>
                <h3>Delivery Charge: £3.50</h3>
              </li>
            </ul>
          </div>

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
            ref={submitBtnB}
            form="form--checkout"
            className="checkout-button action-button"
            onClick={(e) => {
              e.preventDefault();
              handleFormSubmission();
            }}
          >
            Checkout
            {numberOfItemsInCart === 0 ? (
              <div className="button--inactive" />
            ) : null}
          </button>
        </div>
      </div>

      <Modal
        className="modal--checkout"
        logo={<GlobeIcon />}
        title="Order successfull!"
        heading="Thank you for shopping with Wireframe Apparel."
      />
    </main>
  );
};

export default CartPage;
