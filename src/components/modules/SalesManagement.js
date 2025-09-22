import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { salesAPI } from '../../services/api';

const SalesManagement = () => {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [viewingSale, setViewingSale] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    product: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    status: 'Pending'
  });

  // Load sales from database
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await salesAPI.getAll();
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setSales([]);
      }
    };

    fetchSales();
  }, []);

  const handleOpen = (sale = null) => {
    if (sale) {
      setEditingSale(sale);
      setFormData({
        customerName: sale.customerName,
        customerEmail: sale.customerEmail,
        product: sale.product,
        quantity: sale.quantity,
        unitPrice: sale.unitPrice,
        discount: sale.discount,
        status: sale.status
      });
    } else {
      setEditingSale(null);
      setFormData({
        customerName: '',
        customerEmail: '',
        product: '',
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        status: 'Pending'
      });
    }
    setOpen(true);
  };

  const handleView = (sale) => {
    setViewingSale(sale);
    setViewOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setViewOpen(false);
    setEditingSale(null);
    setViewingSale(null);
  };

  const calculateTotal = () => {
    const subtotal = formData.quantity * formData.unitPrice;
    return subtotal - formData.discount;
  };

  const handleSave = () => {
    const total = calculateTotal();
    
    if (editingSale) {
      setSales(sales.map(sale => 
        sale.id === editingSale.id 
          ? { 
              ...sale,
              ...formData,
              total,
              orderNumber: sale.orderNumber,
              date: sale.date,
              salesRep: sale.salesRep
            }
          : sale
      ));
    } else {
      const newSale = {
        ...formData,
        id: Date.now(),
        orderNumber: `ORD${String(sales.length + 1).padStart(3, '0')}`,
        total,
        date: new Date().toISOString().split('T')[0],
        salesRep: 'Current User'
      };
      setSales([...sales, newSale]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Shipped': return 'info';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const filteredSales = sales.filter(sale =>
    sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const completedSales = sales.filter(sale => sale.status === 'Completed').length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sales Management
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                <MoneyIcon sx={{ mr: 1 }} />
                ${totalRevenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4">
                {sales.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Sales
              </Typography>
              <Typography variant="h4">
                {completedSales}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="Search sales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          New Sale
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.orderNumber}</TableCell>
                <TableCell>{sale.customerName}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={sale.status}
                    color={getStatusColor(sale.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(sale)}>
                    <ViewIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(sale)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(sale.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSale ? 'Edit Sale' : 'New Sale'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Email"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingSale ? 'Update' : 'Create'} Sale
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Sale Details - {viewingSale?.orderNumber}</DialogTitle>
        <DialogContent>
          {viewingSale && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Customer Name</Typography>
                <Typography>{viewingSale.customerName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Customer Email</Typography>
                <Typography>{viewingSale.customerEmail}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Product</Typography>
                <Typography>{viewingSale.product}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Sales Rep</Typography>
                <Typography>{viewingSale.salesRep}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">Quantity</Typography>
                <Typography>{viewingSale.quantity}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">Unit Price</Typography>
                <Typography>${viewingSale.unitPrice}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">Discount</Typography>
                <Typography>${viewingSale.discount}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">Total</Typography>
                <Typography variant="h6">${viewingSale.total.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Chip
                  label={viewingSale.status}
                  color={getStatusColor(viewingSale.status)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Date</Typography>
                <Typography>{viewingSale.date}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesManagement;