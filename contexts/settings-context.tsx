import {
  Settings,
  SettingsContextType,
  State,
} from "@/components/types/settings";
import { createContext } from "react";

export const defaultSettings: Settings = {
  direction: "ltr",
  layout: "vertical",
  responsiveFontSizes: false,
  colorPreset: "purple",
  contrast: "normal",
  navColor: "evident",
  paletteMode: "light",
  stretch: false,
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
