import React, { useCallback, useEffect } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Hidden,
  Toolbar,
  SvgIcon,
  Grid,
  keyframes,
  Typography,
  Breadcrumbs,
  useTheme,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname, useRouter } from "next/navigation";

export function Header({ onMobileNavOpen }: any): JSX.Element {
  const theme = useTheme();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar
      elevation={0}
      sx={{
        maxWidth: "100%",
        backgroundColor: "transparent",
      }}
    >
      <Toolbar sx={{ color: "#8B8B8B", p: 2 }}>
        <Grid container alignItems={"center"}>
          <Grid item xs={0} sm={0} md={3} lg={2} xl={1.5} mr="10px">
            <Hidden mdUp>
              <IconButton color="inherit" onClick={onMobileNavOpen}>
                <SvgIcon fontSize="small">
                  <MenuIcon />
                </SvgIcon>
              </IconButton>
            </Hidden>
          </Grid>
          <Grid
            item
            container
            xs={10}
            sm={11}
            md={12}
            lg={12}
            sx={{
              ml: { xl: "210px", lg: "210px", md: "210px" },
              mr: { xl: "20px", lg: "20px", md: "20px" },
              display: "flex",
              justifyContent: { xs: "flex-end", sm: "space-between" },
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  pl: 3,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "primary.dark", textTransform: "capitalize" }}
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
            </Box>
            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : theme.palette.background.paper,
                // boxShadow: (theme) => theme.customShadows.primary,
                boxShadow: "0px 0px 10px 6px rgba(112, 144, 176, 0.08)",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                py: 0,
              }}
            >
              <Box sx={{ position: "relative", display: "flex" }}>
                {/* <Image
                  src={NotificationsIcon.src}
                  alt="Profile Image"
                  height={18}
                  width={18}
                  //   onClick={() => setNotification(true)}
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                /> */}
                <NotificationsIcon />
                {/* {
                  <Box
                    sx={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "10px",
                      animation: `${blinker} 2s linear infinite`,
                      backgroundColor: "red",
                      marginRight: "5px",
                      position: "absolute",
                      top: -6,
                      right: 2,
                    }}
                  ></Box>
                } */}
              </Box>
              <Box onClick={handleClick}>
                <PersonIcon />
              </Box>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  The content of the Popover.
                </Typography>
              </Popover>
              {/* <Image
                src={<PersonIcon />}
                alt="Profile Image"
                height={30}
                width={30}
                style={{
                  marginLeft: "6px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                // onClick={() => setAccountDetails(true)} */}
              {/* /> */}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
