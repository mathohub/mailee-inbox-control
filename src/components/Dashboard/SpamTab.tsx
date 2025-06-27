
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip
} from '@mui/material';
import { Delete, Warning, Security } from '@mui/icons-material';
import { mockEmails } from '../../data/mockEmails';
import { useLanguage } from '../../contexts/LanguageContext';

const SpamTab: React.FC = () => {
  const { t } = useLanguage();
  const [spamEmails, setSpamEmails] = useState(mockEmails.filter(email => email.isSpam));

  const handleDeleteAllSpam = () => {
    setSpamEmails([]);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {t('spam.title')}
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={handleDeleteAllSpam}
          disabled={spamEmails.length === 0}
        >
          {t('spam.deleteAll')}
        </Button>
      </Box>

      {spamEmails.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            {spamEmails.length} {t('spam.spamEmails')}
          </Typography>
        </Alert>
      )}

      <List>
        {spamEmails.map((email) => (
          <ListItem
            key={email.id}
            sx={{
              border: 1,
              borderColor: 'error.light',
              borderRadius: 1,
              mb: 1,
              bgcolor: 'error.light',
              opacity: 0.7
            }}
          >
            <ListItemIcon>
              <Warning color="error" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {email.sender}
                  </Typography>
                  <Chip label="SPAM" size="small" color="error" />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {email.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {email.preview}
                  </Typography>
                  <Typography variant="caption" color="error">
                    From: {email.senderEmail}
                  </Typography>
                </Box>
              }
            />
            <Typography variant="caption" color="text.secondary">
              {new Date(email.date).toLocaleDateString()}
            </Typography>
          </ListItem>
        ))}
      </List>

      {spamEmails.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Security sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
          <Typography variant="h6" color="success.main">
            No spam detected! Your inbox is protected! 🛡️
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SpamTab;
