import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  ShoppingBasket as OrdersIcon,
  People as CustomersIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Products', icon: <ProductsIcon />, path: '/admin/products' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders' },
  { text: 'Customers', icon: <CustomersIcon />, path: '/admin/customers' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawer = (
    <Box sx={{ width: 240 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            top: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
