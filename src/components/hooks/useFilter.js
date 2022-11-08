import { useState } from "react";

import LocalStorage from "../../data/LocalStorage.module";

const useFilter = (viewType) => {
  const view = viewType;

  const config = (view) => {
    let fallback;
    let ProductFilter;

    if (view === "browse") {
      fallback = "t-shirts";

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
          if (product.type.category === category) return product;
        });

        return data.filter((product) => {
          if (filterBy === product.brand) return product;
          if (filterBy == "All") return product;
        });
      };
    }

    return { fallback, ProductFilter };
  };

  const { fallback, ProductFilter } = config(view);

  const [filterBy, setFilterBy] = useState(
    LocalStorage.get("filter") ?? fallback
  );

  const handleFilterBy = (category, method, arrayToFilter) => {
    setFilterBy(method);
    LocalStorage.set("filter", method);

    return ProductFilter(category, method, arrayToFilter);
  };

  return { filterBy, handleFilterBy };
};

export default useFilter;
