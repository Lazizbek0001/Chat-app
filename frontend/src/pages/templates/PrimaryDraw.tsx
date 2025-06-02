import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import DrawerToggle from "../../components/PrimaryDraw/DrawToggle";
import MuiDrawer from "@mui/material/Drawer";

const PrimaryDraw = () => {
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width:599px)");
  const [open, setOpen] = useState(!below600);

  useEffect(() => {
    setOpen(!below600);
  }, [below600]);

  const openedMixin = () => ({
    width: theme.primaryDraw.width,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    width: theme.primaryDraw.closed,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open
      ? {
          ...openedMixin(),
          "& .MuiDrawer-paper": openedMixin(),
        }
      : {
          ...closedMixin(),
          "& .MuiDrawer-paper": closedMixin(),
        }),
  }));

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%",
          }}
        >
          <DrawerToggle
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
        </Box>
        {[...Array(50)].map((_, index) => (
          <Typography key={index} paragraph>
            {index + 1}
          </Typography>
        ))}
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
