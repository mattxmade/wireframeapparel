import React, { useRef, useState, useEffect } from "react";

import "../pages/CartPage.style.scss";
import CommerceUtils from "../../utility/CommerceUtils.module";

const CheckoutForm = (() => {
  const CustomerDetailsForm = (props) => {
    // form inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");

    const { fixPrice } = CommerceUtils;

    return (
      <form
        id="form--checkout"
        action=""
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          //checkoutModalRef.current.showModal();
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
            <h3>{`Order Total: £${fixPrice(props.cartOrderTotal + 3.5)}`}</h3>
            <p>{`Items: ${props.numberOfItemsInCart}`}</p>
            <p>Delivery: £3.50</p>
            <div className="confirm-input">
              <button
                type="submit"
                className="checkout-button action-button"
                onClick={() =>
                  props.handleFormSubmission([
                    firstName,
                    lastName,
                    email,
                    telephone,
                    address,
                    street,
                    city,
                    postcode,
                  ])
                }
              >
                Confirm & Pay
                {props.numberOfItemsInCart === 0 ? (
                  <div className="button--inactive" />
                ) : null}
              </button>
            </div>
          </li>
        </ul>
      </form>
    );
  };

  const PaymentForm = (props) => (
    <ul>
      <li>
        <h3>Payment</h3>
        <div className="confirm-input">
          <label className="checkout-select-payment" htmlFor="type">
            type
            <select name="type" id="payment-type" placeholder="payment method">
              {props.paymentOptions.map((option, index) => (
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
  );

  return { CustomerDetailsForm, PaymentForm };
})();

export default CheckoutForm;
