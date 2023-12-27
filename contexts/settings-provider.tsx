import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import { isEqual } from "lodash";
import {
  defaultSettings,
  initialState,
  SettingsContext,
} from "./settings-context";
import { Settings, State } from "@/components/types/settings";

interface SettingsProviderProps {
  children?: ReactNode;
  onReset?: () => void;
  onUpdate?: (settings: Settings) => void;
  settings?: Settings;
}

export function SettingsProvider(props: SettingsProviderProps): JSX.Element {
  const {
    children,
    onReset = () => {},
    onUpdate = () => {},
    settings: initialSettings,
  } = props;
  const [state, setState] = useState<State>(initialState);
  const [settings, setSettings] = useState<Settings>(() => {
    return {
      ...defaultSettings,
      ...initialSettings,
    } as Settings;
  });

  const handleUpdate = useCallback(
    (newSettings: Settings): void => {
      onUpdate({
        direction: settings.direction,
        layout: settings.layout,
        responsiveFontSizes: settings.responsiveFontSizes,
        colorPreset: settings.colorPreset,
        contrast: settings.contrast,
        navColor: settings.navColor,
        paletteMode: settings.paletteMode,
        stretch: settings.stretch,
        disableButtonsOnLoginAs: settings.disableButtonsOnLoginAs,
        ...newSettings,
      });

      setSettings((prevState) => ({
        ...prevState,
        ...newSettings,
      }));
    },
    [onUpdate, settings]
  );

  const handleReset = useCallback((): void => {
    onReset();
    setSettings({ ...defaultSettings, ...initialSettings });
  }, [initialSettings, onReset]);

  const handleDrawerOpen = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openDrawer: true,
    }));
  }, []);

  const handleDrawerClose = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openDrawer: false,
    }));
  }, []);

  const isCustom = useMemo(() => {
    return !isEqual(defaultSettings, {
      direction: settings.direction,
      layout: settings.layout,
      responsiveFontSizes: settings.responsiveFontSizes,
      stretch: settings.stretch,
      colorPreset: settings.colorPreset,
      contrast: settings.contrast,
      navColor: settings.navColor,
      paletteMode: settings.paletteMode,
    });
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        ...state,
        handleDrawerClose,
        handleDrawerOpen,
        handleReset,
        handleUpdate,
        isCustom,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
