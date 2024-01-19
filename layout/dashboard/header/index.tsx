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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import { authActions } from "@/slices";
import { useDispatch } from "@/store";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@/assets/user-button";

export function Header({ onMobileNavOpen }: any): JSX.Element {
  const theme = useTheme();
  const pathname = usePathname();
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
      elevation={0}
      sx={{
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
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
              mr: { xl: "10px", lg: "10px", md: "10px" },
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
            </Box>
            <Box
              sx={{
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 0,
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
                <NotificationsIcon sx={{ mr: 1.4, mt: 0.7 }} />
                <UserButton onClick={handleClick} />
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
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
