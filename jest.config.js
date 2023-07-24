const { defaults } = require("jest-config");

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],

  moduleNameMapper: {
    "^[./a-zA-Z0-9$_-]+\\.(css|png|gif|webp|svg|ttf|woff|woff2|mp4|webm|mp3|glb)$":
      "<rootDir>/src/components/__mocks__/AssetMock.js",
    "\\.(css|less|scss)$": "<rootDir>/src/components/__mocks__/styleMock.js",
  },

  setupFiles: ["<rootDir>/src/components/__jest_setup__/ProptypeError.js"],
};

config.verbose = true;
config.testEnvironment = "jsdom";

module.exports = config;

// mock png / assets
// https://stackoverflow.com/a/71618485
// https://jestjs.io/docs/configuration/#modulenamemapper-objectstring-string--arraystring

// error handling setup
// https://medium.com/shark-bytes/type-checking-with-prop-types-in-jest-e0cd0dc92d5
