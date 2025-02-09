// components/atoms/ConfigButton.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface ConfigButtonProps {
  onClick: () => void;
}

const ConfigButton: React.FC<ConfigButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} color='primary'>
      <SettingsIcon />
    </IconButton>
  );
};

export default ConfigButton;
