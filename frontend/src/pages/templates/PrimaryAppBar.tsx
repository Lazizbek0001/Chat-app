import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const PrimaryAppBar = () => {
  const [sideMenu, setSideMenu] = React.useState(false);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen])
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setSideMenu(open);
    };

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar?.height,
          minHeight: theme.primaryAppBar?.height,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <IconButton
        color="default"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
        >
        <MenuIcon sx={{ color: "black" }} />
        </IconButton>

        </Box>

        <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ width: 250, padding: 2 }}
          >
            {[...Array(100)].map((_, index) => (
              <Typography key={index} paragraph>
                {index + 1}
              </Typography>
            ))}
          </Box>
        </Drawer>

        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h3"
            color="black"
            noWrap
            component="div"
            sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}
          >
            Djchat
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
