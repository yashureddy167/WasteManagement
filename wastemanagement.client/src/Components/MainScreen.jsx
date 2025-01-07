import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const steps = [
  "In the first step, an intelligent object detection system identifies the waste being discarded. Once the object is detected, the dustbin automatically opens, allowing users to dispose of waste conveniently.",
  "The second step involves waste segregation, where IoT-based sensors are employed to differentiate accurate sorting by analyzing the waste's dry and wet properties, enabling metal separation also.",
  "Finally, the third step incorporates a reward system to encourage proper disposal habits. After depositing waste into the smart dustbin, users can scan a QR code displayed on the dustbin. By scanning the QR code through a mobile, users receive redeemable tokens directly to their accounts.",
];

const MainScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
      >
        Effective waste management is critical in mitigating the environmental
        issues caused by improper disposal. This project aims to address this
        challenge through an automated system designed for waste segregation.
      </Typography>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 2,
          marginTop: 2,
          width: "80%",
          maxWidth: 600,
          position: "relative",
          backgroundColor: "white", // Add background color
        }}
      >
        <Typography variant="body1">{steps[currentStep]}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
            position: "relative",
          }}
        >
          <IconButton
            onClick={handlePrevStep}
            sx={{ position: "absolute", left: 0 }}
          >
            <ArrowBackIcon />
          </IconButton>
          {steps.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  currentStep === index ? "primary.main" : "text.secondary",
                margin: "0 4px",
              }}
            />
          ))}
          <IconButton
            onClick={handleNextStep}
            sx={{ position: "absolute", right: 0 }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MainScreen;
