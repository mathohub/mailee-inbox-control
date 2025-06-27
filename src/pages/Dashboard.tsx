
import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { Email, Security, Analytics } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import SettingsMenu from '../components/SettingsMenu';
import InboxTab from '../components/Dashboard/InboxTab';
import SpamTab from '../components/Dashboard/SpamTab';
import AnalyticsTab from '../components/Dashboard/AnalyticsTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();
  const { t } = useLanguage();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {t('dashboard.title')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Welcome, {user?.name}
            </Typography>
            <SettingsMenu />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ width: '100%' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              icon={<Email />} 
              label={t('dashboard.inbox')} 
              iconPosition="start"
            />
            <Tab 
              icon={<Security />} 
              label={t('dashboard.spam')} 
              iconPosition="start"
            />
            <Tab 
              icon={<Analytics />} 
              label={t('dashboard.analytics')} 
              iconPosition="start"
            />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <InboxTab />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SpamTab />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <AnalyticsTab />
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
