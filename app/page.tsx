// app/page.tsx
'use client';

import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import WheelDisplay from '../components/organisms/WheelDisplay';
import ConfigModal from '../components/organisms/ConfigModal';
import ConfigButton from '../components/atoms/ConfigButton';

export interface Slice {
  text: string;
  color: string;
}

export default function HomePage() {
  // Default slices configuration
  const [slices, setSlices] = useState<Slice[]>([
    { text: ' 1', color: '#9F0702' },
    { text: ' 2', color: '#52A704' },
    { text: ' 3', color: '#4993C3' },
  ]);
  const [configModalOpen, setConfigModalOpen] = useState<boolean>(false);

  const handleConfigSave = (newSlices: Slice[]) => {
    setSlices(newSlices);
    setConfigModalOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("./dtbackground.jpg")',
        backgroundSize: 'cover', // fills the container, may crop the image
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pt: 4,
      }}
    >
      <Container maxWidth='xs' sx={{ textAlign: 'center', mt: 14 }}>
        <WheelDisplay slices={slices} />
        <Box mt={2}>
          <ConfigButton onClick={() => setConfigModalOpen(true)} />
        </Box>
        <ConfigModal
          open={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          slices={slices}
          onSave={handleConfigSave}
        />
      </Container>
    </Box>
  );
}
