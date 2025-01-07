// Components/SimpleNavbar.jsx
import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "./Logo"; // Import the new Logo component

const SimpleNavbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "green" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Logo sx={{ width: { xs: 100, sm: 150, md: 200 } }} />{" "}
          {/* Make logo responsive */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleNavbar;
