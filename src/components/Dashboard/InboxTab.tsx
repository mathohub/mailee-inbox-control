
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  FormControlLabel
} from '@mui/material';
import { Delete, Email, Person } from '@mui/icons-material';
import { mockEmails } from '../../data/mockEmails';
import { useLanguage } from '../../contexts/LanguageContext';

const InboxTab: React.FC = () => {
  const { t } = useLanguage();
  const [emails, setEmails] = useState(mockEmails.filter(email => !email.isSpam));
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
  };

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleDeleteSelected = () => {
    setEmails(prev => prev.filter(email => !selectedEmails.includes(email.id)));
    setSelectedEmails([]);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      personal: 'primary',
      work: 'secondary',
      promotions: 'warning',
      social: 'info'
    };
    return colors[category as keyof typeof colors] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {t('inbox.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedEmails.length === emails.length && emails.length > 0}
                indeterminate={selectedEmails.length > 0 && selectedEmails.length < emails.length}
                onChange={handleSelectAll}
              />
            }
            label={t('inbox.selectAll')}
          />
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={handleDeleteSelected}
            disabled={selectedEmails.length === 0}
          >
            {t('inbox.deleteSelected')} ({selectedEmails.length})
          </Button>
        </Box>
      </Box>

      {selectedEmails.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {selectedEmails.length} {t('inbox.emailsSelected')}
        </Alert>
      )}

      <List>
        {emails.map((email) => (
          <ListItem
            key={email.id}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1,
              bgcolor: selectedEmails.includes(email.id) ? 'action.selected' : 'background.paper'
            }}
          >
            <ListItemIcon>
              <Checkbox
                checked={selectedEmails.includes(email.id)}
                onChange={() => handleEmailSelect(email.id)}
              />
            </ListItemIcon>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" fontWeight={email.isRead ? 'normal' : 'bold'}>
                    {email.sender}
                  </Typography>
                  <Chip 
                    label={email.category} 
                    size="small" 
                    color={getCategoryColor(email.category) as any}
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" fontWeight={email.isRead ? 'normal' : 'bold'}>
                    {email.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {email.preview}
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

      {emails.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Email sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Your inbox is clean! 🎉
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InboxTab;
