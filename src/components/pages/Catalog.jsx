import React, { useEffect, useRef, useState } from "react";
import PropTypes, { array } from "prop-types";

import capitaliseString from "../../utility/capitaliseString";
import LocalStorage from "../../data/LocalStorage.module";
import ProductData from "../../data/product.data";

import Aside from "../core/Aside";
import Promo from "../widgets/Promo";
import ItemCard from "../core/ItemCard";
import Dropdown from "../widgets/Dropdown";

import "../../styles/Catalog.css";

const sortBy = {
  alphabetical: {
    aToZ: (array) => {
      return array.sort((a, z) => {
        if (a.name < z.name) return -1;
        if (a.name > z.name) return 1;

        return 0;
      });
    },
  },

  price: {
    lowToHigh: (array) => array.sort((a, z) => z.price - a.price),
    HighToLow: (array) => array.sort((a, z) => a.price - z.price),
  },
};

const fetchDataFromStore = async (productType, setProductData, filter) => {
  const response = await ProductData.list(19, productType);
  setProductData(sortBy.alphabetical.aToZ(response));
};

const Catalog = ({ clickThroughProductType, handleProductSelection }) => {
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState("All");
  const [productData, setProductData] = useState([]);
  const [productType, setProductType] = useState(
    clickThroughProductType ? clickThroughProductType : "t-shirts"
  );

  useEffect(() => {
    if (productData) {
      const userFilter = LocalStorage.get("filter");
      if (userFilter) setFilter(userFilter);

      const userSort = LocalStorage.get("sort");
      if (userSort) sortProductsBy(userSort);
    }
  }, [productData]);

  // Product data
  useEffect(() => {
    const requestProductData = fetchDataFromStore(productType, setProductData);
    requestProductData;
  }, [productType]);

  const updateProductType = (string) => setProductType(string);

  const handleProductFilter = (categoryToFilter, filterBy) => {
    setFilter(filterBy);
    LocalStorage.set("filter", filterBy);
  };

  // Sort products
  const sortProductsBy = (e) => {
    const sorting = e.target ? e.target.value : e;
    LocalStorage.set("sort", sorting);

    switch (sorting) {
      case "price: high to low":
        setProductData(sortBy.price.lowToHigh(productData));
        break;

      case "price: low to high":
        setProductData(sortBy.price.HighToLow(productData));
        break;

      default:
        setProductData((prevProductData) =>
          sortBy.alphabetical.aToZ(prevProductData)
        );
        break;
    }
  };

  // Sort cleanup
  useEffect(() => {
    if (sort) setSort(false);
  }, [sort]);

  return (
    <main className="main--catalog">
      <div className="sidebar">
        <Aside
          category={productType}
          updateProductType={updateProductType}
          handleProductFilter={handleProductFilter}
        ></Aside>
        {/* <Promo /> */}
      </div>

      <section className="catalog__section">
        <ul>
          <li>
            <h2>// {capitaliseString(productType)}</h2>
          </li>
          <li>
            <Dropdown
              handleSetSort={setSort}
              handleSortProductsBy={sortProductsBy}
            >
              {"Name: A-Z"}
              {"Price: Low to High"}
              {"Price: High to Low"}
            </Dropdown>
          </li>
        </ul>

        {productData && (
          <div className="catalog__section--products">
            {productData.map((item, index) =>
              filter === "All" ? (
                item && (
                  <ItemCard
                    item={item}
                    key={index}
                    type={productType}
                    handleProductSelection={handleProductSelection}
                  />
                )
              ) : item?.brand === filter ? (
                <ItemCard
                  item={item}
                  key={index}
                  type={productType}
                  handleProductSelection={handleProductSelection}
                />
              ) : (
                ""
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Catalog;

Catalog.propTypes = {
  clickThroughProductType: PropTypes.string,
  handleProductSelection: PropTypes.func,
};
