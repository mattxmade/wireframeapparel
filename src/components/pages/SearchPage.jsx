import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes, { array } from "prop-types";

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
  const [productsPerPage, setProductsPerPage] = useState(19);

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

  const handleSortProducts = (sortProductsBy) => {
    //if (sort.sortBy === sortProductsBy) return;
    searchResults && mapData(sort.handleSortBy(sortProductsBy, searchResults));
  };

  const handleFilterProducts = (productCategory, filterProductsBy) => {
    //if (filter.attribute === filterProductsBy) return;
    //LocalStorage.set("filter", filterProductsBy);
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
      const processDataByUserPref = filter.handle(category, "All", cache);

      mapData(sort.handleSortBy(sort.sortBy, processDataByUserPref));
    }
  }, [cache]);

  useEffect(() => () => props.handleSearchInput(""), []);

  return (
    <Fragment>
      {console.count("Search render")}

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
