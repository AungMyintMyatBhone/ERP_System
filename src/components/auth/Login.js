import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Paper elevation={10} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main' 
          }}>
            ERP System
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Business Management Platform
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Card sx={{ mt: 3, bgcolor: 'grey.50' }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Demo Credentials:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Admin:</strong> admin@erp.com / admin123
            </Typography>
            <Typography variant="body2">
              <strong>Manager:</strong> manager@erp.com / manager123
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default Login;