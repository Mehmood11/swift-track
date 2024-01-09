import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/layout/root";
import { Settings } from "@/components/types/settings";
import { cookies } from "next/headers";
import { NProgress } from "@/components/nprogress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Track",
  description: "Generated by create next app",
};

const SETTINGS_STORAGE_KEY = "app.settings";

const restoreSettings = (): Settings | undefined => {
  const cookieList = cookies();

  let value: Settings | undefined;

  if (cookieList.has(SETTINGS_STORAGE_KEY)) {
    try {
      const restored = cookieList.get(SETTINGS_STORAGE_KEY);

      if (restored) {
        value = JSON.parse(restored.value) as Settings | undefined;
      }
    } catch (err) {
      console.error(err);
      // If stored data is not a stringified JSON this will fail,
      // that's why we catch the error
    }
  }

  return value;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = restoreSettings();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout settings={settings}>
          {children}
          <NProgress />
        </Layout>
      </body>
    </html>
  );
}
