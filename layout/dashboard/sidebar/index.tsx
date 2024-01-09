import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  Typography,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dashboard, Notifications } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import { useDispatch, useSelector } from "@/store";
import { authActions } from "@/slices";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { makeStyles } from "@mui/styles";

const sidebarLinks = [
  {
    id: 1,
    title: "Dashboard",
    value: "Dashboard",
    icon: <Dashboard />,
    href: "/dashboard",
  },
  {
    id: 2,
    title: "Clients",
    value: "Clients",
    icon: <SupervisorAccountIcon />,
    href: "/clients",
  },
  {
    id: 3,
    title: "Orders",
    value: "Orders",
    icon: <Dashboard />,
    href: "/orders",
  },
  {
    id: 4,
    title: "Driver",
    value: "Driver",
    icon: <Dashboard />,
    href: "/driver",
  },
  {
    id: 5,
    title: "Reports",
    value: "Reports",
    icon: <BarChartIcon />,
    href: "/reports",
  },

  {
    id: 6,
    title: "Notifications",
    value: "Notification",
    icon: <Notifications />,
    href: "/notifications",
  },
];

const useStyles = makeStyles((theme: any) => ({
  mobileDrawer: {
    width: 330,
    // backgroundColor: theme.palette.primary.main,
  },
  desktopDrawer: {
    top: 0,
    width: 330,
    height: "100%",
    // backgroundColor: theme.palette.primary.main,
    // height: 'calc(100% - 64px)',
  },
}));

export const Sidebar = ({ openMobile, onMobileClose }: any): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();

  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      dispatch(authActions.logout());
      router.push("/login");
    } catch (error) {
      toast.error(error?.message ?? "error occured");
    }
  };

  const content = (
    <Box
      height="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box p={2} display="flex" justifyContent="center">
        <Link href="/dashboard">
          <Box
            sx={{
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {/* <Image src={SidebarLogo} alt="Indentity Gram" /> */}
            Swift Track
          </Box>
        </Link>
      </Box>
      <Box
        p={"0px  24px 5px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          justifyContent: "flex-start",
        }}
      >
        {sidebarLinks.map((config: any) => (
          <Box
            key={config.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor:
                pathname == config.href ||
                pathname?.includes(config?.value.toLocaleLowerCase())
                  ? "primary.main"
                  : "",
            }}
          >
            <Link
              style={{
                color:
                  theme.palette.mode === "dark"
                    ? "white"
                    : theme.palette.neutral[800],
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                padding: "0px 18px",
              }}
              passHref
              href={config.href}
            >
              {config.icon}
              <Typography sx={{ pl: 1 }}>{config.title}</Typography>
            </Link>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          mb: 5,
          // width: "80%",
          color: "white",
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "6px",
          fontFamily: "Poppins",
          backgroundColor: "primary.main",
        }}
      >
        <Button
          startIcon={<LogoutIcon />}
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          sx={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};
