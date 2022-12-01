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

const getID = (category) => {
  switch (category) {
    case "hats":
      return [nanoid()];
    case "t-shirts":
      return [
        "LMFgbsbBv8RTeDEbqKJKe",
        "2aEcSl_ekwMM6Y_GCfbog",
        "00P9dkV6fmCyErwinMYtj",
        "geRQ8GhwTTOKT4aCy18VY",
        "LCxJOSMdYJtEpe0M4gyZw",
        "1JGWQbGeEcBWpbBHvQEJS",
        "wFbU_4XvmZn5uHSW3h614",
        "1oceKGeKwCAQzteb5i1Rf",
        "YMiJ8V8-fvksl7M-X8uKn",
        "uX9nbW8w84OwHZgDA2inz",
        "U-KE4gfi4w_TL25nLAcat",
        "gLoSPcCbpg16dfLB_xKTb",
        "BY7Fwrspg6IFXHIOUiwrZ",
        "pHCBfYFkA6PrDvdcd-eE8",
        "qa4egQOw0WasJLyjEypRc",
        "DaT-r7dc5SqtrN8s4J2A5",
        "CnyU3y-fBeuGKSx3nVnNT",
        "unPoj_1511ojV9NiA9gEn",
        "rK0MxlyyfsunQxKGm22xt",
        "xysapOFyBKs39pbUJTbQQ",
      ];
    case "footwear":
      return ["7xrCc79aOUwIeM5D7wMaF"];
    case "skateboards":
      return [
        "AlS6z5Lcg1ZC0f5cLoHly",
        "UJYCwGjF-nngIDSQtQOyS",
        "LhG2ft1-OtV7-h5VYOPs8",
        "EkRWRo_R7JPwMkf-kxJt1",
        "q8DYE-YXwVMAJGIJtzpWE",
        "kBgd7lvFf82RfpPAF4yPb",
        "TouMNaddorvFGAgPrVXY4",
        "H6GQfygOyGtEC8QycxGQx",
        "RAXnppvfb9aQlZ9EnYqgW",
        "kU3Rxt3_iOzXx4o87FNmd",
        "8ChzExZaYsNOnZ64EOZte",
        "vNIWNEFBXf-CzBLABL6r5",
        "JYIs0XYEE8fSko8uvu-Ku",
      ];
  }
};

const getPrice = (category) => {
  switch (category) {
    case "t-shirts":
      return 35;
    case "hats":
      return 25;
    case "footwear":
      return 60;
    case "skateboards":
      return 70;
  }
};

const ProductData = (() => {
  const productImages = {
    designs: AssetsFromDirectory("designs", "webp"),
    hats: AssetsFromDirectory("hats", "webp"),
    "t-shirts": AssetsFromDirectory("tshirts", "webp"),
    footwear: AssetsFromDirectory("footwear", "webp"),
    skateboards: AssetsFromDirectory("skateboards", "webp"),
  };

  const _createProducts = (key) =>
    productImages[key].map((productImage, index) => {
      const type = {
        kind: depluraliseString(key),
        category: key,
      };

      //const id = nanoid();
      const id = getID(type.category)[index];

      //const price = generateRandomPrice();
      const price = getPrice(type.category);

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

      // const product = {
      //   index,
      //   id,
      // };

      // for (const [key, value] of Object.entries(product)) {
      //   console.log(`${key}: ${value}`);
      //   if (key === "id") console.log(" ");
      // }

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
    // hats: _createProducts("hats"),
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
