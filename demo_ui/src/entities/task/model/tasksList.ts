import { createEffect, createEvent, createStore, sample } from 'effector';
import { tasksApi } from 'shared/api';

type Task = tasksApi.model.ITask;

export const pageInit = createEvent();
export const fetchTask = createEvent();

export const getTasksFx = createEffect(() => {
  return tasksApi.tasks.getTasks();
});

export const $tasksList = createStore<Task[]>([]).on(
  getTasksFx.doneData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_, data) => data,
);

sample({
  clock: pageInit,
  target: getTasksFx,
});

sample({
  clock: fetchTask,
  target: getTasksFx,
});
