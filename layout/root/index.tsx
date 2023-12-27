"use client";

//types
import type { ReactNode } from "react";
import type { Theme } from "@mui/material/styles";

// next
import Head from "next/head";

// @mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//Others
import Cookies from "js-cookie";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import { Settings } from "@/components/types/settings";
import { SettingsConsumer, SettingsProvider } from "@/contexts";
import { createTheme } from "@/theme";
import { SettingsButton } from "@/components/settings/settings-button";
import { SettingsDrawer } from "@/components/settings/settings-drawer";
const SETTINGS_STORAGE_KEY = "app.settings";

const resetSettings = (): void => {
  try {
    Cookies.remove(SETTINGS_STORAGE_KEY);
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

const updateSettings = (settings: Settings): void => {
  try {
    Cookies.set(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

interface LayoutProps {
  children: ReactNode;
  settings?: Settings;
}

export function Layout(props: LayoutProps): JSX.Element {
  const { children, settings } = props;

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <SettingsProvider
        onReset={resetSettings}
        onUpdate={updateSettings}
        settings={settings}
      >
        <SettingsConsumer>
          {(themeSettings) => {
            const theme: Theme = createTheme({
              direction: themeSettings.direction,
              responsiveFontSizes: themeSettings.responsiveFontSizes,
              colorPreset: themeSettings.colorPreset,
              contrast: themeSettings.contrast,
              paletteMode: themeSettings.paletteMode,
            });
            return (
              <ThemeProvider theme={theme}>
                <Head>
                  <meta
                    name="color-scheme"
                    content={themeSettings.paletteMode}
                  />
                  <meta
                    name="theme-color"
                    content={theme.palette.neutral[900]}
                  />
                </Head>
                <CssBaseline />

                {children}
                <SettingsButton onClick={themeSettings.handleDrawerOpen} />
                <SettingsDrawer
                  canReset={themeSettings.isCustom}
                  onClose={themeSettings.handleDrawerClose}
                  onReset={themeSettings.handleReset}
                  onUpdate={themeSettings.handleUpdate}
                  open={themeSettings.openDrawer}
                  values={{
                    direction: themeSettings.direction,
                    responsiveFontSizes: themeSettings.responsiveFontSizes,
                    stretch: themeSettings.stretch,
                    layout: themeSettings.layout,
                    colorPreset: themeSettings.colorPreset,
                    contrast: themeSettings.contrast,
                    paletteMode: themeSettings.paletteMode,
                    navColor: themeSettings.navColor,
                  }}
                />
              </ThemeProvider>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
