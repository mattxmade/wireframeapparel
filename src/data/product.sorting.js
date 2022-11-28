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

const ProductSort = (sortType, productsArray) => {
  switch (sortType) {
    case "price: high to low":
      return sortBy.price.lowToHigh(productsArray);
    case "price: low to high":
      return sortBy.price.HighToLow(productsArray);

    default:
      return sortBy.alphabetical.aToZ(productsArray);
  }
};

export default ProductSort;
