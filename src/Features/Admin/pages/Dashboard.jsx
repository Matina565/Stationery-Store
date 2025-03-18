import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  CircularProgress
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}
  >
    <div>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4">
        {value}
      </Typography>
    </div>
    <Icon sx={{ fontSize: 30, color }} />
  </Paper>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalOrders: 4,
      totalSales: 200,
      totalUsers: 4,
      totalProducts: 13,
      totalReviews: 4
    },
    recentOrders: [],
    popularProducts: [],
    latestUsers: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/dashboard/stats');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const statsCards = [
    { 
      title: 'Total Orders', 
      value: dashboardData.stats.totalOrders, 
      icon: ShoppingCartIcon, 
      color: '#1976d2' 
    },
    { 
      title: 'Total Users', 
      value: dashboardData.stats.totalUsers, 
      icon: PersonIcon, 
      color: '#2e7d32' 
    },
    { 
      title: 'Total Products', 
      value: dashboardData.stats.totalProducts, 
      icon: InventoryIcon, 
      color: '#ed6c02' 
    },
    { 
      title: 'Total Sales', 
      value: formatCurrency(dashboardData.stats.totalSales), 
      icon: AttachMoneyIcon, 
      color: '#9c27b0' 
    },
    { 
      title: 'Total Reviews', 
      value: dashboardData.stats.totalReviews, 
      icon: StarIcon, 
      color: '#ed6c02' 
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders */}
      {/* <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Recent Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboardData.recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.username || 'Guest'}</TableCell>
                <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      {/* Popular Products */}
      {/* <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Popular Products
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboardData.popularProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.order_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      {/* Latest Users */}
      {/* <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Latest Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboardData.latestUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
};

export default Dashboard;
