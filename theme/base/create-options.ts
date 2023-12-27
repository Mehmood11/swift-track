import type { ThemeOptions } from "@mui/material/styles/createTheme";

import { createTypography } from "./create-typography";
import { createComponents } from "./create-components";
import type { Direction } from "common/types";

interface Config {
  direction?: Direction;
  disableButtonsOnLoginAs?: boolean;
}

// Here we do not modify the "palette" and "shadows" because "light" and "dark" mode
// may have different values.

export const createOptions = (config: Config): ThemeOptions => {
  const { direction = "ltr", disableButtonsOnLoginAs = false } = config;
  return {
    spacing: 10,
    breakpoints: {
      values: {
        xxs: 0,
        xs: 360,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
        xxl: 1760,
      },
    },
    components: createComponents({ disableButtonsOnLoginAs }),
    direction,
    shape: {
      borderRadius: 8,
    },
    typography: createTypography(),
  };
};
