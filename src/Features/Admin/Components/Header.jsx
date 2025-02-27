import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: '240px' },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
