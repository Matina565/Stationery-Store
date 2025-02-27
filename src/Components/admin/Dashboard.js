import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  InventoryTwoTone as ProductIcon,
  ShoppingCartTwoTone as OrderIcon,
  PeopleTwoTone as UserIcon,
  AttachMoneyTwoTone as RevenueIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {React.cloneElement(icon, { sx: { fontSize: 40, color } })}
        <Typography variant="h6" sx={{ ml: 2 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        const data = await response.json();
        
        setStats({
          products: data.statistics.products,
          orders: data.statistics.orders,
          users: data.statistics.users,
          revenue: data.statistics.revenue || 0,
        });
        setRecentOrders(data.recentOrders);
        setSalesData(data.salesData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={<ProductIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={stats.orders}
            icon={<OrderIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.users}
            icon={<UserIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`Rs.${stats.revenue.toFixed(2)}`}
            icon={<RevenueIcon />}
            color="#9c27b0"
          />
        </Grid>

        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400, overflow: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Orders
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user_email}</TableCell>
                    <TableCell align="right">${order.total_amount}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: order.status === 'delivered' ? 'success.main' :
                                order.status === 'pending' ? 'warning.main' :
                                'text.primary'
                        }}
                      >
                        {order.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
