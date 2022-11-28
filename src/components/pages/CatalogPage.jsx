import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes, { array } from "prop-types";

import fetchData from "../../data/fetchData";
import ProductData from "../../data/product.data";
import LocalStorage from "../../data/LocalStorage.module";

import useSort from "../hooks/useSort";
import useFilter from "../hooks/useFilter";

import Products from "./Products";
import ItemCard from "../core/ItemCard";

import "./CatalogPage.style.scss";

const Catalog = (props) => {
  const location = useLocation();

  const [cache, setCache] = useState();
  const [browseResults, setBrowseResults] = useState();
  const [productsPerPage, setProductsPerPage] = useState(19);

  const sort = useSort();
  const filter = useFilter("browse");
  const [category, setCategory] = useState(
    props.clickThroughProductType ??
      LocalStorage.get("category")?.browse ??
      "t-shirts"
  );

  const mapData = (array) => setBrowseResults(array?.map((product) => product));

  const handleFetchProductData = (category, numOfItems) =>
    fetchData(ProductData.list, { setCache }, category, numOfItems);

  const handleCategory = (productCategory) => {
    if (productCategory === category) return;

    LocalStorage.set("category", {
      browse: productCategory,
      search: category.search,
    });
    LocalStorage.set("brand", "All");

    setCategory(productCategory);
    handleFetchProductData(productCategory, productsPerPage);
  };

  const handleSortProducts = (sortProductsBy, array = browseResults) => {
    if (sort.sortBy === sortProductsBy) return;
    mapData(sort.handleSortBy(sortProductsBy, array));
  };

  const handleFilterProducts = (productType, filterProductsBy) => {
    if (filter.attribute === filterProductsBy) return;

    LocalStorage.set("filter", filterProductsBy);
    mapData(filter.handle(productType, filterProductsBy, cache));
  };

  const viewProps = {
    type: "browse",

    handleCategory,
    handleSortProducts,
    handleFilterProducts,
  };

  useEffect(() => {
    handleFetchProductData(category, productsPerPage);
    return () => props.handleLastPath(location.pathname);
  }, []);

  const handleProcessData = () => {
    const filterProducts = filter.handle(
      LocalStorage.get("category")?.browse ?? "All",
      LocalStorage.get("brand") ?? "All",
      cache
    );

    mapData(sort.handleSortBy(sort.sortBy, filterProducts));
  };

  useEffect(() => cache && handleProcessData(), [cache]);

  // items per page

  return (
    <Fragment>
      <Products view={viewProps} productCategory={category}>
        {browseResults?.length > 0 && (
          <div className="product-results">
            {browseResults.map(
              (item, index) =>
                item && (
                  <ItemCard
                    item={item}
                    key={index}
                    type={"Search"}
                    handleProductSelection={props.handleProductSelection}
                  />
                )
            )}
          </div>
        )}
      </Products>
    </Fragment>
  );
};

export default Catalog;

// Catalog.propTypes = {
//   clickThroughProductType: PropTypes.string,
//   handleProductSelection: PropTypes.func,
// };
