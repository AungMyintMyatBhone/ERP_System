import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Typography,
  Container,
  Paper
} from '@mui/material';
import { Refresh as RefreshIcon, Home as HomeIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Here you could send error to logging service
    // logErrorToService(error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>Something went wrong</AlertTitle>
              An unexpected error occurred while loading this page.
            </Alert>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                We apologize for the inconvenience. The application encountered an unexpected error.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleRefresh}
                color="primary"
              >
                Refresh Page
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
              >
                Go to Home
              </Button>
            </Box>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mt: 4, textAlign: 'left' }}>
                <Typography variant="h6" gutterBottom>
                  Error Details (Development Mode):
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    backgroundColor: '#f5f5f5',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace'
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </Box>
              </Box>
            )}
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;