import React from "react";
import { useNavigate } from "react-router-dom";

import MaterialSvg from "../svg-icons/Material.module";
import "./CartWidget.style.scss";

const CartWidget = ({ currentOrderTotal }) => {
  const { CartIcon } = MaterialSvg;
  const navigate = useNavigate();

  return (
    <button
      aria-controls="primary-navigation"
      className="cart-widget-button icon--select"
      onClick={() => navigate("/checkout")}
    >
      <span className="sr-only">Menu</span>
      <p className="cart-widget__counter">{currentOrderTotal}</p>
      <CartIcon type="sharp" className="cart-widget__icon icon" />
    </button>
  );
};

export default CartWidget;
