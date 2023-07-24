import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MaterialSvg from "../svg-icons/Material.module";
import "./CartWidget.style.scss";

const CartWidget = (props) => {
  const { CartIcon } = MaterialSvg;
  const navigate = useNavigate();

  useEffect(() => props.handleCartCount(props.customerOrder), []);

  return (
    <button
      aria-label={`Items in cart: ${props.numberOfItemsInCart}`}
      className="cart-widget-button icon--select"
      onClick={() => navigate("/checkout")}
    >
      <p className="cart-widget__counter">{props.numberOfItemsInCart}</p>
      <CartIcon type="sharp" className="cart-widget__icon icon" />
    </button>
  );
};

export default CartWidget;
