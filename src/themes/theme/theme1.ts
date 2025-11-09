// project-imports
import { ThemeMode } from "config";

// types
import { PaletteThemeProps } from "types/theme";

// ==============================|| PRESET THEME - THEME1 ||============================== //

export default function Theme1(mode: ThemeMode): PaletteThemeProps {
  const contrastText = "#fff";

  let primaryColors = [
    "#E6EBE8",
    "#D2D8D4",
    "#AAB7AF",
    "#80968B",
    "#58756A",
    "#334735",
    "#273629",
    "#1C261E",
    "#131B15",
    "#0C120D",
  ];
  let secondaryColors = [
    "#F8F9FA",
    "#F8F9FA",
    "#F3F5F7",
    "#DBE0E5",
    "#BEC8D0",
    "#8996A4",
    "#5B6B79",
    "#3E4853",
    "#1D2630",
    "#131920",
  ];
  let errorColors = ["#FFE7D3", "#FF805D", "#FF4528", "#DB271D", "#930C1A"];
  let warningColors = ["#FFF6D0", "#FFCF4E", "#FFB814", "#DB970E", "#935B06"];
  let infoColors = ["#DCF0FF", "#7EB9FF", "#394663", "#3D78DB", "#1A3D93"];
  let successColors = ["#EAFCD4", "#8AE65B", "#58D62A", "#3DB81E", "#137C0D"];
  let textColors = ["#394663"];

  if (mode === ThemeMode.DARK) {
    primaryColors = [
      "#1A211D",
      "#223028",
      "#2C3E34",
      "#3A4F41",
      "#49604F",
      "#5C7262",
      "#7F9385",
      "#A4B4AA",
      "#C7D0CB",
      "#E6EBE8",
    ];
    secondaryColors = [
      "#131920",
      "#1D2630",
      "#3E4853",
      "#5B6B79",
      "#8996A4",
      "#BEC8D0",
      "#DBE0E5",
      "#F3F5F7",
      "#F8F9FA",
      "#F8F9FA",
    ];
    errorColors = ["#341d1b", "#b03725", "#dd3f27", "#e9664d", "#fbd6c9"];
    warningColors = ["#342a1a", "#83631a", "#dda116", "#e9ba3a", "#fbefb5"];
    infoColors = ["#202734", "#416fb0", "#4c88dd", "#74a8e9", "#ecf4fb"];
    successColors = ["#1f2e1c", "#449626", "#4fba28", "#74cf4d", "#e3fbd2"];
    textColors = ["#E6EBE8"];
  }

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText,
    },
    secondary: {
      lighter: secondaryColors[0],
      100: secondaryColors[1],
      200: secondaryColors[2],
      light: secondaryColors[3],
      400: secondaryColors[4],
      500: secondaryColors[5]!,
      main: secondaryColors[6],
      dark: secondaryColors[7],
      800: secondaryColors[8],
      darker: secondaryColors[9],
      contrastText,
    },
    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[4],
      contrastText,
    },
    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText: secondaryColors[5],
    },
    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText,
    },
    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText,
    },
  };
}
