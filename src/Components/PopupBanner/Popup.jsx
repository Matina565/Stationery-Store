import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

const Popup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds of page load
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenPopup');
      if (!hasSeenPopup) {
        setOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: 'primary.main' }}>
        Welcome to Our Stationery Store!
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" gutterBottom>
            🎉 Special Offer!
          </Typography>
          <Typography variant="body1" paragraph>
            Get 10% off on your first purchase using code: WELCOME10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            *Valid for new customers only. Minimum purchase of ₹500 required.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            px: 4,
            borderRadius: 2
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
