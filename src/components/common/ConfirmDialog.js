import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonColor = 'primary'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon sx={{ color: 'error.main', fontSize: 48 }} />;
      case 'success':
        return <SuccessIcon sx={{ color: 'success.main', fontSize: 48 }} />;
      case 'info':
        return <InfoIcon sx={{ color: 'info.main', fontSize: 48 }} />;
      default:
        return <WarningIcon sx={{ color: 'warning.main', fontSize: 48 }} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {getIcon()}
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmButtonColor}
          sx={{ minWidth: 100 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
