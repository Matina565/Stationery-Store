import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  CssBaseline,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  ShoppingBasket as OrdersIcon,
  People as UsersIcon,
  Category as CategoryIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  minHeight: 64,
  justifyContent: 'space-between',
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
  },
  ...(active && {
    backgroundColor: theme.palette.primary.light + '30',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiListItemText-root': {
      '& .MuiTypography-root': {
        fontWeight: 600,
        color: theme.palette.primary.main,
      },
    },
  }),
}));

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Products', icon: <ProductsIcon />, path: '/admin/products' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders' },
    { text: 'Users', icon: <UsersIcon />, path: '/admin/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
    handleProfileMenuClose();
  };

  const handleLogoutConfirm = () => {
    // Clear all admin-related data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Close the dialog first
    setLogoutDialogOpen(false);
    
    // Use window.location.href for a full page redirect
    window.location.href = '/loginSignUp';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Stationery Store Admin
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.dark }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBarStyled>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: theme.palette.background.default,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main, mr: 2 }}>
              S
            </Avatar>
            <Typography variant="h6" color="primary">
              Admin Panel
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              active={location.pathname === item.path ? 1 : 0}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
          <StyledListItem
            button
            onClick={handleLogoutClick}
            sx={{ mt: 2, color: theme.palette.error.main }}
          >
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledListItem>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/admin/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => navigate('/admin/settings')}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutClick} sx={{ color: 'error.main' }}>
          Logout
        </MenuItem>
      </Menu>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminLayout;
