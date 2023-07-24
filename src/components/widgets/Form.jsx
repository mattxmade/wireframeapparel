import React, { useState } from "react";

import "../pages/CartPage.style.scss";
import { checkoutPlaceholder } from "../../data/placeholderContent";
import CommerceUtils from "../../utility/CommerceUtils.module";

const CheckoutForm = (() => {
  const { fixPrice } = CommerceUtils;

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

    return (
      <form
        id={props.id}
        action=""
        method="get"
        onSubmit={(e) => e.preventDefault()}
      >
        <ul>
          <li>
            <h3>Details</h3>
            <div className="confirm-input">
              <label htmlFor="first">
                first
                <input
                  required
                  name="first"
                  type="text"
                  value={firstName}
                  placeholder={!firstName && checkoutPlaceholder.first}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label htmlFor="last">
                last
                <input
                  required
                  name="last"
                  type="text"
                  value={lastName}
                  placeholder={!lastName && checkoutPlaceholder.last}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            <div className="confirm-input">
              <label htmlFor="email">
                email
                <input
                  required
                  className="confirm-email"
                  name="email"
                  type="email"
                  value={email}
                  placeholder={!email && checkoutPlaceholder.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="telephone">
                telephone
                <input
                  required
                  className="confirm-telephone"
                  name="telephone"
                  type="telephone"
                  value={telephone}
                  placeholder={!telephone && checkoutPlaceholder.telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </label>
            </div>

            <h3>Shipping Address</h3>
            <div className="confirm-input">
              <label htmlFor="address-1">
                address 1
                <input
                  required
                  name="address-1"
                  type="text"
                  value={address}
                  placeholder={!address && checkoutPlaceholder.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>

              <label htmlFor="address-2">
                address 2
                <input
                  required
                  name="address-2"
                  type="text"
                  value={street}
                  placeholder={!street && checkoutPlaceholder.street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </label>

              <label htmlFor="city">
                city
                <input
                  required
                  name="city"
                  type="text"
                  value={city}
                  placeholder={!city && checkoutPlaceholder.city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>

              <label htmlFor="postcode">
                postcode
                <input
                  required
                  name="postcode"
                  type="text"
                  value={postcode}
                  placeholder={!postcode && checkoutPlaceholder.postcode}
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
                onClick={(e) => {
                  props.handleFormSubmission([
                    firstName,
                    lastName,
                    email,
                    telephone,
                    address,
                    street,
                    city,
                    postcode,
                  ]);
                }}
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

  const PaymentForm = (props) => {
    const [paymentType, setPaymentType] = useState("");

    const handlePaymentType = (e) => {
      if (e.target.value === "Select Payment") return;
    };
    return (
      <ul>
        <li>
          <h3>Payment</h3>

          <div className="confirm-input">
            <label className="checkout-select-payment" htmlFor="type">
              type
              <select
                required
                name="type"
                id="payment-type"
                form="form--checkout"
                onChange={handlePaymentType}
              >
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
  };

  return { CustomerDetailsForm, PaymentForm };
})();

export default CheckoutForm;
