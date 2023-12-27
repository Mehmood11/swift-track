import type { PaletteColor } from "@mui/material/styles/createPalette";

import { blue, green, indigo, purple, yellow } from "./colors";
import { ColorPreset } from "@/components/types/theme";

export const getPrimary = (preset?: ColorPreset): PaletteColor => {
  switch (preset) {
    case "yellow":
      return yellow;
    case "blue":
      return blue;
    case "green":
      return green;
    case "indigo":
      return indigo;
    case "purple":
      return purple;
    default:
      console.error(
        'Invalid color preset, accepted values: "blue", "green", "indigo" or "purple"".'
      );
      return blue;
  }
};
