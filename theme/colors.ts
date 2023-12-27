import { alpha } from "@mui/system/colorManipulator";
import type {
  ColorRange,
  PaletteColor,
} from "@mui/material/styles/createPalette";

const withAlphas = (color: PaletteColor): PaletteColor => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};
// done
export const neutral: ColorRange = {
  50: "#F9FAFB",
  100: "#F2F4F7",
  200: "#EAECF0",
  300: "#D0D5DD",
  400: "#98A2B3",
  500: "#667085",
  600: "#475467",
  700: "#344054",
  800: "#1D2939",
  900: "#101828",
};
// done
export const yellow = withAlphas({
  lightest: "#FFE200",
  light: "#DBC300",
  main: "#BDA800",
  dark: "#938200",
  darkest: "#525100",
  contrastText: "#FFFFFF",
});
// done
export const blue = withAlphas({
  lightest: "#D1E9FF",
  light: "#84CAFF",
  main: "#2E90FA",
  dark: "#175CD3",
  darkest: "#194185",
  contrastText: "#FFFFFF",
});
// done
export const green = withAlphas({
  lightest: "#D1FADF",
  light: "#6CE9A6",
  main: "#12B76A",
  dark: "#027A48",
  darkest: "#054F31",
  contrastText: "#FFFFFF",
});
// done
export const indigo = withAlphas({
  lightest: "#E0EAFF",
  light: "#A4BCFD",
  main: "#6172F3",
  dark: "#3538CD",
  darkest: "#2D3282",
  contrastText: "#FFFFFF",
});
// done
export const purple = withAlphas({
  lightest: "#EBE9FE",
  light: "#BDB4FE",
  main: "#7A5AF8",
  dark: "#5925DC",
  darkest: "#3E1C96",
  contrastText: "#FFFFFF",
});

// Common Colors
export const success = withAlphas({
  lightest: "#D1FADF",
  light: "#6CE9A6",
  main: "#12B76A",
  dark: "#027A48",
  darkest: "#054F31",
  contrastText: "#FFFFFF",
});

export const info = withAlphas({
  lightest: "#ECFDFF",
  light: "#CFF9FE",
  main: "#06AED4",
  dark: "#0E7090",
  darkest: "#164C63",
  contrastText: "#FFFFFF",
});
// done
export const warning = withAlphas({
  lightest: "#FEF0C7",
  light: "#FEC84B",
  main: "#F79009",
  dark: "#B54708",
  darkest: "#7A2E0E",
  contrastText: "#FFFFFF",
});
// done
export const error = withAlphas({
  lightest: "#FEE4E2",
  light: "#FDA29B",
  main: "#F04438",
  dark: "#B42318",
  darkest: "#7A271A",
  contrastText: "#FFFFFF",
});
