const CommerceUtils = (() => {
  const fixPrice = (price) => Number.parseFloat(price).toFixed(2);

  const capitaliseString = (string) => {
    const stringToProcess = string;
    return stringToProcess.slice(0, 1).toUpperCase() + stringToProcess.slice(1);
  };

  const depluraliseString = (string) => {
    if (string.slice(-3) === "ies")
      return string.slice(0, string.length - 3) + "y";

    if (string.slice(-1) === "s") return string.slice(0, string.length - 1);

    return string;
  };
  return {
    fixPrice,
    capitaliseString,
    depluraliseString,
  };
})();

export default CommerceUtils;
