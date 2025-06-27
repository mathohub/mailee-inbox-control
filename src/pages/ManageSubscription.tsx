
import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { ArrowBack, Cancel, CheckCircle } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const ManageSubscription: React.FC = () => {
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);
  const { user, cancelSubscription } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleCancelSubscription = () => {
    setCancelDialogOpen(true);
  };

  const confirmCancelSubscription = () => {
    cancelSubscription();
    console.log('Subscription cancelled');
    setCancelDialogOpen(false);
  };

  const isSubscriptionCancelled = user?.subscriptionStatus === 'cancelled';

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          sx={{ mb: 2 }}
        >
          {t('common.back')}
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          {t('subscription.manage')}
        </Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {t('subscription.currentPlan')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Mailee Pro
                </Typography>
              </Box>
              <Chip 
                label={
                  isSubscriptionCancelled 
                    ? t('subscription.cancelled') 
                    : user?.isPaid 
                      ? t('subscription.active') 
                      : t('subscription.trial')
                } 
                color={
                  isSubscriptionCancelled 
                    ? "error" 
                    : user?.isPaid 
                      ? "success" 
                      : "warning"
                }
                icon={isSubscriptionCancelled ? <Cancel /> : <CheckCircle />}
              />
            </Box>
            
            {!isSubscriptionCancelled && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {t('subscription.nextBilling')}: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </Typography>
            )}
            
            {isSubscriptionCancelled && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Sua assinatura foi cancelada. Você ainda tem acesso até o final do período atual.
              </Typography>
            )}
          </CardContent>
        </Card>

        {!isSubscriptionCancelled && (
          <>
            <Alert severity="info" sx={{ mb: 3 }}>
              {t('subscription.trialInfo')}
            </Alert>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={handleCancelSubscription}
              >
                {t('subscription.cancel')}
              </Button>
            </Box>
          </>
        )}

        {isSubscriptionCancelled && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Sua assinatura está cancelada. Para reativar, entre em contato com o suporte.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>{t('subscription.confirmCancel')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('subscription.cancelWarning')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={confirmCancelSubscription} color="error">
            {t('subscription.confirmCancelAction')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageSubscription;
