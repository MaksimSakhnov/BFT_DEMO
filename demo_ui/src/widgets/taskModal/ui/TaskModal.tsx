import { Dialog, DialogTitle } from '@mui/material';
import { createTaskUi } from 'features/createTask';

import styles from './TaskModal.module.scss';

const CreateTaskForm = createTaskUi.CreateTaskUi.CreateTaskForm;

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  lat: number;
  lng: number;
};

export function TaskModal({ open, lng, lat, onClose }: TaskModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать задачу</DialogTitle>
      <div className={styles.content}>
        <CreateTaskForm lat={lat} lng={lng} onClose={onClose} />
      </div>
    </Dialog>
  );
}
