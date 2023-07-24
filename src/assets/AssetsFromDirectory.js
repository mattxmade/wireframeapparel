// https://stackoverflow.com/a/67326513

const AssetsFromDirectory = (directory, imageType) => {
  const cache = {};

  // handle imports
  const getAssets = (r) => {
    r.keys().forEach((key) => (cache[key] = r(key)));
  };

  switch (directory) {
    case "carousel":
      getAssets(require.context("./carousel", false, /\.(webp)$/));
      break;

    case "designs":
      getAssets(require.context("./designs", false, /\.(webp)$/));
      break;

    case "hats":
      getAssets(require.context("./catalog/hats", false, /\.(webp)$/));
      break;

    case "tshirts":
      getAssets(require.context("./catalog/tshirts", false, /\.(webp)$/));
      break;

    case "footwear":
      getAssets(require.context("./catalog/footwear", false, /\.(webp)$/));
      break;

    case "skateboards":
      getAssets(require.context("./catalog/skateboards", false, /\.(webp)$/));
      break;
  }

  const cacheArray = [];

  Object.entries(cache).map((module) => {
    const uri = module[1];
    const name = module[0].replace("./", "");
    cacheArray.push({ uri, name });
  });

  return cacheArray;
};

export default AssetsFromDirectory;
