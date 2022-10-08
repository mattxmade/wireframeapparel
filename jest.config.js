const { defaults } = require("jest-config");

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],
};

config.verbose = true;
config.testEnvironment = "jsdom";

module.exports = config;
