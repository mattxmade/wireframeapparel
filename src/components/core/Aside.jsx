import React, { useEffect } from "react";

const CategoryItem = ({ title, updateProductType }) => (
  <li
    onClick={(e) => {
      updateProductType(e.target.textContent.toLowerCase());

      e.target.parentNode.childNodes.forEach((child) =>
        child.classList.remove("li--active")
      );
      e.target.classList.add("li--active");
    }}
  >
    {title}
  </li>
);

const Aside = ({ category, updateProductType }) => {
  useEffect(() => {
    const asideListItems = document
      .querySelector(".aside--catalog")
      .getElementsByTagName("LI");

    for (const item of asideListItems) {
      item.textContent.toLowerCase() === category
        ? item.classList.add("li--active")
        : item.classList.remove("li--active");
    }
  }, []);

  return (
    <aside className="aside--catalog">
      <h2>// Filters</h2>
      <div className="aside--catalog__div">
        <h3>Category</h3>
        <ul>
          <CategoryItem
            title="T-shirts"
            updateProductType={updateProductType}
          />

          <CategoryItem title="Hats" updateProductType={updateProductType} />

          <CategoryItem
            title="Accessories"
            updateProductType={updateProductType}
          />

          <CategoryItem
            title="Skateboards"
            updateProductType={updateProductType}
          />

          <CategoryItem title="Customs" updateProductType={updateProductType} />

          <CategoryItem title="Other" updateProductType={updateProductType} />
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
