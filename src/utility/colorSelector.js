const colorChart = [
  "#202020",
  "White",
  "DarkSlateGrey",
  "Orange",
  "Violet",
  "Brown",
  "Aqua",
  "Pink",
  "Navy",
  "Purple",
  "Coral",
  "Grey",
  "DarkOrange",
  "LightBlue",
  "LightGreen",
  "Magenta",
  "Gainsboro",
  "PeachPuff",
  "RebeccaPurple",
  "RoyalBlue",
  "Silver",
  "SteelBlue",
  "Turquoise",
  "MediumPurple",
  "MidnightBlue",
  "LimeGreen",
  "Khaki",
  "Ivory",
];

const colorSwap = (indexX, indexY, arrayOfColors) => {
  const colorSwap0 = colorChart[indexX];
  const colorSwap1 = colorChart[indexY];

  const multiColors = arrayOfColors;
  multiColors[indexX] = colorSwap1;
  multiColors[indexY] = colorSwap0;

  return multiColors;
};

const colorSelector = {
  black: { only: ["#202020"], dual: ["#202020", "White"], multi: colorChart },
  white: {
    only: ["White"],
    dual: ["White", "#202020"],
    multi: colorSwap(0, 1, [...colorChart]),
  },
  offBlk: colorSwap(0, 2, [...colorChart]),
};

export default colorSelector;

/**
const colorSelector = {
  multi: [
    "#202020",
    "#fafafa",
    "#abadb0",
    "#2d363d",
    "#322e3f",
    "#353d77",
    "#e5d6c5",
    "#9ec0d5",
    "#dd2121",
    "#5e504c",
    "#a1c740",
    "#026541",
    "#13290c",
    "#ffc7ca",
    "#541e68",
    "#5a1f32",
    "#ffcf6e",
    "#f89f2b",
  ],
  basic: ["#202020", "#fafafa"],
  black: ["#202020"],
  white: ["#fafafa"],
};
 */
