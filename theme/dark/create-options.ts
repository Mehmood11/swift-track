import type { ThemeOptions } from "@mui/material/styles/createTheme";

import { createComponents } from "./create-components";
import { createPalette } from "./create-palette";
import { createShadows } from "./create-shadows";
import { ColorPreset, Contrast } from "@/components/types/theme";

interface Config {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
}

export const createOptions = (config: Config): ThemeOptions => {
  const { colorPreset, contrast } = config;
  const palette = createPalette({ colorPreset, contrast });
  const components = createComponents({ palette });
  const shadows = createShadows();

  return {
    components,
    palette,
    shadows,
  };
};
