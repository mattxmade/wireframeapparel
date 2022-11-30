import React, { Fragment, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  createSearchParams,
} from "react-router-dom";

import Header from "./core/Header.jsx";
import Footer from "./core/Footer.jsx";
import SearchBar from "./widgets/SearchBar.jsx";
import CartWidget from "./widgets/CartWidget.jsx";
import LocalStorage from "../data/LocalStorage.module.js";

import CartPage from "./pages/CartPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import BrowsePage from "./pages/BrowsePage.jsx";
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
  const [customerOrder, setCustomerOrder] = useState(
    LocalStorage.get("cart") ?? []
  );
  // const refCustomerOrder = useRef(customerOrder);

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
    LocalStorage.set("cart", currentOrder);

    handleCartCount(currentOrder);
    setCustomerOrder(currentOrder);
  };

  const updateCustomerOrder = (array) => {
    console.log("App: order update function called; CartPage unmounted");

    setCustomerOrder(array);
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
                handleCartCount={handleCartCount}
                updateCustomerOrder={updateCustomerOrder}
                handleLastPath={handleLastPath}
              />
            }
          />

          <Route path="*" element={<NoMatchPage />} />
        </Routes>

        <Footer />
      </div>
    </Fragment>
  );
};

export default App;
