"use client";

//types
import type { ReactNode } from "react";
import type { Theme } from "@mui/material/styles";

// next
import Head from "next/head";

// @mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

//Others
import Cookies from "js-cookie";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import { Settings } from "@/components/types/settings";
import { SettingsConsumer, SettingsProvider } from "@/contexts";
import { createTheme } from "@/theme";
import { SettingsButton } from "@/components/settings/settings-button";
import { SettingsDrawer } from "@/components/settings/settings-drawer";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthInitializer } from "@/hoc/with-auth-initializer";
import { Toaster } from "@/components/toast";

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

const persistor = persistStore(store);

export function Layout(props: LayoutProps): JSX.Element {
  const { children, settings } = props;

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SettingsProvider
              onReset={resetSettings}
              onUpdate={updateSettings}
              settings={settings}
            >
              <SettingsConsumer>
                {(themeSettings) => {
                  const theme: Theme = createTheme({
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
                      <AuthInitializer handleTheme={themeSettings.handleUpdate}>
                        {children}
                        <SettingsDrawer
                          canReset={themeSettings.isCustom}
                          onClose={themeSettings.handleDrawerClose}
                          onReset={themeSettings.handleReset}
                          onUpdate={themeSettings.handleUpdate}
                          open={themeSettings.openDrawer}
                          values={{
                            responsiveFontSizes:
                              themeSettings.responsiveFontSizes,
                            colorPreset: themeSettings.colorPreset,
                            contrast: themeSettings.contrast,
                            paletteMode: themeSettings.paletteMode,
                          }}
                        />
                      </AuthInitializer>
                      <Toaster />
                    </ThemeProvider>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
