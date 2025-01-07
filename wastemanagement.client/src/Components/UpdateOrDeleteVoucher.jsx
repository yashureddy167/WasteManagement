import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar, // Import Avatar
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import CheckCircleIcon
import ErrorIcon from "@mui/icons-material/Error"; // Import ErrorIcon

const UpdateOrDeleteVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [editVoucherId, setEditVoucherId] = useState(null);
  const [editedVouchers, setEditedVouchers] = useState({});
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ status: "", message: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(
          "https://wastemanagementservice.azurewebsites.net/api/Voucher/GetAllVouchers"
        );
        const result = await response.json();
        if (response.ok) {
          setVouchers(result.data);
        } else {
          console.error("Failed to fetch vouchers");
        }
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleEditClick = (id) => {
    setEditVoucherId(id);
    const voucher = vouchers.find((v) => v.id === id);
    setEditedVouchers((prev) => ({
      ...prev,
      [id]: { ...voucher },
    }));
    setExpanded((prevExpanded) => [...prevExpanded, id]); // Open the accordion
  };

  const handleDeleteClick = (id) => {
    const voucher = vouchers.find((v) => v.id === id);
    setVoucherToDelete(voucher);
    setDeleteDialogOpen(true);
    // Do not change the accordion expansion state
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(`Deleting voucher with ID: ${voucherToDelete.id}`);
      const response = await fetch(
        `https://wastemanagementservice.azurewebsites.net/api/Voucher/DeleteVoucher?companyId=${voucherToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedVouchers = vouchers.filter(
          (voucher) => voucher.id !== voucherToDelete.id
        );
        setVouchers(updatedVouchers); // Update the state of vouchers
        console.log("Updated vouchers:", updatedVouchers);
        setDeleteDialogOpen(false); // Close the delete confirmation modal
        setModalMessage({
          status: "success",
          message: `${voucherToDelete.companyName} Voucher deleted successfully`,
        });
        setOpen(true); // Open the modal
      } else {
        console.error("Failed to delete voucher");
        const result = await response.json();
        setModalMessage({
          status: "failed",
          message: result.message || "Failed to delete voucher",
        });
        setOpen(true); // Open the modal
      }
    } catch (error) {
      console.error("Error deleting voucher:", error);
      setModalMessage({
        status: "failed",
        message: "Error deleting voucher",
      });
      setOpen(true); // Open the modal
    }
  };

  const handleUpdateClick = async (id) => {
    const updatedVoucher = editedVouchers[id];
    try {
      const response = await fetch(
        `https://wastemanagementservice.azurewebsites.net/api/Voucher/UpdateVoucher`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVoucher),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const updatedVouchers = vouchers.map((voucher) =>
          voucher.id === id ? updatedVoucher : voucher
        );
        setVouchers(updatedVouchers); // Update the state of vouchers
        setEditVoucherId(null); // Reset edit state after update
        setModalMessage({
          status: "success",
          message: result.message,
        });
        setOpen(true); // Open the modal
      } else {
        console.error("Failed to update voucher");
        setModalMessage({
          status: "failed",
          message: result.message || "Failed to update voucher",
        });
        setOpen(true); // Open the modal
      }
    } catch (error) {
      console.error("Error updating voucher:", error);
      setModalMessage({
        status: "failed",
        message: "Error updating voucher",
      });
      setOpen(true); // Open the modal
    }
  };

  const handleCancelClick = (id) => {
    setEditVoucherId(null); // Disable all fields
    setEditedVouchers((prev) => {
      const { [id]: _, ...rest } = prev; // Remove the edited voucher from the state
      return rest;
    });
  };

  const handleInputChange = (id, field, value) => {
    setEditedVouchers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseAll = () => {
    setExpanded([]);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) =>
      isExpanded
        ? [...prevExpanded, panel]
        : prevExpanded.filter((id) => id !== panel)
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseAll}
          startIcon={<CloseIcon />}
        >
          Close All
        </Button>
      </Box>
      {vouchers.map((voucher) => (
        <Accordion
          key={voucher.id}
          expanded={expanded.includes(voucher.id)}
          onChange={handleAccordionChange(voucher.id)}
          sx={{ marginBottom: 2 }} // Add margin between accordions
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ flexGrow: 1, alignSelf: "center" }}>
              {voucher.companyName}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent accordion toggle
                handleEditClick(voucher.id);
              }}
              sx={{ color: "blue" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent accordion toggle
                handleDeleteClick(voucher.id);
              }}
              sx={{ color: "red" }}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Company Name"
              value={
                editedVouchers[voucher.id]?.companyName ?? voucher.companyName
              }
              onChange={(e) =>
                handleInputChange(voucher.id, "companyName", e.target.value)
              }
              fullWidth
              margin="normal"
              disabled={editVoucherId !== voucher.id}
            />
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <img
                src={voucher.image}
                alt={voucher.companyName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginRight: "16px",
                }}
              />
              <IconButton disabled={editVoucherId !== voucher.id}>
                <UploadIcon />
              </IconButton>
            </Box>
            <TextField
              label="Voucher Cost"
              value={
                editedVouchers[voucher.id]?.voucherCost ?? voucher.voucherCost
              }
              onChange={(e) =>
                handleInputChange(voucher.id, "voucherCost", e.target.value)
              }
              fullWidth
              margin="normal"
              disabled={editVoucherId !== voucher.id}
            />
            <TextField
              label="Description"
              value={
                editedVouchers[voucher.id]?.description ?? voucher.description
              }
              onChange={(e) =>
                handleInputChange(voucher.id, "description", e.target.value)
              }
              fullWidth
              margin="normal"
              multiline
              rows={4}
              disabled={editVoucherId !== voucher.id}
            />
            {editVoucherId === voucher.id && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateClick(voucher.id)}
                  sx={{ marginRight: 1 }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleCancelClick(voucher.id)}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
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
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the voucher for{" "}
            {voucherToDelete?.companyName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateOrDeleteVoucher;
