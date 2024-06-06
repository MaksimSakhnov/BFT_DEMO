import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { formSubmitted } from '../model/store';

type CreateTaskFormProps = {
  lat: number;
  lng: number;
  onClose: () => void;
};

export function CreateTaskForm({ lat, lng, onClose }: CreateTaskFormProps) {
  const [description, setDescription] = useState<string>('');

  const onSubmit = () => {
    formSubmitted({
      description: description,
      lng: lng,
      lat: lat,
      status: false,
    });

    onClose();
  };

  return (
    <div style={{ padding: '2%' }}>
      <TextField
        id="outlined-basic"
        label="Описание"
        variant="outlined"
        sx={{ width: '100%', marginBottom: '20px' }}
        onChange={(event) => setDescription(event.target.value)}
      />

      <TextField
        id="outlined-basic"
        value={`${lat} ${lng}`}
        variant="outlined"
        disabled={true}
        sx={{ width: '100%', marginBottom: '20px' }}
      />

      <div>
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={onSubmit}>Сохранить</Button>
      </div>
    </div>
  );
}
