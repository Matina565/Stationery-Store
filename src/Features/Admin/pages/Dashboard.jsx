import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
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
  const dashboardData = [
    { title: 'Total Orders', value: '150', icon: ShoppingCartIcon, color: '#1976d2' },
    { title: 'Total Users', value: '1,200', icon: PersonIcon, color: '#2e7d32' },
    { title: 'Total Products', value: '90', icon: InventoryIcon, color: '#ed6c02' },
    { title: 'Total Sales', value: 'Rs.15000000', icon: AttachMoneyIcon, color: '#9c27b0' },
    { title: 'Total Reviews', value: '100', icon: StarIcon, color: '#ed6c02' },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
