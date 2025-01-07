import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Backdrop, // Import Backdrop
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBackIcon
import LogoutIcon from "@mui/icons-material/Logout"; // Import LogoutIcon
import AddIcon from "@mui/icons-material/Add"; // Import AddIcon
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon
import HomeIcon from "@mui/icons-material/Home"; // Import HomeIcon
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext"; // Import UserContext

const AdminNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(""); // Add state for selected item
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(UserContext); // Access setUserData from context

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    setSelectedItem(path); // Set the selected item
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    setIsAdmin(false); // Reset user data
    navigate("/signin"); // Navigate to sign-in screen
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "green",
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        variant="persistent"
      >
        <Toolbar sx={{ paddingLeft: 2, marginTop: 8 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(false)}
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
        <List>
          <ListItem
            button
            onClick={() => handleNavigation("/main-screen")}
            selected={selectedItem === "/main-screen"} // Highlight if selected
            sx={{
              backgroundColor:
                selectedItem === "/main-screen"
                  ? (theme) => theme.palette.primary.main
                  : "inherit",
              color: selectedItem === "/main-screen" ? "white" : "inherit",
              "&:hover": {
                backgroundColor: (theme) =>
                  selectedItem === "/main-screen"
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
                color: "black",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation("/add-voucher")}
            selected={selectedItem === "/add-voucher"} // Highlight if selected
            sx={{
              backgroundColor:
                selectedItem === "/add-voucher"
                  ? (theme) => theme.palette.primary.main
                  : "inherit",
              color: selectedItem === "/add-voucher" ? "white" : "inherit",
              "&:hover": {
                backgroundColor: (theme) =>
                  selectedItem === "/add-voucher"
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
                color: "black",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Voucher" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation("/upadate-Delete-vouchers")}
            selected={selectedItem === "/upadate-Delete-vouchers"} // Highlight if selected
            sx={{
              backgroundColor:
                selectedItem === "/upadate-Delete-vouchers"
                  ? (theme) => theme.palette.primary.main
                  : "inherit",
              color:
                selectedItem === "/upadate-Delete-vouchers"
                  ? "white"
                  : "inherit",
              "&:hover": {
                backgroundColor: (theme) =>
                  selectedItem === "/upadate-Delete-vouchers"
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
                color: "black",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Update/Delete Voucher" />
          </ListItem>
        </List>
      </Drawer>
      <Backdrop
        open={drawerOpen}
        onClick={toggleDrawer(false)}
        sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
      />
    </>
  );
};

export default AdminNavbar;
