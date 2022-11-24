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

import CartPage from "./pages/CartPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import NoMatchPage from "./pages/NoMatchPage.jsx";
import CustomisePage from "./pages/CustomisePage.jsx";

const App = () => {
  const [productPagePath, setProductPagePath] = useState("");
  const [productSelection, setProductSelection] = useState();
  const [clickThroughProductType, setClickThroughProductType] = useState();

  const navigate = useNavigate();
  const [lastPath, setLastPath] = useState();
  const [searchInput, setSearchInput] = useState("");

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
    let itemsInCart = 0;

    array.map((item) => (itemsInCart += item.quantity));
    setCurrentOrderTotal(itemsInCart);
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
            path="/"
            element={<LandingPage handleLastPath={handleLastPath} />}
          />

          <Route
            path="/shop"
            element={
              <CatalogPage
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
                ></ProductPage>
              }
            />
          )}

          <Route
            path="/customs"
            element={<CustomisePage handleLastPath={handleLastPath} />}
          />

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
              <CartPage
                itemsInCart={customerOrder}
                handleCartItem={handleCartItem}
                handleLastPath={handleLastPath}
              />
            }
          />

          <Route path="*" element={<NoMatchPage />} />
        </Routes>

        <footer></footer>
      </div>
    </Fragment>
  );
};

export default App;
