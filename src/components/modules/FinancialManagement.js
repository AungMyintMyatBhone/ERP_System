import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { financialAPI } from '../../services/api';

const FinancialManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
    type: 'Income',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Load transactions from database
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await financialAPI.getTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  const handleOpen = () => {
    setFormData({
      description: '',
      amount: 0,
      type: 'Income',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: formData.type === 'Expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount),
      reference: `${formData.type === 'Income' ? 'REV' : 'EXP'}${String(transactions.length + 1).padStart(3, '0')}`
    };
    setTransactions([newTransaction, ...transactions]);
    handleClose();
  };

  // Calculate financial metrics
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalIncome - totalExpenses;
  const accountBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

  const categories = ['Sales', 'Services', 'Rent', 'Utilities', 'Equipment', 'Marketing', 'Salaries', 'Other'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Financial Management
      </Typography>

      {/* Financial Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Income
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'success.main' }}>
                    ${totalIncome.toLocaleString()}
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Expenses
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'error.main' }}>
                    ${totalExpenses.toLocaleString()}
                  </Typography>
                </Box>
                <TrendingDownIcon sx={{ fontSize: 40, color: 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Net Profit
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ color: netProfit >= 0 ? 'success.main' : 'error.main' }}
                  >
                    ${netProfit.toLocaleString()}
                  </Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, color: netProfit >= 0 ? 'success.main' : 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Account Balance
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ color: accountBalance >= 0 ? 'success.main' : 'error.main' }}
                  >
                    ${accountBalance.toLocaleString()}
                  </Typography>
                </Box>
                <AccountBalanceIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transactions Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Recent Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Transaction
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Reference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Chip
                    label={transaction.type}
                    color={transaction.type === 'Income' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell
                  sx={{
                    color: transaction.amount >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </TableCell>
                <TableCell>{transaction.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Transaction Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Add Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinancialManagement;