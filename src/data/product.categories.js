const categories = {
  Reset: {
    cat00: "All",
  },

  "T-shirts": {
    cat00: "All",
    cat01: "Wireframe Apparel",
    cat02: "Developer",
    cat03: "StockImg",
  },

  Hats: {
    cat00: "All",
    cat01: "Wireframe",
    cat02: "Developer",
  },

  Footwear: {
    cat00: "All",
    cat01: "Wireframe",
  },

  Skateboards: {
    cat00: "All",
    cat02: "Developer",
  },
};

const productCategories = (view) => {
  if (view === "search") return categories;

  if (view === "browse") {
    const browseCatergories = { ...categories };
    delete browseCatergories.Reset;

    return browseCatergories;
  }
};

export default productCategories;
