const depluraliseString = (string) => {
  if (string.slice(-3) === "ies")
    return string.slice(0, string.length - 3) + "y";

  if (string.slice(-1) === "s") return string.slice(0, string.length - 1);

  return string;
};

export default depluraliseString;
