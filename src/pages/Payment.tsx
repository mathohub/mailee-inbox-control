
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
  Grid,
  Alert
} from '@mui/material';
import { 
  CheckCircle, 
  CalendarMonth, 
  CalendarToday, 
  Email, 
  Security, 
  Analytics,
  Support
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const Payment: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const handleSubscription = (type: 'monthly' | 'annual') => {
    const monthlyLink = 'https://pay.kiwify.com.br/4oPti4i';
    const annualLink = 'https://pay.kiwify.com.br/zVYY651';
    
    const link = type === 'monthly' ? monthlyLink : annualLink;
    window.open(link, '_blank');
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

                <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
                  {t('payment.freeTrialWarning')}
                </Alert>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CalendarToday />}
                    onClick={() => handleSubscription('monthly')}
                    sx={{ py: 1.5 }}
                  >
                    {t('payment.monthlySubscription')}
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<CalendarMonth />}
                    onClick={() => handleSubscription('annual')}
                    sx={{ py: 1.5 }}
                  >
                    {t('payment.annualSubscription')}
                  </Button>
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
