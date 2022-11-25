import { useState } from "react";

import LocalStorage from "../../data/LocalStorage.module";

const useFilter = (viewType) => {
  const view = viewType;

  const config = (view) => {
    let fallback;
    let ProductFilter;

    if (view === "browse") {
      fallback = "All";

      ProductFilter = (category, filterBy, arrayToFilter) =>
        arrayToFilter.filter((product) => {
          if (filterBy === "All") return product;
          if (filterBy === product.brand) return product;
        });
    }

    if (view === "search") {
      fallback = "All";

      ProductFilter = (category, filterBy, array) => {
        const data = array.filter((product) => {
          if (category === "All") return product;
          if (product.type.category === category) return product;
        });

        return data.filter((product) => {
          if (filterBy == "All") return product;
          if (filterBy === product.brand) return product;
        });
      };
    }

    return { fallback, ProductFilter };
  };

  const { fallback, ProductFilter } = config(view);

  const [attribute, setAttribute] = useState(
    LocalStorage.get("filter") ?? fallback
  );

  const handle = (category, filterByAttribute, arrayToFilter) => {
    setAttribute(filterByAttribute);
    // LocalStorage.set("filter", filterByAttribute);

    return ProductFilter(category, filterByAttribute, arrayToFilter);
  };

  return { attribute, handle };
};

export default useFilter;
