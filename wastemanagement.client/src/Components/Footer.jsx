// Components/Footer.jsx
import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem"; // Import the Redeem icon
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRedeemClick = () => {
    navigate("/redeem"); // Navigate to the redeem page
  };

  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "green" }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            color="inherit"
            startIcon={<RedeemIcon />}
            onClick={handleRedeemClick}
          >
            Redeem
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
