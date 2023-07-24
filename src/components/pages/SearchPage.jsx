import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import fetchData from "../../data/fetchData";
import ProductData from "../../data/product.data";
import LocalStorage from "../../data/LocalStorage.module";

import useSort from "../hooks/useSort";
import useFilter from "../hooks/useFilter";

import ProductResults from "./ProductResults";
import ResultCard from "./ResultCard";

const SearchPage = (props) => {
  const id = "search";
  const navigate = useNavigate();
  const location = useLocation();

  const [cache, setCache] = useState();
  const [searchResults, setSearchResults] = useState();

  const sort = useSort();
  const filter = useFilter("search");

  const [category, setCategory] = useState(
    LocalStorage.get("category")?.search ?? "All"
  );

  const mapData = (array) => setSearchResults(array?.map((product) => product));

  const handleCategory = (productCategory) => {
    if (productCategory === category) return;

    setCategory(productCategory);
    LocalStorage.set("category", {
      browse: category.browse,
      search: productCategory,
    });

    handleFilterProducts(productCategory, filter.attribute);
  };

  const handleSortProducts = (sortProductsBy, array = searchResults) =>
    sort.products(sortProductsBy, {
      array,
      setState: setSearchResults,
    });

  const handleFilterProducts = (productCategory, filterProductsBy) => {
    mapData(filter.handle(productCategory, filterProductsBy, cache));
  };

  const viewProps = {
    type: id,
    handleCategory,
    handleSortProducts,
    handleFilterProducts,
  };

  useEffect(() => {
    if (!location.search.length) navigate("/");

    const query = location.search.slice(1, location.search.length - 1);

    fetchData(ProductData.search, { setCache }, query);
    props.handleSearchInput(query);
  }, [location.search]);

  useEffect(() => cache && setSearchResults(cache), [cache]);

  useEffect(() => {
    if (cache && cache.length) {
      const processResultsByUserPref = filter.handle(category, "All", cache);

      handleSortProducts(sort.sortBy, processResultsByUserPref);
    }
  }, [cache]);

  useEffect(() => () => props.handleSearchInput(""), []);

  return (
    <Fragment>
      <ProductResults view={viewProps} productCategory={category}>
        {searchResults?.length > 0 && (
          <div className="product-results">
            {searchResults.map(
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

export default SearchPage;
