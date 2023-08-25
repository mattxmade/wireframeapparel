import React, { Fragment, useEffect, useRef, useState } from "react";

import Aside from "../core/Aside";
import Dropdown from "../widgets/Dropdown";
import AwesomeSvg from "../svg-icons/Awesome.module";
import capitaliseString from "../../utility/capitaliseString";

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

  useEffect(() => {
    if (window.innerHeight >= 615) document.body.style.overflow = "hidden";
    else document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  return (
    <Fragment>
      <main className={`main--${view.type}`}>
        <Aside
          view={view.type}
          category={props.productCategory}
          updateProductType={view.handleCategory}
          handleProductFilter={view.handleFilterProducts}
        />

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

        {/* TDOO <AdWidget /> */}

        <section className={`section--${view.type}`}>
          <ul>
            <li>
              <h3>// {capitaliseString(props.productCategory)}</h3>
            </li>
            <li>
              <Dropdown
                handleSortProductsBy={view.handleSortProducts}
                options={[
                  "Name: A-Z",
                  "Price: Low to High",
                  "Price: High to Low",
                ]}
              />
            </li>
          </ul>

          {props.children}
        </section>
      </main>
    </Fragment>
  );
};

export default ProductResults;
