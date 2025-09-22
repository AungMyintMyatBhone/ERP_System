import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Avatar,
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const ProfileDialog = ({ open, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1-555-0123',
    department: 'Administration',
    position: user?.role === 'admin' ? 'System Administrator' : 'Department Manager',
    joinDate: '2022-01-15'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'English'
  });

  const handleProfileSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', profileData);
    onClose();
  };

  const handlePreferenceChange = (key) => (event) => {
    setPreferences({
      ...preferences,
      [key]: event.target.checked
    });
  };

  const ProfileTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
        <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, fontSize: '2rem' }}>
          {user?.name?.charAt(0)}
        </Avatar>
        <Typography variant="h6">{user?.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.role === 'admin' ? 'System Administrator' : 'Department Manager'}
        </Typography>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Full Name"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          InputProps={{
            startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
          }}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email Address"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          InputProps={{
            startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
          }}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          value={profileData.phone}
          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          InputProps={{
            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />
          }}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Department"
          value={profileData.department}
          onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
          InputProps={{
            startAdornment: <WorkIcon sx={{ mr: 1, color: 'action.active' }} />
          }}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Position"
          value={profileData.position}
          onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Join Date"
          value={profileData.joinDate}
          InputProps={{
            readOnly: true
          }}
        />
      </Grid>
    </Grid>
  );

  const PreferencesTab = () => (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsIcon sx={{ mr: 1 }} />
            Notifications
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Email Notifications" secondary="Receive notifications via email" />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.emailNotifications}
                    onChange={handlePreferenceChange('emailNotifications')}
                  />
                }
                label=""
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Push Notifications" secondary="Receive browser push notifications" />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.pushNotifications}
                    onChange={handlePreferenceChange('pushNotifications')}
                  />
                }
                label=""
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <PaletteIcon sx={{ mr: 1 }} />
            Appearance
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Dark Mode" secondary="Use dark theme for the interface" />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.darkMode}
                    onChange={handlePreferenceChange('darkMode')}
                  />
                }
                label=""
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageIcon sx={{ mr: 1 }} />
            Language & Region
          </Typography>
          <TextField
            fullWidth
            select
            label="Language"
            value={preferences.language}
            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
            SelectProps={{
              native: true,
            }}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </TextField>
        </CardContent>
      </Card>
    </Box>
  );

  const SecurityTab = () => (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1 }} />
            Security Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                placeholder="Enter current password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                placeholder="Enter new password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                placeholder="Confirm new password"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Account Type" 
                secondary={user?.role === 'admin' ? 'Administrator' : 'Manager'} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Last Login" 
                secondary="Today at 9:30 AM" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Account Status" 
                secondary="Active" 
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>{user?.name?.charAt(0)}</Avatar>
          <Box>
            <Typography variant="h6">User Profile</Typography>
            <Typography variant="body2" color="textSecondary">
              Manage your account settings and preferences
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['profile', 'preferences', 'security'].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? 'contained' : 'text'}
                sx={{ textTransform: 'capitalize' }}
              >
                {tab}
              </Button>
            ))}
          </Box>
        </Box>

        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'preferences' && <PreferencesTab />}
        {activeTab === 'security' && <SecurityTab />}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleProfileSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;