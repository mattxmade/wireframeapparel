import { nanoid } from "nanoid";
import depluraliseString from "../utility/depluraliseString";
import getDataFromFilename from "./product.handlers";
import AssetsFromDirectory from "../assets/AssetsFromDirectory";

const getRandomIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const primary = [...new Array(100)].map((x, index) => index);
const secondary = ["", 50, 95, 99];
const currencies = ["£", "$"];

const generateRandomPrice = () => {
  const notes = getRandomIndex(primary);
  const change = getRandomIndex(secondary);

  return `${notes + 30}${change ? "." : ""}${change}`;
};

const ProductData = (() => {
  const productImages = {
    designs: AssetsFromDirectory("designs", "webp"),
    "t-shirts": AssetsFromDirectory("tshirts", "webp"),
    footwear: AssetsFromDirectory("footwear", "webp"),
    skateboards: AssetsFromDirectory("skateboards", "webp"),
  };

  const _createProducts = (key) =>
    productImages[key].map((productImage, index) => {
      const id = nanoid();

      const type = {
        kind: depluraliseString(key),
        category: key,
      };

      const price = generateRandomPrice();

      // offset options: png | jpg | webp
      const imageType = "webp";
      let offset = imageType === "webp" ? 1 : 0;

      getDataFromFilename.offset(imageType);

      const tag = getDataFromFilename.tag(productImage.name);
      const name = getDataFromFilename.name(productImage.name);
      const brand = getDataFromFilename.brand(productImage.name);
      const style = getDataFromFilename.style(productImage.name);
      const colorOptions = getDataFromFilename.colors(productImage.name);

      const color = {
        choice: colorOptions[0],
        options: colorOptions,
        initial: colorOptions[0],
      };

      if (color.choice === "Transparent") color.choice = "N/A";

      const sizing = {
        size: "unset",
        chart: getDataFromFilename.sizing(type.category),
      };

      if (sizing.chart.length === 1) sizing.size = sizing.chart[0];

      const design = productImages.designs.find(
        (design) => name === design.name.slice(0, -7 - offset)
      );

      const image = {
        src: productImage.uri,
        design: design.uri,
        alt: `${name} ${type}`,
      };

      return {
        index,
        id,
        name,
        brand,
        type,
        price,
        style,
        color,
        sizing,
        tag,
        image,
      };
    });

  // create product data
  const categories = {
    "t-shirts": _createProducts("t-shirts"),
    footwear: _createProducts("footwear"),
    skateboards: _createProducts("skateboards"),
  };

  // API
  const _getProductById = (id) => {
    for (const [key, array] of Object.entries(categories)) {
      return array.find((product) => product.id === id);
    }
  };

  const _getProductsByCategory = (number, category) => {
    const requireCategory = categories[category] ? category : "t-shirts";

    const numOfProducts =
      number <= categories[requireCategory].length
        ? number
        : categories[requireCategory].length;

    return [...new Array(numOfProducts)].map(
      (item, index) => categories[requireCategory][index]
    );
  };

  const _findProductByName = (string) => {
    const matchedProducts = [];

    for (const [key, array] of Object.entries(categories)) {
      array.map((product) =>
        product.name.includes(string) ? matchedProducts.push(product) : product
      );
    }

    return matchedProducts;
  };

  const get = (id) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(_getProductById(id)), 0)
    );
  };

  const list = (type, number) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(_getProductsByCategory(number, type)), 0)
    );
  };

  const search = (queryString, number) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(_findProductByName(queryString)), 0)
    );
  };

  return { get, list, search };
})();

export default ProductData;
