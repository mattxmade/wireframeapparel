import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AwesomeSvg from "../svg-icons/Awesome.module";
import CommerceUtils from "../../utility/CommerceUtils.module";

const { capitaliseString, depluraliseString } = CommerceUtils;
const { AngleUpIcon, AngleDownIcon, TrashIcon } = AwesomeSvg;

const CartItem = (props) => {
  const { item, variantID, handleCartItem } = props;

  return (
    <Fragment>
      <Link
        to={`/shop`}
        onKeyDown={(e) => {
          if (e.code === "NumpadEnter" || e.code === "Enter") {
            // TODO search for product
          }
        }}
      >
        <span className="sr-only">{`${item.name} ${item.type.kind}`}</span>
        <img
          className="cart-item__thumbnail"
          src={item.image.src}
          alt={item.image.alt}
        />
      </Link>

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
            <button onClick={() => handleCartItem(variantID, "remove")}>
              <i>
                <TrashIcon className="cart-icon" />
              </i>
            </button>

            <div className="cart-item__quantity">
              <button
                onClick={(e) => {
                  handleCartItem(variantID, "increment");
                }}
              >
                <i>
                  <AngleUpIcon />
                </i>
              </button>

              <p>{item.quantity}</p>

              <button
                onClick={(e) => {
                  handleCartItem(variantID, "decrement");
                }}
              >
                <i>
                  <AngleDownIcon />
                </i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

CartItem.propTypes = {
  itemsInCart: PropTypes.array,
  handleCartItem: PropTypes.func,
};

export default CartItem;
