import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes, { array } from "prop-types";

import capitaliseString from "../../utility/capitaliseString";

import Aside from "../core/Aside";
import AdWidget from "../widgets/AdWidget";
import Dropdown from "../widgets/Dropdown";
import AwesomeSvg from "../svg-icons/Awesome.module";

import "./ProductResults.style.scss";

const ProductResults = (props) => {
  const view = props.view;
  const filterIconRef = useRef();
  const FilterIcon = AwesomeSvg.SlidersIcon;

  const handleAsidePosition = (e) => {
    const aside = document.querySelector("aside");

    aside.classList.remove("aside-close");
    aside.classList.add("aside-open");
  };

  return (
    <Fragment>
      <main className={`main--${view.type}`}>
        <div
          ref={filterIconRef}
          className="filter-button"
          style={{ display: "flex", gap: "1rem", cursor: "pointer" }}
          onClick={handleAsidePosition}
        >
          <h3>Filters</h3>
          <i className="filter-icon fa-sliders" style={{ width: "1.7rem" }}>
            <FilterIcon />
          </i>
        </div>

        <Aside
          view={view.type}
          category={props.productCategory}
          updateProductType={view.handleCategory}
          handleProductFilter={view.handleFilterProducts}
        />

        {/* TDOO <AdWidget /> */}

        <section className={`section--${view.type}`}>
          <ul>
            <li>
              <h2>// {capitaliseString(props.productCategory)}</h2>
            </li>
            <li>
              <Dropdown handleSortProductsBy={view.handleSortProducts}>
                {"Name: A-Z"}
                {"Price: Low to High"}
                {"Price: High to Low"}
              </Dropdown>
            </li>
          </ul>

          {props.children}
        </section>
      </main>
    </Fragment>
  );
};

export default ProductResults;

// ProductResults.propTypes = {
//   clickThroughProductType: PropTypes.string,
//   handleProductSelection: PropTypes.func,
// };
