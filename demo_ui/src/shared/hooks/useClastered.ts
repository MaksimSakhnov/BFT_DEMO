import L from 'leaflet';
import { MutableRefObject, useRef } from 'react';
import { tasksApi } from 'shared/api';
import { LatLng, LatLngBounds } from 'leaflet';

type ITask = tasksApi.model.ITask;

const isPointInBounds = (
  point: { lat: number; lng: number },
  bounds: {
    topLeft: { lat: number; lng: number };
    bottomRight: { lat: number; lng: number };
  },
) => {
  return (
    point.lat >= bounds.topLeft.lat &&
    point.lng <= bounds.topLeft.lng &&
    point.lat <= bounds.bottomRight.lat &&
    point.lng >= bounds.bottomRight.lng
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function drawPolygonsForCells(grid) {
  const layer = new L.FeatureGroup();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  grid.forEach((cell) => {
    // Создаем массив координат для полигона
    const polygonCoords = [
      [cell.topLeft.lat, cell.topLeft.lng],
      [cell.bottomRight.lat, cell.bottomRight.lng],
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    L.rectangle(polygonCoords, { color: 'blue' }).addTo(layer);
  });

  return layer;
}

function getClustered(tasks: ITask[], bounds: LatLngBounds, zoom: number) {
  const southwest = bounds.getSouthWest();
  const northeast = bounds.getNorthEast();

  const size = window.map.getSize();
  const width = size.x;
  const height = size.y;

  const zoomFactor = Math.log(zoom) / Math.LN2;
  const baseCellSize = 50;

  const cellsX = Math.ceil(width / (baseCellSize * zoomFactor));
  const cellsY = Math.ceil(height / (baseCellSize * zoomFactor));

  const grid: { topLeft: LatLng; bottomRight: LatLng; markers: ITask[] }[] = [];

  for (let x = 0; x < cellsX; x++) {
    for (let y = 0; y < cellsY; y++) {
      const topLeft = L.latLng(
        southwest.lat +
          ((y * baseCellSize * zoomFactor) / height) *
            (northeast.lat - southwest.lat),
        southwest.lng +
          ((x * baseCellSize * zoomFactor) / width) *
            (northeast.lng - southwest.lng),
      );
      const bottomRight = L.latLng(
        topLeft.lat +
          ((baseCellSize * zoomFactor) / height) *
            (northeast.lat - southwest.lat),
        topLeft.lng +
          ((baseCellSize * zoomFactor) / width) *
            (northeast.lng - southwest.lng),
      );

      grid.push({
        topLeft: topLeft,
        bottomRight: bottomRight,
        markers: [],
      });
    }
  }

  tasks.forEach((el) => {
    grid.forEach((cell) => {
      const result = isPointInBounds(
        { lat: el.lat, lng: el.lng },
        { topLeft: cell.topLeft, bottomRight: cell.bottomRight },
      );

      if (result) {
        cell.markers.push(el);
      }
    });
  });

  return drawPolygonsForCells(grid);
}

export function useClastered(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refToLayer: MutableRefObject<L.FeatureGroup>,
  tasks: ITask[],
) {
  const eventFunction = useRef<(() => void) | null>(null);
  const polygons = useRef(L.featureGroup());

  if (window.map) {
    if (eventFunction.current) window.map.off('zoomend', eventFunction.current);

    eventFunction.current = () => {
      if (window.map) {
        window.map.removeLayer(polygons.current);
      }
      const zoom = window.map.getZoom();
      const bounds = window.map.getBounds();
      polygons.current = getClustered(tasks, bounds, zoom);
      window.map.addLayer(polygons.current);
      // refToLayer.current.eachLayer((el) => {
      //   if (zoom < 19) {
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //     el.setOpacity(0);
      //   } else {
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //
      //     el.setOpacity(1);
      //   }
      // });
    };

    window.map.on('zoomend', eventFunction.current);
  }
}
