import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from "@mui/material";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ErrorIcon from "@mui/icons-material/Error";
import { UserContext } from "../Contexts/UserContext";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ status: "", message: "" });
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const { totalCoins, setTotalCoins, userData } = useContext(UserContext);

  useEffect(() => {
    if (showScanner) {
      console.log("Starting QR scanner...");
      codeReader.current.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            console.log("QR Code detected:", result.text);
            const phoneNumber = parseInt(result.text.replace(/\D/g, ""), 10);
            setScanResult((prev) => prev + phoneNumber);
            setShowScanner(false);
            codeReader.current.reset();
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error("QR Scanner Error:", err);
          }
        }
      );
    }
  }, [showScanner]);

  const handleScanButtonClick = () => {
    setShowScanner(true);
  };

  const handleCancelScan = () => {
    setShowScanner(false);
    codeReader.current.reset();
  };

  const handleDeposit = async () => {
    try {
      const response = await fetch(
        "https://wastemanagementservice.azurewebsites.net/api/User/deposit-coins",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.data.email,
            coins: scanResult,
          }),
        }
      );
      const data = await response.json();
      if (data.isSuccess) {
        setTotalCoins(totalCoins + scanResult);
        setScanResult(0);
        setModalMessage({ status: "success", message: data.message });
      } else {
        setModalMessage({ status: "failed", message: data.message });
      }
      setModalOpen(true);
    } catch (error) {
      console.error("Error depositing coins:", error);
      setModalMessage({
        status: "failed",
        message: "An error occurred while depositing coins.",
      });
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
        mt: 2,
        backgroundColor: "white", // Add background color
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        QR Scanner
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleScanButtonClick}
        sx={{ mt: 2 }}
      >
        Scan QR
      </Button>
      {showScanner && (
        <>
          <Box component="video" ref={videoRef} sx={{ width: "100%", mt: 2 }} />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelScan}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </>
      )}
      <TextField
        label="Coins Earned"
        variant="outlined"
        fullWidth
        margin="normal"
        value={scanResult}
        disabled
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeposit}
        sx={{ mt: 2 }}
      >
        Deposit Coins
      </Button>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogContent sx={{ textAlign: "center" }}>
          {modalMessage.status === "success" ? (
            <Avatar
              sx={{
                bgcolor: "green",
                width: 56,
                height: 56,
                margin: "0 auto 16px",
              }}
            >
              <EmojiEventsIcon />
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
          <DialogContentText>{modalMessage.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QRScanner;
