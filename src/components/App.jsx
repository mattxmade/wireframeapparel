import React, { Fragment, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  createSearchParams,
} from "react-router-dom";

import Header from "./core/Header.jsx";
import SearchBar from "./widgets/SearchBar.jsx";
import CartWidget from "./widgets/CartWidget.jsx";
import LocalStorage from "../data/LocalStorage.module.js";

import CartPage from "./pages/CartPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import BrowsePage from "./pages/BrowsePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import NoMatchPage from "./pages/NoMatchPage.jsx";
import EnhancedComponent from "./hoc/EnhancedComponent.module.js";

const App = () => {
  const [productPagePath, setProductPagePath] = useState("");
  const [productSelection, setProductSelection] = useState();
  const [clickThroughProductType, setClickThroughProductType] = useState();

  const navigate = useNavigate();
  const [lastPath, setLastPath] = useState();
  const [searchInput, setSearchInput] = useState("");

  const [customerOrder, setCustomerOrder] = useState(
    LocalStorage.get("cart-items") ?? []
  );

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
    LocalStorage.set("cart-items", currentOrder);
    setCustomerOrder(currentOrder);
  };

  const updateCustomerOrder = (array) => {
    // console.log("App: order update function called");
    setCustomerOrder(array);
  };

  const handleSearchInput = (string) => {
    setSearchInput(string);
  };

  const handleSearchQuery = (string) => {
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

  // Fallback to last path when search input is cleared
  const handleLastPath = (path) => setLastPath(path);

  // Higher-Order Component Abstraction Module
  const { create, HOC } = EnhancedComponent;

  const CartPageWithCounter = create(CartPage, HOC.withCounter);
  const CartWidgetWithCounter = create(CartWidget, HOC.withCounter);

  return (
    <Fragment>
      <div className="wrapper">
        <Header>
          <SearchBar
            searchInput={searchInput}
            handleSearchQuery={handleSearchQuery}
          />
          <CartWidgetWithCounter customerOrder={customerOrder} />
        </Header>

        <Routes>
          <Route
            path="/"
            element={<LandingPage handleLastPath={handleLastPath} />}
          />

          <Route
            path="/shop"
            element={
              <BrowsePage
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
                <ProductPage
                  product={productSelection}
                  handleProductToCart={handleProductToCart}
                  handleLastPath={handleLastPath}
                />
              }
            />
          )}

          <Route
            path={"/search"}
            element={
              <SearchPage
                handleSearchInput={handleSearchInput}
                handleProductSelection={handleProductSelection}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CartPageWithCounter
                itemsInCart={customerOrder}
                updateCustomerOrder={updateCustomerOrder}
                handleLastPath={handleLastPath}
              />
            }
          />

          <Route
            path="*"
            element={
              <NoMatchPage handleProductSelection={handleProductSelection} />
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;
