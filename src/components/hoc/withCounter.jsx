import React, { useState } from "react";
import PropTypes from "prop-types";

import LocalStorage from "../../data/LocalStorage.module";

// Higher-Order Component - Handles cart count logic
// returns wrapped component with additional prop and callback

const withCounter = (Component) => {
  return (props) => {
    const [count, setCount] = useState(0);

    const handleCount = (arrayOfItems) => {
      let itemInCart = 0;

      arrayOfItems.map((item) => (itemInCart += item.quantity));
      LocalStorage.set("cart-total", itemInCart);

      setCount(itemInCart);
    };

    return <Component {...props} count={count} handleCount={handleCount} />;
  };
};

export default withCounter;

withCounter.propTypes = {
  arrayOfItems: PropTypes.array.isRequired,
};
