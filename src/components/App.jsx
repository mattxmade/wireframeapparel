import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";

import MaterialSvg from "./svg-icons/Material.module.jsx";

import Header from "./core/Header.jsx";
import SearchBar from "./widgets/SearchBar.jsx";
import NavBar from "./core/NavBar.jsx";

import Cart from "./pages/Cart.jsx";
import Search from "./pages/Search.jsx";
import Catalog from "./pages/Catalog.jsx";
import Product from "./pages/Product.jsx";
import Landing from "./pages/Landing.jsx";

const NoMatch = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => navigate("/"), []);

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

const CustomsView = (props) => {
  const location = useLocation();
  useEffect(() => () => props.handleLastPath(location.pathname), []);

  return (
    <Fragment>
      <h2>Customs View</h2>
    </Fragment>
  );
};

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

const paths = ["/", "/shop", "/customs", "/checkout"];

const App = () => {
  // const [productData, setProductData] = useState([]);
  const [productPagePath, setProductPagePath] = useState("");
  const [productSelection, setProductSelection] = useState();
  const [clickThroughProductType, setClickThroughProductType] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const [lastPath, setLastPath] = useState();
  const [lastSearchPath, setLastSearchPath] = useState();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentOrderTotal, setCurrentOrderTotal] = useState(0);
  const [customerOrder, setCustomerOrder] = useState([]);

  const handleProductSelection = (product) => {
    setProductSelection(product);
    setProductPagePath(product.id);
    setClickThroughProductType(product.type.category);
  };

  // from product page | could abstract away
  const handleProductToCart = (product, quantity) => {
    const currentProduct = product;
    const currentQuantity = quantity;

    const handleOrder = () => {
      if (!customerOrder.length) {
        currentProduct.quantity = currentQuantity;
        return [...customerOrder, currentProduct];
      }

      const { variant } = currentProduct;

      const isNewItem = customerOrder.every((item) => item.variant !== variant);
      const isPrvItem = customerOrder.find((item) => item.variant === variant);

      if (isNewItem) {
        currentProduct.quantity = currentQuantity;
        return [...customerOrder, currentProduct];
      }

      if (isPrvItem)
        return customerOrder.map((item) => {
          if (item.variant === variant) item.quantity += currentQuantity;
          return item;
        });
    };

    const currentOrder = handleOrder();

    handleCartCount(currentOrder);
    setCustomerOrder(currentOrder);
  };

  const updateItemQuantity = (itemIndexToUpdate, action) => {
    let updatedOrder = customerOrder.map((item) => item);
    const itemToUpdate = updatedOrder[itemIndexToUpdate];

    action === "increment"
      ? (itemToUpdate.quantity += 1)
      : (itemToUpdate.quantity -= 1);

    if (itemToUpdate.quantity !== 0) return setCustomerOrder(updatedOrder);

    updatedOrder.splice(itemIndexToUpdate, 1);
    if (updatedOrder.length === 0) updatedOrder = [];

    setCustomerOrder(updatedOrder);
  };

  const removeItemFromCart = (itemIndexToRemove) => {
    if (customerOrder.length === 1) return setCustomerOrder([]);

    return setCustomerOrder((prevCustomerOrder) =>
      prevCustomerOrder.splice(itemIndexToRemove, 1)
    );
  };

  const handleCartItem = (item, action) => {
    console.log("update order");
    switch (action) {
      case "increment":
        return updateItemQuantity(item, action);
      case "decrement":
        return updateItemQuantity(item, action);
      case "remove":
        return removeItemFromCart(item);
    }
  };

  const handleCartCount = (array) => {
    let itemsIncart = 0;

    array.map((item) => (itemsInCart += item.quantity));
    setCurrentOrderTotal(itemsInCart);
  };

  const handleSearchInput = (string) => {
    setSearchInput(string);
  };

  const handleSearchQuery = (string) => {
    //   const path =
    //     string.length < 1
    //       ? lastPath
    //       : {
    //           pathname: "/search",
    //           search: createSearchParams(string).toString(),
    //         };

    //   navigate(path);
    // };

    if (string.length < 1) {
      navigate(lastPath);
      return;
    }

    const path = {
      pathname: "/search",
      search: createSearchParams(string).toString(),
    };

    navigate(path);
  };

  const handleLastPath = (path) => setLastPath(path);
  const handleLastSearchPath = (path) => setLastSearchPath(path);

  return (
    <Fragment>
      <div className="wrapper">
        <Header>
          <SearchBar
            searchInput={searchInput}
            handleSearchQuery={handleSearchQuery}
          />
          {/* <NavBar paths={paths} /> */}
          <CartWidget currentOrderTotal={currentOrderTotal} />
        </Header>

        <Routes>
          <Route
            path="/shop"
            element={<Landing handleLastPath={handleLastPath} />}
          />

          <Route
            path="/"
            element={
              <Catalog
                clickThroughProductType={clickThroughProductType}
                handleProductSelection={handleProductSelection}
                handleLastPath={handleLastPath}
              />
            }
          />

          {productSelection && (
            <Route
              path={`/shop/${productPagePath}`}
              element={
                <Product
                  product={productSelection}
                  handleProductToCart={handleProductToCart}
                  handleLastPath={handleLastPath}
                ></Product>
              }
            />
          )}

          <Route
            path="/customs"
            element={<CustomsView handleLastPath={handleLastPath} />}
          />

          <Route
            path={"/search"}
            element={
              <Search
                handleSearchInput={handleSearchInput}
                handleProductSelection={handleProductSelection}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Cart
                itemsInCart={customerOrder}
                handleCartItem={handleCartItem}
                handleLastPath={handleLastPath}
              />
            }
          />

          {/* <Route path="*" element={<NoMatch />} /> */}
          <Route path="*" element={<NoMatch />} />
        </Routes>

        <footer></footer>
      </div>
    </Fragment>
  );
};

export default App;
