// components/organisms/ConfigModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Grid,
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { Slice } from '../../app/page';

interface ConfigModalProps {
  open: boolean;
  onClose: () => void;
  slices: Slice[];
  onSave: (newSlices: Slice[]) => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({
  open,
  onClose,
  slices,
  onSave,
}) => {
  const [localSlices, setLocalSlices] = useState<Slice[]>(slices);

  useEffect(() => {
    setLocalSlices(slices);
  }, [slices, open]);

  const handleSliceChange = (
    index: number,
    key: keyof Slice,
    value: string
  ) => {
    const newSlices = [...localSlices];
    newSlices[index] = { ...newSlices[index], [key]: value };
    setLocalSlices(newSlices);
  };

  const handleAddSlice = () => {
    setLocalSlices([
      ...localSlices,
      { text: `Slice ${localSlices.length + 1}`, color: '#000000' },
    ]);
  };

  const handleRemoveSlice = (index: number) => {
    const newSlices = localSlices.filter((_, i) => i !== index);
    setLocalSlices(newSlices);
  };

  const handleSave = () => {
    onSave(localSlices);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Configure Wheel</DialogTitle>
      <DialogContent>
        {localSlices.map((slice, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            alignItems='center'
            sx={{ mb: 1 }}
          >
            <Grid item xs={5}>
              <TextField
                fullWidth
                label={`Slice ${index + 1} Text`}
                value={slice.text}
                onChange={(e) =>
                  handleSliceChange(index, 'text', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                type='color'
                label='Color'
                value={slice.color}
                onChange={(e) =>
                  handleSliceChange(index, 'color', e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => handleRemoveSlice(index)}
                disabled={localSlices.length <= 2}
              >
                <RemoveCircle />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddCircle />} onClick={handleAddSlice}>
          Add Slice
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigModal;
