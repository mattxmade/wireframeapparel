import colorSelector from "../utility/colorSelector";

const getDataFromFilename = (() => {
  let offset = 1;

  const setOffset = (fileType) => {
    switch (fileType) {
      case "webp":
        offset = 1;
        break;
      case "png":
        offset = 0;
        break;
      case "jpg":
        offset = 0;
        break;
    }
  };

  const handleData = (dataString, object) => {
    let funcString = dataString;

    for (const [key, value] of Object.entries(object)) {
      if (key === funcString) funcString = value;
    }

    return funcString;
  };

  const productStyle = {};

  const productTypes = {
    ts: "t-shirt",
    fw: "footwear",
    tn: "trainers",
    sb: "skateboard",
  };

  const brands = {
    wf: "Wireframe Apparel",
    dv: "Developer",
    si: "StockImg",
  };

  const setTag = (string) => {
    const key = string.slice(-5 - offset, -4 - offset);
    return key === "y" ? true : false;
  };

  const setType = (string) => {
    const key = string.slice(-17 - offset, -15 - offset);
    const type = handleData(key, productTypes);
    return type ? type : "unknown";
  };

  const setStyle = (string) => {
    const key = string.slice(-10 - offset, -6 - offset);
    const style = handleData(key, productStyle);
    return style ? style : "";
  };

  const setBrand = (string) => {
    const key = string.slice(-20 - offset, -18 - offset);
    const brand = handleData(key, brands);
    return brand ? brand : "unknown";
  };

  const setSizing = (string) => {
    switch (string) {
      case "t-shirts":
        return ["XS", "S", "M", "L", "XL", "XL2", "XL3"];
      case "skateboards":
        return [7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75];
      case "footwear":
        return [4, 5, 6, 7, 8, 9, 10, 11, 12];
      case "hats":
        return ["One Size"];
    }
  };

  // color keys
  /**
  bwn = black white only    [first color is black]
  bnn = black only          ""
  bwc = black white multi   ""

  wbn = white black only    [first color is white]
  wnn = white only          ""
  wbc = white black multi   ""

  obc = off-black multi     [first color is darkslategrey]
  nnn = all over
 */

  const setColors = (string) => {
    const key = string.slice(-14 - offset, -11 - offset);

    switch (key) {
      case "bwn":
        return colorSelector.black.dual;
      case "bnn":
        return colorSelector.black.only;
      case "bwc":
        return colorSelector.black.multi;
      case "wbn":
        return colorSelector.white.dual;
      case "wnn":
        return colorSelector.white.only;
      case "wbc":
        return colorSelector.white.multi;
      case "obc":
        return colorSelector.offBlk;
      case "nnn":
        return colorSelector.none;
    }
  };

  return {
    tag: (string) => setTag(string),
    name: (string) => string.slice(0, -21 - offset),
    type: (string) => setType(string),
    style: (string) => string.slice(-10 - offset, -6 - offset),
    brand: (string) => setBrand(string),
    colors: (string) => setColors(string),
    sizing: (string) => setSizing(string),
    offset: (string) => setOffset(string),
  };
})();

export default getDataFromFilename;
