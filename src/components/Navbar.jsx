// Navbar.jsx
import * as React from "react";
import { Link } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { LocalLibrary } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;
const drawerWidthSmall = 140;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isSmallScreen", // Ensure isSmallScreen is not forwarded
})(({ theme, open, isSmallScreen }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${isSmallScreen ? drawerWidthSmall : drawerWidth}px)`,
    marginLeft: `${isSmallScreen ? drawerWidthSmall : drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = ({
  open,
  handleDrawerOpen,
  searchInput,
  handleSearchInputChange,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
    { text: "Login", path: "/login" },
    { text: "Products", path: "/products" },
  ];

  return (
    <AppBar position="fixed" open={open} isSmallScreen={isSmallScreen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <LocalLibrary />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Logo
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "auto" }}>
          {navItems.map((item, id) => (
            <Button key={id} color="inherit" component={Link} to={item.path}>
              {item.text}
            </Button>
          ))}
        </Box>
        <Box sx={{ marginLeft: "auto", width: "12.5rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: alpha("#ffffff", 0.15),
              borderRadius: 4,
              padding: "2px 4px",
            }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchInput}
              onChange={handleSearchInputChange}
              sx={{ ml: 1, width: "12.5rem", color: "inherit" }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
