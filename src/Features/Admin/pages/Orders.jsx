import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

const OrderDetailsDialog = ({ open, handleClose, order, onStatusChange }) => {
  const [status, setStatus] = useState(order?.status || '');

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(order.id, newStatus);
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Details #{order.id}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemText
              primary="Customer"
              secondary={order.customer}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Order Date"
              secondary={order.date}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Items"
              secondary={
                <List>
                  {order.items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity} - Rs.${item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Total Amount"
              secondary={`Rs.${order.total}`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'Matina Maharjan',
      date: '2025-02-22',
      total: 800,
      status: 'Pending',
      items: [
        { name: 'Notebook', quantity: 1, price: 200 },
        
      ]
    },
    {
      id: 2,
      customer: 'Rebika Maharjan',
      date: '2025-02-21',
      total: 400,
      status: 'Delivered',
      items: [
        { name: 'DIY & Crafting Kits', quantity: 1, price: 400 },
      ]
    },
    {
      id: 3,
      customer: 'Shreya Shakya',
      date: '2025-02-20',
      total: 500,
      status: 'Processing',
      items: [
        { name: 'Fun & Kawai Stationery', quantity: 1, price: 500 },
      ]
    },
    {
      id: 4,
      customer: 'John Rai',
      date: '2025-02-20',
      total: 500,
      status: 'Processing',
      items: [
        { name: 'Eco-friendly & Sustainable', quantity: 1, price: 800 },
      ]
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    showSnackbar(`Order #${orderId} status updated to ${newStatus}`);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Orders</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>Rs.{order.total}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleViewDetails(order)}
                    title="View Details"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <OrderDetailsDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Orders;
