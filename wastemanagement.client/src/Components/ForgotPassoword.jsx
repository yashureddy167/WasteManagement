import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, Box, LinearProgress, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordColor, setPasswordColor] = useState("error");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [resendEnabled, setResendEnabled] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setResendEnabled(true);
    }
  }, [step, timer]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
    } else {
      setError("");
      // Make API call to verify email
      try {
        const response = await fetch(
          `https://wastemanagementservice.azurewebsites.net/api/User/verify-user-email?email=${email}`
        );
        const data = await response.json();
        if (data.isSuccess) {
          // Generate OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          setGeneratedOtp(otp);
          // Make API call to send OTP
          const otpResponse = await fetch(
            `https://wastemanagementservice.azurewebsites.net/api/Email/send-otp-via-email-to-reset-password?email=${email}&otp=${otp}`
          );
          const otpData = await otpResponse.json();
          if (otpData.isSuccess) {
            setStep(2);
            setTimer(300); // Reset timer to 5 minutes
            setResendEnabled(false);
          } else {
            setError(otpData.message || "Failed to send OTP");
          }
        } else {
          setError(data.message || "Email not found");
        }
      } catch (error) {
        setError("An error occurred while verifying your email");
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      setError("OTP does not match");
    } else {
      setError("");
      setStep(3);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength(30);
      setPasswordColor("error");
    } else if (password.length < 10) {
      setPasswordStrength(60);
      setPasswordColor("warning");
    } else {
      setPasswordStrength(100);
      setPasswordColor("success");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Make API call to reset password
      try {
        const payload = { email, password };
        console.log("Sending payload:", payload);
        const response = await fetch(
          "https://wastemanagementservice.azurewebsites.net/api/Authentication/forgot-password",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        console.log("API response:", data);
        setApiResponse(data);
        setModalOpen(true);
      } catch (error) {
        console.error("Error during API call:", error);
        setError("An error occurred while resetting your password");
      }
    }
  };

  const handleResendOtp = async () => {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    // Make API call to send OTP
    await fetch(
      `https://wastemanagementservice.azurewebsites.net/api/User/send-otp-via-email-to-reset-password?email=${email}&otp=${otp}`,
      {
        method: "GET",
      }
    );
    setTimer(300); // Reset timer to 5 minutes
    setResendEnabled(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (apiResponse?.isSuccess) {
      navigate("/signin");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "white", // Add background color
      }}
    >
      {step === 1 && (
        <>
          <h2>Verify Email</h2>
          <form onSubmit={handleEmailSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Verify Email
            </Button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Enter OTP</h2>
          <form onSubmit={handleOtpSubmit}>
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Verify OTP
            </Button>
            {resendEnabled && (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleResendOtp}
                sx={{ mt: 2 }}
              >
                Resend OTP
              </Button>
            )}
            {!resendEnabled && (
              <p>
                OTP is valid for {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes
              </p>
            )}
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <h2>Reset Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                color={passwordColor}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <DialogContent sx={{ textAlign: "center" }}>
            {apiResponse?.isSuccess ? (
              <Avatar
                sx={{
                  bgcolor: "green",
                  width: 56,
                  height: 56,
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircleIcon />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: "red",
                  width: 56,
                  height: 56,
                  margin: "0 auto 16px",
                }}
              >
                <ErrorIcon />
              </Avatar>
            )}
            <DialogContentText>{apiResponse?.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              {apiResponse?.isSuccess ? "Go to Login" : "Close"}
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </Box>
  );
}
