import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes, { array } from "prop-types";

import fetchData from "../../data/fetchData";
import ProductData from "../../data/product.data";
import LocalStorage from "../../data/LocalStorage.module";

import useSort from "../hooks/useSort";
import useFilter from "../hooks/useFilter";

import ProductResults from "./ProductResults";
import ResultCard from "./ResultCard";

// import "./CatalogPage.style.scss";

const BrowsePage = (props) => {
  const id = "browse";
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
    type: id,
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

  // TODO items per page

  return (
    <Fragment>
      <ProductResults view={viewProps} productCategory={category} id={id}>
        {browseResults?.length > 0 && (
          <div className="product-results">
            {browseResults.map(
              (item, index) =>
                item && (
                  <ResultCard
                    item={item}
                    key={index}
                    type={"Search"}
                    handleProductSelection={props.handleProductSelection}
                  />
                )
            )}
          </div>
        )}
      </ProductResults>
    </Fragment>
  );
};

export default BrowsePage;

// BrowsePage.propTypes = {
//   clickThroughProductType: PropTypes.string,
//   handleProductSelection: PropTypes.func,
// };
