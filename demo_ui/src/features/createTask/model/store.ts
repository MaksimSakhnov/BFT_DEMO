import { createEvent, createStore, sample } from 'effector';
import { createEffect } from 'effector/effector.mjs';
import { tasksApi } from 'shared/api';
import { tasksModel } from 'entities/task';

export const formSubmitted = createEvent<tasksApi.model.ICreateTask>();

export const sendFormFx = createEffect((params: tasksApi.model.ICreateTask) =>
  tasksApi.tasks.createTask({
    description: params.description,
    lat: params.lat,
    lng: params.lng,
    status: params.status,
  }),
);

export const resetForm = createEvent();

export const $isTaskCreated = createStore(false)
  .on(sendFormFx.done, () => true)
  .reset(resetForm);

sample({
  clock: formSubmitted,
  fn: ({ description, lat, lng, status }) => ({
    status,
    description,
    lat,
    lng,
    tasksModel,
  }),
  target: sendFormFx,
});

sample({
  clock: sendFormFx.done,
  target: tasksModel.taskSubModel.fetchTask,
});
