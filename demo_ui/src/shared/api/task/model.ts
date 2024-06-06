export interface ITask {
  id: number;
  description: string;
  status: boolean;
  lat: number;
  lng: number;
}

export type ICreateTask = Omit<ITask, 'id'>;

export interface IStatus {
  status: boolean;
}
