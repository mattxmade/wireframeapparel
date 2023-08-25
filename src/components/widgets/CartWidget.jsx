import React from "react";
import { useNavigate } from "react-router-dom";

import MaterialSvg from "../svg-icons/Material.module";
import "./CartWidget.style.scss";

const CartWidget = (props) => {
  const { CartIcon } = MaterialSvg;
  const navigate = useNavigate();

  return (
    <button
      aria-label={`Items in cart: ${props.itemCount}`}
      className="cart-widget-button icon--select"
      onClick={() => navigate("/checkout")}
    >
      <p className="cart-widget__counter">{props.itemCount}</p>
      <CartIcon type="sharp" className="cart-widget__icon icon" />
    </button>
  );
};

export default CartWidget;
