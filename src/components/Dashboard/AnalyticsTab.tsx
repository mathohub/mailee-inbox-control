
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getEmailStats } from '../../data/mockEmails';
import { useLanguage } from '../../contexts/LanguageContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsTab: React.FC = () => {
  const { t } = useLanguage();
  const stats = getEmailStats();

  const categoryData = {
    labels: Object.keys(stats.categories).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        label: 'Emails',
        data: Object.values(stats.categories),
        backgroundColor: [
          '#1976d2',
          '#388e3c',
          '#f57c00',
          '#7b1fa2',
          '#d32f2f'
        ],
        borderWidth: 0
      }
    ]
  };

  const senderData = {
    labels: stats.topSenders.map(([sender]) => sender),
    datasets: [
      {
        label: 'Emails Received',
        data: stats.topSenders.map(([, count]) => count),
        backgroundColor: '#1976d2',
        borderColor: '#1565c0',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t('analytics.title')}
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.totalEmails}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('analytics.totalEmails')}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="error" fontWeight="bold">
              {stats.spamEmails}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('analytics.spamBlocked')}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {stats.cleanEmails}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clean Emails
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {Math.round(stats.spamEmails * 2.5)}min
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('analytics.cleanupSaved')}
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('analytics.categories')}
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut data={categoryData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('analytics.topSenders')}
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={senderData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Top Senders List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('analytics.topSenders')} (Detailed)
            </Typography>
            <List>
              {stats.topSenders.map(([sender, count], index) => (
                <ListItem key={sender} divider>
                  <ListItemText
                    primary={`${index + 1}. ${sender}`}
                    secondary={`${count} emails received`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsTab;
