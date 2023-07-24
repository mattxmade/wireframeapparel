import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import LocalStorage from "../../data/LocalStorage.module.js";

import "./CartPage.style.scss";
import Modal from "../core/Modal";
import CartItem from "./CartItem.jsx";
import AwesomeSvg from "../svg-icons/Awesome.module.jsx";
import CheckoutForm from "../widgets/Form";
import AcceptedPaymentTypes from "../widgets/PaymentList.jsx";

const { CustomerDetailsForm, PaymentForm } = CheckoutForm;

const { GlobeIcon } = AwesomeSvg;

const paymentOptions = [
  "PayPal",
  "Apple Pay",
  "Amazon Pay",
  "Google Pay",
  "Debit Card",
  "Credit Card",
];

const CartPage = (props) => {
  const cartItemRef = useRef();

  const formRefA = useRef();
  const formRefB = useRef();
  const formBtnRef = useRef();

  const checkoutModalRef = useRef();
  const formSubmissionRef = useRef([]);

  const [customerCart, setCustomerCart] = useState(
    LocalStorage.get("cart-items") ?? [...props.itemsInCart]
  );

  const [cartOrderTotal, setCartOrderTotal] = useState(0);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  const location = useLocation();
  useEffect(() => () => props.handleLastPath(location.pathname), []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflowY = "scroll";

    checkoutModalRef.current = document.querySelector(".modal--checkout");

    return () => {
      body.style.overflowY = "hidden";
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

    if (itemToUpdate.quantity !== 0) return [...updateCart];

    return removeItemFromCart(itemVariantID);
  };

  const removeItemFromCart = (itemByVariantID) => {
    if (customerCart.length === 1) return [];
    return customerCart.map((item) => item.variant !== itemByVariantID && item);
  };

  const handleCartItem = (item, action) => {
    let updateCartItems = [];

    switch (action) {
      case "increment":
        updateCartItems = updateItemQuantity(item, action);
        break;
      case "decrement":
        updateCartItems = updateItemQuantity(item, action);
        break;
      case "remove":
        updateCartItems = removeItemFromCart(item);
        break;
    }

    setCustomerCart(updateCartItems);
    LocalStorage.set("cart-items", updateCartItems);

    props.handleCartCount(updateCartItems);
    props.updateCustomerOrder(updateCartItems);
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

    setCartOrderTotal(cartTotal);
    setNumberOfItemsInCart(totalNumberOfItems);
  }, [customerCart]);

  const handleFormSubmission = (formInputsArray) => {
    if (numberOfItemsInCart === 0) return;

    formSubmissionRef.current = [];
    formSubmissionRef.current = [...formInputsArray].filter(
      (userInfo) => userInfo === ""
    );

    return formSubmissionRef.current.length
      ? [formRefA, formRefB].forEach((ref) =>
          ref.current.classList.add("animate--checkout-form__translate-x")
        )
      : checkoutModalRef.current.showModal();
  };

  const handleElementVisibility = () => {
    let cartItems = cartItemRef.current ? true : false;
    [formRefA, formRefB].map((ref) => {
      if (cartItems) cartItemRef.current.style.visibility = "visible";

      formBtnRef.current.setAttribute("aria-expanded", false);

      if (ref.current.classList.contains("animate--checkout-form__translate-x"))
        return ref.current.classList.remove(
          "animate--checkout-form__translate-x"
        );

      ref.current.classList.add("animate--checkout-form__translate-x");

      formBtnRef.current.setAttribute("aria-expanded", true);
      const input = document.querySelector("input[name=first]");

      setTimeout(() => input.focus(), 800);

      if (cartItems)
        setTimeout(
          () => (cartItemRef.current.style.visibility = "hidden"),
          600
        );
    });
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
        <button
          ref={formBtnRef}
          className="form-visibility-btn"
          aria-controls="form--checkout"
          onClick={handleElementVisibility}
        >
          <i style={{ width: "2rem", height: "2rem" }}>
            <GlobeIcon />
          </i>
          <h3>Checkout Form</h3>
        </button>
      </div>

      <div className="cart-page__content">
        <div className="cart-items">
          <div ref={formRefA} className="confirm-order--details">
            <CustomerDetailsForm
              id="form--checkout"
              cartOrderTotal={cartOrderTotal}
              numberOfItemsInCart={numberOfItemsInCart}
              handleFormSubmission={handleFormSubmission}
            />
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
                  <div
                    ref={cartItemRef}
                    key={item.id + index}
                    className="cart-item"
                  >
                    <CartItem
                      item={item}
                      variantID={item.variant}
                      handleCartItem={handleCartItem}
                    />
                  </div>
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
            <PaymentForm paymentOptions={paymentOptions} />
          </div>

          <h3>Guest checkout</h3>

          <AcceptedPaymentTypes />

          <button
            form="form--checkout"
            className="checkout-button action-button"
            onClick={(e) => {
              e.preventDefault();
              formSubmissionRef.current.length
                ? handleFormSubmission(formSubmissionRef.current)
                : handleElementVisibility();
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
