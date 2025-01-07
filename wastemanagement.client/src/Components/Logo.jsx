// Components/Logo.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const LogoText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  fontSize: "2rem",
  fontFamily: "'Roboto', sans-serif",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  letterSpacing: "0.1rem",
  whiteSpace: "nowrap", // Ensure text is in a single line
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem", // Smaller font size for small screens
  },
}));

const Logo = () => {
  return (
    <LogoContainer>
      <LogoText variant="h6" component="div">
        PRØJĒÇT - V
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
