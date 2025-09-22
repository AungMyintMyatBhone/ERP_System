import React, { useState } from 'react';
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as SalesIcon,
  AccountBalance as FinanceIcon,
  Person as HRIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Settings,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProfileDialog from '../common/ProfileDialog';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  { text: 'Sales', icon: <SalesIcon />, path: '/sales' },
  { text: 'Finance', icon: <FinanceIcon />, path: '/finance' },
  { text: 'HR Management', icon: <HRIcon />, path: '/hr' },
];

const mockNotifications = [
  {
    id: 1,
    title: 'Low Stock Alert',
    message: '12 items are below minimum stock levels',
    time: '2 hours ago',
    type: 'warning',
    read: false
  },
  {
    id: 2,
    title: 'New Order Received',
    message: 'Order #ORD004 for $1,250',
    time: '3 hours ago',
    type: 'info',
    read: false
  },
  {
    id: 3,
    title: 'Monthly Report Ready',
    message: 'March financial report is available',
    time: '1 day ago',
    type: 'success',
    read: true
  },
  {
    id: 4,
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday',
    time: '2 days ago',
    type: 'info',
    read: true
  }
];

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleOpenProfile = () => {
    setProfileDialogOpen(true);
    setProfileAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setProfileDialogOpen(false);
  };

  const handleNotificationsOpen = () => {
    setNotificationsOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/login');
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      case 'success': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          ERP System
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : 'ERP System';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>

          <IconButton color="inherit" onClick={handleNotificationsOpen}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleOpenProfile}>
              <Avatar /> My Profile
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <AccountCircle sx={{ mr: 2 }} />
              Account Settings
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Settings sx={{ mr: 2 }} />
              Preferences
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Notifications Dialog */}
      <Dialog
        open={notificationsOpen}
        onClose={handleNotificationsClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <Button size="small" onClick={handleMarkAllAsRead}>
              Mark All Read
            </Button>
            <IconButton onClick={handleNotificationsClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                sx={{ 
                  m: 1, 
                  bgcolor: notification.read ? 'grey.50' : 'background.paper',
                  border: notification.read ? 'none' : `1px solid ${getNotificationColor(notification.type)}`,
                  cursor: 'pointer'
                }}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: getNotificationColor(notification.type),
                        mt: 1
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {notification.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {notification.time}
                      </Typography>
                    </Box>
                    {!notification.read && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'primary.main'
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="textSecondary">
                No notifications
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationsClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Profile Dialog */}
      <ProfileDialog 
        open={profileDialogOpen} 
        onClose={handleCloseProfile} 
      />
    </Box>
  );
};

export default MainLayout;