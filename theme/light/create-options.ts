import type { ThemeOptions } from "@mui/material/styles/createTheme";

import { createComponents } from "./create-components";
import { createPalette } from "./create-palette";
import { createShadows } from "./create-shadows";
import type { ColorPreset, Contrast } from "common/types";

interface Config {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
}

export const createOptions = ({
  colorPreset,
  contrast,
}: Config): ThemeOptions => {
  const palette = createPalette({ colorPreset, contrast });
  const components = createComponents({ palette });
  const shadows = createShadows();

  return {
    components,
    palette,
    shadows,
  };
};
