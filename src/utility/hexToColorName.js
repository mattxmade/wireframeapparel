const hexToColorName = (hexcode) => {
  const hexcodes = {
    "#202020": "Black",
    "#fafafa": "White",
    "#abadb0": "Grey",
    "#2d363d": "Denim",
    "#322e3f": "Navy",
    "#353d77": "Blue",
    "#e5d6c5": "Cream",
    "#9ec0d5": "Light Blue",
    "#dd2121": "Red",
    "#5e504c": "Dark Grey",
    "#a1c740": "Kiwi",
    "#026541": "Green",
    "#13290c": "Forest Green",
    "#ffc7ca": "Light Pink",
    "#541e68": "Purple",
    "#5a1f32": "Dark Red",
    "#ffcf6e": "Yellow",
    "#f89f2b": "Gold",
  };

  let colorName;

  for (const [key, value] of Object.entries(hexcodes)) {
    if (hexcode === key) colorName = value;
  }

  return colorName ? colorName : hexcode;
};

export default hexToColorName;
