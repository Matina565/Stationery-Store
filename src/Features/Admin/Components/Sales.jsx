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
  TablePagination,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { AttachMoney as AttachMoneyIcon } from '@mui/icons-material';

const Sales = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sample data - replace with actual data from your backend
  const salesData = [
    {
      id: 1,
      date: '2025-02-23',
      orderId: 'ORD001',
      customerName: 'John Doe',
      amount: 1500,
      paymentMethod: 'Credit Card',
      status: 'Completed'
    },
    // Add more sample data as needed
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sales Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="subtitle2">
                  Today's Sales
                </Typography>
                <Typography variant="h5">Rs.25,000</Typography>
              </Box>
              <AttachMoneyIcon sx={{ color: '#1976d2', fontSize: 40 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="subtitle2">
                  Weekly Sales
                </Typography>
                <Typography variant="h5">Rs.150,000</Typography>
              </Box>
              <AttachMoneyIcon sx={{ color: '#2e7d32', fontSize: 40 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sales Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>Rs.{row.amount}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={salesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Sales;
