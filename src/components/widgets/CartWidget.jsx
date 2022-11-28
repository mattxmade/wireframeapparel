import React from "react";
import { useNavigate } from "react-router-dom";

import MaterialSvg from "../svg-icons/Material.module";
import "./CartWidget.style.scss";

const CartWidget = ({ currentOrderTotal }) => {
  const { CartIcon } = MaterialSvg;
  const navigate = useNavigate();

  return (
    <div className="cart-widget-cont" onClick={() => navigate("/checkout")}>
      <p className="cart-widget__counter">{currentOrderTotal}</p>
      <CartIcon type="sharp" className="cart-widget__icon icon" />
    </div>
  );
};

export default CartWidget;
