import type { ReactNode } from "react";
import React, { useState } from "react";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { makeStyles } from "@mui/styles";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    // backgroundColor: "white",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 30,
    marginTop: 50,
    [theme.breakpoints.up("md")]: {
      paddingLeft: 256,
      paddingRight: 25,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    "&::-webkit-scrollbar": { display: "none" },
    [theme.breakpoints.down("md")]: {
      paddingRight: 25,
      paddingLeft: 25,
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      paddingRight: 5,
      paddingLeft: 5,
    },
  },
  mainArea: {
    height: "84vh",
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
  },
}));

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const classes = useStyles();
  const pathname = usePathname();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <div className={classes.root}>
        <Header onMobileNavOpen={() => setMobileNavOpen(true)} />

        <Sidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <div className={classes.mainArea}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "primary.main", textTransform: "capitalize" }}
                  >
                    {pathname.slice(1)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      listStyle: "none",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      separator={<ChevronRightIcon />}
                    >
                      <Link
                        href={"/dashboard"}
                        passHref
                        style={{
                          textDecoration: "none",
                          marginRight: 4,
                          color: "primary.main",
                        }}
                      >
                        Swift Track
                      </Link>

                      <Typography sx={{ textTransform: "capitalize" }}>
                        {pathname.slice(1)}
                      </Typography>
                    </Breadcrumbs>
                  </Box>
                </Box>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default DashboardLayout;
