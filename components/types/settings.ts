import { ColorPreset, Contrast, PaletteMode } from "./theme";

export type Layout = "horizontal" | "vertical";

export type NavColor = "blend-in" | "discrete" | "evident";

export interface Settings {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
  paletteMode?: PaletteMode;
  responsiveFontSizes?: boolean;
  disableButtonsOnLoginAs?: boolean;
}

export interface State extends Settings {
  openDrawer: boolean;
  isInitialized: boolean;
}

export interface SettingsContextType extends State {
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  handleReset: () => void;
  handleUpdate: (settings: Settings) => void;
  isCustom: boolean;
}
