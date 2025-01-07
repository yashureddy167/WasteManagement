import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const AddVoucher = () => {
  const [companyName, setCompanyName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [description, setDescription] = useState("");
  const [voucherCost, setVoucherCost] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ status: "", message: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !imageBase64 || !description || !voucherCost) {
      alert("Please fill in all fields.");
      return;
    }

    const voucherData = {
      CompanyId: 0,
      CompanyName: companyName,
      Image: imageBase64,
      Description: description,
      VoucherCost: voucherCost,
    };

    try {
      const response = await fetch(
        "https://wastemanagementservice.azurewebsites.net/api/Voucher/AddVoucher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(voucherData),
        }
      );

      if (response.ok) {
        // Handle successful response
        setModalMessage({
          status: "success",
          message: `${companyName} Voucher added successfully`,
        });
        setOpen(true); // Open the modal
        // Reset form data
        setCompanyName("");
        setImageBase64("");
        setDescription("");
        setVoucherCost("");
        setFileName("");
      } else {
        // Handle error response
        const result = await response.json();
        setModalMessage({
          status: "failed",
          message: result.message || "Error adding voucher",
        });
        setOpen(true); // Open the modal
      }
    } catch (error) {
      console.error("Error adding voucher:", error);
      setModalMessage({
        status: "failed",
        message: "Error adding voucher",
      });
      setOpen(true); // Open the modal
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Voucher
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          name="companyName"
        />
        <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
            required
            name="image"
          />
        </Button>
        {fileName && (
          <Typography variant="body2" color="textSecondary">
            {fileName}
          </Typography>
        )}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          name="description"
        />
        <TextField
          label="Voucher Cost"
          variant="outlined"
          fullWidth
          margin="normal"
          value={voucherCost}
          onChange={(e) => setVoucherCost(e.target.value)}
          required
          type="number"
          inputProps={{ min: 0 }}
          name="voucherCost"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Voucher
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

export default AddVoucher;
