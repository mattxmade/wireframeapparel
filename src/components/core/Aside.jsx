import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import AwesomeSvg from "../svg-icons/Awesome.module";
import productCategories from "../../data/product.categories";
import LocalStorage from "../../data/LocalStorage.module";

const ProductFilters = ({
  title,
  active,
  subcategories,
  updateProductType,
  handleActiveElement,
  handleProductFilter,
}) => {
  const listRef = useRef();
  const filters = subcategories;
  const categoryTitle = title.toLowerCase();

  const [activeBrand, setActiveBrand] = useState(
    LocalStorage.get("brand") ?? "All"
  );

  useEffect(() => {
    if (listRef.current.childNodes.length) {
      listRef.current.childNodes.forEach((item) => {
        const styling = "subcategory--active";

        item.textContent.includes(activeBrand)
          ? item.classList.add(styling)
          : item.classList.remove(styling);
      });
    }
  });

  const CloseIcon = AwesomeSvg.CircleXMark;

  return (
    <ul ref={listRef} className="category">
      <li className="category-stem" />
      <li
        className="category-title"
        onClick={(e) => {
          if (categoryTitle !== active) {
            setActiveBrand("All");

            const categorySelect = e.target.textContent.toLowerCase();

            if (e.target.textContent === "Reset") {
              setTimeout(() => updateProductType("All"), 200);
              handleActiveElement(categorySelect);
              return;
            }

            setTimeout(() => updateProductType(categorySelect), 200);
            handleActiveElement(e.target.textContent.toLowerCase());
            handleProductFilter(categoryTitle, "All");
          }
        }}
      >
        {title}
      </li>
      {categoryTitle === active &&
        filters &&
        [...new Array(Object.keys(filters).length)].map((value, index) => (
          <li
            key={index}
            className="subcategory"
            onClick={(e) => {
              setActiveBrand(e.target.textContent);
              LocalStorage.set("brand", e.target.textContent);

              handleProductFilter(categoryTitle, e.target.textContent);
            }}
          >
            <div className="subcategory-branch" />
            <span>{Object.values(filters)[index]}</span>
          </li>
        ))}
    </ul>
  );
};

ProductFilters.propTypes = {
  title: PropTypes.string,
  active: PropTypes.string,
  subcategories: PropTypes.object,
  updateProductType: PropTypes.func,
  handleActiveElement: PropTypes.func,
  handleProductFilter: PropTypes.func,
};

const Aside = ({ view, category, updateProductType, handleProductFilter }) => {
  const categoryFromStorage =
    view === "browse"
      ? LocalStorage.get("category")?.browse
      : LocalStorage.get("category")?.search;

  const [activeElement, setActiveElement] = useState(
    categoryFromStorage ?? category
  );

  const categoryItems = Object.entries(productCategories(view));

  const handleActiveElement = (string) => {
    if (string === activeElement) return;
    return setActiveElement(string);
  };

  useEffect(() => {
    const categoryTitles = document.getElementsByClassName("category-title");

    for (const element of categoryTitles) {
      element.classList.remove("category-title--active");
      element.parentNode.classList.remove("category--active");

      element.parentNode.style.height = "5rem";
      const categoryStem = element.parentNode.childNodes[0];
      categoryStem.style.height = "0";

      if (element.textContent.toLowerCase() === activeElement) {
        element.classList.add("category-title--active");
        element.parentNode.classList.add("category--active");

        const parentNodeHeight = (element.parentNode.children.length - 1) * 4;
        element.parentNode.style.height = `${parentNodeHeight}rem`;
        categoryStem.style.height = `calc(${parentNodeHeight}rem - 11.5%)`;
      }
    }
  }, [activeElement]);

  return (
    <aside className="aside--catalog">
      <h2>// Filters</h2>
      <CloseIcon className="close-aside" />
      <div className="aside--catalog__div">
        <h3>Category</h3>
        <ul>
          {categoryItems.map((category, index) => {
            const [categoryTitle, subcategories] = category;

            return (
              <li key={index}>
                <ProductFilters
                  title={categoryTitle}
                  active={activeElement}
                  subcategories={subcategories}
                  updateProductType={updateProductType}
                  handleActiveElement={handleActiveElement}
                  handleProductFilter={handleProductFilter}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

Aside.propTypes = {
  view: PropTypes.string,
  category: PropTypes.string,
  updateProductType: PropTypes.func,
  handleProductFilter: PropTypes.func,
};
