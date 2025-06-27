
import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Language } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: 'en' | 'pt') => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Language />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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

export default LanguageToggle;
