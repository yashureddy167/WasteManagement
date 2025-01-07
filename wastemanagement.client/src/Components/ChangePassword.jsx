import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { UserContext } from "../Contexts/UserContext";

const ChangePassword = () => {
  const { userData } = useContext(UserContext); // Access user data from context
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ status: "", message: "" });

  const handleChangePassword = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password fields do not match");
      return;
    }

    if (oldPassword === newPassword) {
      setErrorMessage("New password can't be the same as the old password");
      return;
    }

    try {
      const response = await fetch(
        "https://wastemanagementservice.azurewebsites.net/api/Authentication/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.data.email,
            oldPassword: oldPassword,
            newPassword: confirmPassword,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setModalMessage({
          status: "success",
          message: result.message,
        });
        setOpen(true);
      } else {
        setModalMessage({
          status: "failed",
          message: result.message,
        });
        setOpen(true);
      }
    } catch (error) {
      setModalMessage({
        status: "failed",
        message: "Error changing password",
      });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleChangePassword}>
        <TextField
          label="Old Password"
          type={showOldPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Change Password
        </Button>
      </form>
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

export default ChangePassword;
