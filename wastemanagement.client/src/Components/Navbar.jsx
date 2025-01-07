// Components/Navbar.jsx
import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // Import the coin icon
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { UserContext } from "../Contexts/UserContext";
import Logo from "./Logo"; // Import the new Logo component

const StyledTypography = styled(Typography)({
  color: "white",
  fontWeight: "bold",
  fontSize: "2rem",
  fontFamily: "'Roboto', sans-serif",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  letterSpacing: "0.1rem",
});

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, totalCoins } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    navigate("/main-screen"); // Navigate to the main screen
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleChangePasswordClick = () => {
    navigate("/change-password");
  };

  const handleLogoutClick = () => {
    navigate("/signin");
  };

  const handleQrScannerClick = () => {
    navigate("/qr-scanner-screen");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "green",
          padding: { xs: "0 8px", sm: "0 16px" },
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 64 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap", // Ensure items do not wrap
            overflow: "hidden", // Prevent overflow
          }}
        >
          <IconButton color="inherit" onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              marginLeft: { xs: 1, sm: 2 },
              marginRight: { xs: 1, sm: 2 },
              overflow: "hidden", // Prevent overflow
            }}
          >
            <Logo sx={{ width: { xs: 30, sm: 60, md: 100 } }} />{" "}
            {/* Further reduced logo width */}
          </Box>
          <IconButton color="inherit" onClick={handleQrScannerClick}>
            <QrCodeScannerIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 2,
              whiteSpace: "nowrap",
              fontSize: { xs: "0.75rem", sm: "1rem" },
              overflow: "hidden", // Prevent overflow
              textOverflow: "ellipsis", // Add ellipsis for overflow text
            }}
          >
            <MonetizationOnIcon
              sx={{ marginRight: 0.5, fontSize: { xs: "1rem", sm: "1.5rem" } }}
            />{" "}
            {/* Smaller coin icon */}
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
            >
              {totalCoins}
            </Typography>
          </Box>
          <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <Avatar
              sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 } }}
            >
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleChangePasswordClick}>
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
