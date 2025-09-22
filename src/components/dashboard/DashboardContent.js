import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as SalesIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DashboardContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Customers
              </Typography>
              <Typography variant="h4">
                1,247
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Inventory Items
              </Typography>
              <Typography variant="h4">
                8,523
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Sales
              </Typography>
              <Typography variant="h4">
                $124,578
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Employees
              </Typography>
              <Typography variant="h4">
                89
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="New customer registration"
                  secondary="John Doe registered 2 hours ago"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Inventory update"
                  secondary="Stock levels updated for 15 items"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Sales report generated"
                  secondary="Monthly sales report completed"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <IconButton
                variant="outlined"
                onClick={() => navigate('/customers')}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                <PeopleIcon sx={{ mr: 2 }} />
                Manage Customers
              </IconButton>
              <IconButton
                variant="outlined"
                onClick={() => navigate('/inventory')}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                <InventoryIcon sx={{ mr: 2 }} />
                Check Inventory
              </IconButton>
              <IconButton
                variant="outlined"
                onClick={() => navigate('/sales')}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                <SalesIcon sx={{ mr: 2 }} />
                View Sales
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;