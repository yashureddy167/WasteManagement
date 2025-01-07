import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { UserContext } from "../Contexts/UserContext";

const Redeem = () => {
  const [vouchers, setVouchers] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ status: "", message: "" });
  const { totalCoins, setTotalCoins, userData } = useContext(UserContext);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(
          "https://wastemanagementservice.azurewebsites.net/api/Voucher/GetAllVouchers"
        );
        const result = await response.json();
        setVouchers(result.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleRedeem = async (id, voucherCost) => {
    if (totalCoins < voucherCost) {
      setModalMessage({ status: "failed", message: "Not enough coins" });
      setOpen(true);
    } else {
      try {
        const response = await fetch(
          `https://wastemanagementservice.azurewebsites.net/api/Voucher/SendVoucherToUserByEmail-DeductCoins`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              voucherId: id,
              email: userData.data.email, // Get email from user data context
              coins: voucherCost,
            }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          setTotalCoins(totalCoins - voucherCost);
          setModalMessage({
            status: "success",
            message:
              "Voucher redeemed successfully and voucher code sent to your email",
          });
          setOpen(true);
        } else {
          setModalMessage({
            status: "failed",
            message: result.message || "Error redeeming voucher",
          });
          setOpen(true);
        }
      } catch (error) {
        console.error("Error redeeming voucher:", error);
        setModalMessage({
          status: "failed",
          message: "Error redeeming voucher",
        });
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Redeem Vouchers
      </Typography>
      <Grid container spacing={2}>
        {vouchers.map((voucher) => (
          <Grid item xs={12} sm={4} md={3} key={voucher.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={voucher.image}
                alt={voucher.companyName}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {voucher.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {voucher.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cost: {voucher.voucherCost} Coins
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRedeem(voucher.id, voucher.voucherCost)}
                  sx={{ mt: 2 }}
                >
                  Redeem
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
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
          <DialogContentText>{modalMessage.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Redeem;
