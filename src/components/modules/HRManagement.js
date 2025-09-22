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
  CardContent,
  Tabs,
  Tab
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { hrAPI } from '../../services/api';

const HRManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: 0,
    hireDate: '',
    status: 'Active',
    manager: ''
  });

  // Load employees from database
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await hrAPI.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpen = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData(employee);
    } else {
      setEditingEmployee(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        salary: 0,
        hireDate: '',
        status: 'Active',
        manager: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEmployee(null);
  };

  const handleSave = () => {
    if (editingEmployee) {
      setEmployees(employees.map(employee => 
        employee.id === editingEmployee.id 
          ? { ...formData, id: editingEmployee.id }
          : employee
      ));
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now()
      };
      setEmployees([...employees, newEmployee]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Leave': return 'warning';
      case 'Terminated': return 'error';
      default: return 'default';
    }
  };

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const departments = ['Engineering', 'Sales', 'Marketing', 'Human Resources', 'Finance', 'Operations'];
  const positions = [
    'Senior Developer', 'Junior Developer', 'Sales Manager', 'Sales Representative',
    'Marketing Manager', 'Marketing Coordinator', 'HR Manager', 'HR Specialist',
    'Financial Analyst', 'Operations Manager'
  ];

  // Calculate HR metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const averageSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length;
  const departmentCounts = departments.map(dept => ({
    department: dept,
    count: employees.filter(emp => emp.department === dept).length
  }));

  const EmployeeList = () => (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="Search employees..."
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
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Hire Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>${employee.salary.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.status}
                    color={getStatusColor(employee.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{employee.hireDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(employee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const HRDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Total Employees
                </Typography>
                <Typography variant="h4">
                  {totalEmployees}
                </Typography>
              </Box>
              <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
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
                  Active Employees
                </Typography>
                <Typography variant="h4">
                  {activeEmployees}
                </Typography>
              </Box>
              <WorkIcon sx={{ fontSize: 40, color: 'success.main' }} />
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
                  Average Salary
                </Typography>
                <Typography variant="h4">
                  ${Math.round(averageSalary).toLocaleString()}
                </Typography>
              </Box>
              <ScheduleIcon sx={{ fontSize: 40, color: 'info.main' }} />
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
                  Departments
                </Typography>
                <Typography variant="h4">
                  {departments.length}
                </Typography>
              </Box>
              <WorkIcon sx={{ fontSize: 40, color: 'warning.main' }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Department Distribution
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell align="right">Employees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentCounts.map((dept) => (
                <TableRow key={dept.department}>
                  <TableCell>{dept.department}</TableCell>
                  <TableCell align="right">{dept.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Hires
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Hire Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                .sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate))
                .slice(0, 5)
                .map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.hireDate}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        HR Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Dashboard" />
          <Tab label="Employees" />
        </Tabs>
      </Box>

      {tabValue === 0 && <HRDashboard />}
      {tabValue === 1 && <EmployeeList />}

      {/* Add/Edit Employee Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  value={formData.position}
                  label="Position"
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  {positions.map((pos) => (
                    <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={formData.department}
                  label="Department"
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hire Date"
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
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
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="On Leave">On Leave</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manager"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingEmployee ? 'Update' : 'Add'} Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HRManagement;