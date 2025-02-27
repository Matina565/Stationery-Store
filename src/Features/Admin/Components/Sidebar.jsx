import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  ShoppingCart as OrdersIcon,
  Settings as SettingsIcon,
  ShowChart as SalesIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Products', icon: <InventoryIcon />, path: '/admin/products' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders' },
  { text: 'Sales', icon: <SalesIcon />, path: '/admin/sales' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear admin token and user data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userData');
    
    // Reset auth state in Redux
    dispatch({ type: 'LOGOUT' });
    
    // Redirect to main login page
    navigate('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a1a1a',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
          Stationery Store
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
              '&.Mui-selected': {
                backgroundColor: '#2196f3',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List>
          {/* Removed Logout button */}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
