
import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { Settings, Logout, CreditCard, Language } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const SettingsMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLanguageAnchorEl(null);
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (lang: 'en' | 'pt') => {
    setLanguage(lang);
    handleClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const handleManageSubscription = () => {
    navigate('/manage-subscription');
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Settings />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLanguageClick}>
          <ListItemIcon>
            <Language fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('settings.language')} />
        </MenuItem>
        
        <MenuItem onClick={handleManageSubscription}>
          <ListItemIcon>
            <CreditCard fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('settings.manageSubscription')} />
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('dashboard.logout')} />
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={languageAnchorEl}
        open={Boolean(languageAnchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          onClick={() => handleLanguageChange('en')}
          selected={language === 'en'}
        >
          English
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('pt')}
          selected={language === 'pt'}
        >
          Português
        </MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
