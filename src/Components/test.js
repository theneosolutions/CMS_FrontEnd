import { useEffect, useState } from "react";
const initialColors = {
  PRIMARY: "#21C0D9",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  grey: "#9B9787",
  lightBlue: "#A5DAE7",
  // Add default colors here
};
const ColorComponent = () => {
  const [colors, setColors] = useState(initialColors); // This line is equivalent to React.useState in React
  // Simulating API call for color data
  const apiResponse = [
    {
      color: "#FFFF0A",
      name: "Quaternary",
    },
    {
      color: "#FFFFFB",
      name: "Secondary",
    },
    {
      color: "#1E3D1E",
      name: "Primary",
    },
    {
      color: "#A3A3A3",
      name: "Tertiary",
    },
    // Add more colors from your API response
  ];
  const apiToColorMap = {
    Primary: "PRIMARY",
    Secondary: "WHITE",
    Quaternary: "BLACK",
    Tertiary: "grey",
    // Update with your specific mapping
    // Add more mappings as needed
  };
  const updatedColors = { ...initialColors };
  apiResponse.forEach((item) => {
    const colorKey = apiToColorMap[item.name];
    if (colorKey) {
      updatedColors[colorKey] = item.color;
    }
  });
  useEffect(() => {
    setColors(updatedColors);
  }, []);
  // The setColors function is equivalent to React.useState's setter function

  console.log("PRIMARY", colors.PRIMARY); // Output: '#1E3D1E'
  console.log("WHITE", colors.WHITE); // Output: '#FFFFFF'
  // Now you can use the 'colors' object wherever needed in your application
};
export default ColorComponent;
// Usage: Accessing colors in another part of your code
// You can directly use the 'colors' object once it's updated within the ColorComponent
// For example:
// console.log(colors.PRIMARY); // Output: '#1E3D1E'
// console.log(colors.WHITE); // Output: '#FFFFFF'
// // Use colors wherever needed in your application
