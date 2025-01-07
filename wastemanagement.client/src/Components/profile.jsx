import React, { useState, useContext, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { UserContext } from "../Contexts/UserContext";

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext); // Access user data from context

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [name, setName] = useState(userData.data.name);
  const [dob, setDob] = useState(formatDate(userData.data.dateOfBirth));
  const [gender, setGender] = useState(userData.data.gender);
  const [email, setEmail] = useState(userData.data.email);
  const [mobile, setMobile] = useState(userData.data.mobileNumber);
  const [editField, setEditField] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ status: "", message: "" });

  useEffect(() => {
    setIsEdited(
      name !== userData.data.name ||
        dob !== formatDate(userData.data.dateOfBirth) ||
        gender !== userData.data.gender ||
        email !== userData.data.email ||
        mobile !== userData.data.mobile
    );
  }, [name, dob, gender, email, mobile, userData]);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "https://wastemanagementservice.azurewebsites.net/api/User/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            dob,
            gender,
            email,
            mobile,
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
        setEditField(null); // Disable all fields after successful update
        setUserData({
          ...userData,
          data: {
            ...userData.data,
            name: name,
            dateOfBirth: dob,
            gender: gender,
            email,
            mobile: mobile,
          },
        });
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
        message: "Error updating profile",
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
        Profile
      </Typography>
      <form>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            disabled={editField !== "name"}
            required
          />
          <IconButton onClick={() => handleEditClick("name")}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            fullWidth
            disabled={editField !== "dob"}
            InputLabelProps={{ shrink: true }}
            required
          />
          <IconButton onClick={() => handleEditClick("dob")}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Gender"
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            disabled={editField !== "gender"}
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <IconButton onClick={() => handleEditClick("gender")}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            disabled
            required
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            fullWidth
            disabled={editField !== "mobile"}
            required
          />
          <IconButton onClick={() => handleEditClick("mobile")}>
            <EditIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ marginTop: 2 }}
          disabled={!isEdited}
        >
          Update
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

export default Profile;
