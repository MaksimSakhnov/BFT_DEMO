import { client } from '../base';
import { ICreateTask, IStatus } from './model';

export const getTasks = async () => {
  const response = await client.get('tasks');
  return response.data;
};

export const createTask = async (data: ICreateTask) => {
  const response = await client.post('tasks', data);

  return response.data;
};

export const changeTaskStatus = async (id: number, data: IStatus) => {
  await client.patch(`tasks/${id}/status`, data);
};
