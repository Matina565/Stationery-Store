import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  TextField,
} from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Settings</Typography>

      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Email Notifications"
              secondary="Receive email notifications for new orders"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Low Stock Alerts"
              secondary="Get notified when product stock is low"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Order Updates"
              secondary="Receive notifications for order status changes"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Account Settings</Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Admin Email"
            defaultValue="admin@example.com"
            fullWidth
          />
          <TextField
            label="Current Password"
            type="password"
            fullWidth
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
          />
          <Button 
            variant="contained" 
            sx={{ alignSelf: 'flex-start' }}
            onClick={() => {/* Handle save changes */}}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>System Settings</Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Maintenance Mode"
              secondary="Put store in maintenance mode"
            />
            <ListItemSecondaryAction>
              <Switch />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Debug Mode"
              secondary="Enable detailed error logging"
            />
            <ListItemSecondaryAction>
              <Switch />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Settings;
