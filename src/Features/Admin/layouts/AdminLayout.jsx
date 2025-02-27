import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header onSidebarToggle={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          mt: '64px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
