import { alpha } from "@mui/system/colorManipulator";
import { common } from "@mui/material/colors";
import type { PaletteOptions } from "@mui/material/styles/createPalette";

import { ColorPreset, Contrast } from "@/components/types/theme";
import { getPrimary } from "..";
import { error, info, neutral, success, warning } from "../colors";

interface Config {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
}

export const createPalette = (config: Config): PaletteOptions => {
  const { colorPreset, contrast } = config;

  return {
    common: {
      white: "#fff",
      black: "#000",
    },
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: contrast === "high" ? neutral[50] : neutral[100],
      paper: common.white,
    },
    divider: "#F2F4F7",
    error,
    info,
    mode: "light",
    neutral,
    primary: getPrimary(colorPreset),
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
};
