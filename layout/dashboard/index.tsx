import type { ReactNode } from "react";
import React, { useState } from "react";
import { Box, Breadcrumbs, Stack, Typography, useTheme } from "@mui/material";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const theme = useTheme();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Header onMobileNavOpen={() => setMobileNavOpen(true)} />

        <Sidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            overflow: "hidden",
            paddingTop: 5,
            marginTop: 6,
            [theme.breakpoints.up("md")]: {
              paddingLeft: 25,
              paddingRight: 2,
            },
          }}
        >
          <Box sx={{ display: "flex", flex: "1 1 auto", overflow: "hidden" }}>
            <Box
              sx={{
                flex: "1 1 auto",
                height: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                [theme.breakpoints.down("md")]: {
                  paddingRight: 2,
                  paddingLeft: 2,
                },
                [theme.breakpoints.down("sm")]: {
                  height: "auto",
                  paddingRight: 2,
                  paddingLeft: 2,
                },
              }}
            >
              <Box
                sx={{
                  overflowY: "auto",
                  padding: "10px",
                  "&::-webkit-scrollbar": { width: "7px", cursor: "pointer" },
                  "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 5px grey",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "primary.main",
                    borderRadius: "10px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    height: "auto",
                  },
                }}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default DashboardLayout;
