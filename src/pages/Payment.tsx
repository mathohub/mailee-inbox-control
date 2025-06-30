
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Grid
} from '@mui/material';
import { 
  CheckCircle, 
  CreditCard, 
  Email, 
  Security, 
  Analytics,
  Support
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const Payment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { completePurchase, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handlePayment = async (method: 'card' | 'paypal') => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful payment
    completePurchase();
    navigate('/dashboard');
    setLoading(false);
  };

  const features = [
    {
      icon: <Email color="primary" />,
      text: t('payment.features.inbox')
    },
    {
      icon: <Security color="primary" />,
      text: t('payment.features.spam')
    },
    {
      icon: <Analytics color="primary" />,
      text: t('payment.features.analytics')
    },
    {
      icon: <Support color="primary" />,
      text: t('payment.features.support')
    }
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" color="primary" fontWeight="bold">
              Mailee
            </Typography>
            <LanguageToggle />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Chip 
                  label="7 DAYS FREE" 
                  color="success" 
                  size="large"
                  sx={{ mb: 2, fontWeight: 'bold' }}
                />
                <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                  {t('payment.title')}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t('payment.subtitle')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('payment.description')}
                </Typography>
              </Box>

              <List>
                {features.map((feature, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText primary={feature.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Welcome, {user?.name}!
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                  {t('payment.cardRequired')}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CreditCard />}
                    onClick={() => handlePayment('card')}
                    disabled={loading}
                    sx={{ py: 1.5 }}
                  >
                    {loading ? <CircularProgress size={24} /> : t('payment.payWithCard')}
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => handlePayment('paypal')}
                    disabled={loading}
                    sx={{ py: 1.5 }}
                  >
                    {t('payment.payWithPaypal')}
                  </Button>
                </Box>

                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    * This is a demo. Clicking either button will simulate a successful payment and grant access to the dashboard.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Payment;
