import {
  Settings,
  SettingsContextType,
  State,
} from "@/components/types/settings";
import { createContext } from "react";

export const defaultSettings: Settings = {
  responsiveFontSizes: false,
  colorPreset: "purple",
  contrast: "normal",
  paletteMode: "light",
  disableButtonsOnLoginAs: false,
};

export const initialState: State = {
  isInitialized: false,
  openDrawer: false,
};

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  ...initialState,
  handleDrawerClose: () => {},
  handleDrawerOpen: () => {},
  handleReset: () => {},
  handleUpdate: () => {},
  isCustom: false,
});
