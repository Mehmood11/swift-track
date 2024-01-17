import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Hidden,
  Toolbar,
  SvgIcon,
  Grid,
  useTheme,
  Popover,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { authActions } from "@/slices";
import { useDispatch } from "@/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header({ onMobileNavOpen }: any): JSX.Element {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
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
      elevation={1}
      sx={{
        maxWidth: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <Toolbar sx={{ color: "#8B8B8B", p: 2 }}>
        <Grid
          container
          alignItems={"center"}
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"nowrap"}
        >
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
              ml: { xl: "40px", lg: "40px", md: "40px" },
              mr: { xl: "20px", lg: "20px", md: "20px" },
              display: "flex",
              justifyContent: { xs: "flex-end", sm: "space-between" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "flex-start",
                alignItems: "flex-start",
                ml: { xl: "33px" },
              }}
            >
              <input
                type="text"
                placeholder="search"
                id="search"
                style={{
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              />
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
                minHeight: "40px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                }}
              >
                <NotificationsIcon />
              </Box>
              {open && (
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <List>
                    <Link href="/profile">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary="My Profile" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <ListItem
                      disablePadding
                      onClick={async () => {
                        try {
                          dispatch(authActions.logout());
                          router.push("/login");
                        } catch (error: any) {
                          toast.error(error?.data?.message ?? "error occured");
                        }
                      }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              )}
              <Button aria-describedby={id} onClick={handleClick} sx={{ p: 0 }}>
                <PersonIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
