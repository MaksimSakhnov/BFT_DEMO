import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useUnit } from 'effector-react';

import { taskModalUi } from 'widgets/taskModal';

import { tasksModel } from 'entities/task';

import { useClastered } from 'shared/hooks';
import { sharedUiComponents } from 'shared/ui';
import MapIcom from 'shared/images/marker.png';

import styles from 'App.module.scss';
import { fetchTask } from '../../../entities/task/model/tasksList';

const $tasksList = tasksModel.taskSubModel.$tasksList;
const getTasksFx = tasksModel.taskSubModel.getTasksFx;

const { Map } = sharedUiComponents;
const { TaskModal } = taskModalUi.TaskModal;

type CoordinatesType = {
  lat: number;
  lng: number;
};

const MapIcon = L.icon({
  iconUrl: MapIcom,
  iconSize: [22, 26],
  shadowSize: [0, 0], // size of the shadow
  iconAnchor: [9, 22], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 0], // the same for the shadow
  popupAnchor: [0, -10], // point from which the popup should open relative to the iconAnchor
});

export default MapIcon;

export function MainPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, pending] = useUnit([$tasksList, getTasksFx.pending]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    lat: -1,
    lng: -1,
  });

  const tasksLayer = useRef<L.FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    if (window.map) {
      window.map.on('click', (e) => {
        setIsModalOpen(true);
        setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
      });
    }
  }, []);

  useEffect(() => {
    if (tasksLayer.current) {
      tasksLayer.current.clearLayers();
      window.map.removeLayer(tasksLayer.current);
    }

    tasks.map((task) => {
      const newMarker = new L.Marker(L.latLng(task.lat, task.lng), {
        icon: MapIcon,
      });

      newMarker.bindTooltip(`${task.description}`, {
        opacity: 1,
        direction: 'top',
      });

      tasksLayer.current.addLayer(newMarker);
    });

    window.map.addLayer(tasksLayer.current);
  }, [tasks]);

  useClastered(tasksLayer, tasks);

  return (
    <div className={styles.page_main}>
      <TaskModal
        lng={coordinates.lng}
        lat={coordinates.lat}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
      <div className={styles.map}>
        <Map />
      </div>
    </div>
  );
}
