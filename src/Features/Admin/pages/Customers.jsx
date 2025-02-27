import React from 'react';
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
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const Customers = () => {
  // Sample data - replace with your actual data
  const customers = [
    { 
      id: 1, 
      name: 'Matina Maharjan', 
      email: 'matina@gmail.com', 
      phone: '9841633244',
      joinDate: '2025-01-15',
      orders: 5
    },
    { 
      id: 2, 
      name: 'Rebika Maharjan', 
      email: 'rebika@gmail.com', 
      phone: '9862354785',
      joinDate: '2025-01-20',
      orders: 3
    },
    { 
      id: 3, 
      name: 'Shreya Shakya', 
      email: 'Shreya@gmail.com', 
      phone: '9865142365',
      joinDate: '2025-02-01',
      orders: 1
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Customers</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>{customer.name[0]}</Avatar>
                    {customer.name}
                  </Box>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.joinDate}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => {/* Handle email */}}
                    title="Send Email"
                  >
                    <EmailIcon />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    onClick={() => {/* Handle call */}}
                    title="Call"
                  >
                    <PhoneIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;
