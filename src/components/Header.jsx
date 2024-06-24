import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//this is drawer Width
const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Header = ({ children }) => {
  const theme = useTheme();
  //mobile screen view
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
      />
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        isSmallScreen={isSmallScreen}
      />
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default Header;
