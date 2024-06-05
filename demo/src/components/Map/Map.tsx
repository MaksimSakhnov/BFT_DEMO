import 'leaflet';
import L from 'leaflet';

import { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';

export function Map() {
  const mapElement = useRef(null);

  useEffect(() => {
    if (!mapElement.current) {
      return;
    }

    window.map = L.map(mapElement.current, {
      center: new L.LatLng(51.505, -0.04),
      zoom: 13,

    });

    const basemapLayer = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
    );
    window.map.addLayer(basemapLayer);
  }, []);

  return <div className={styles.map} ref={mapElement} />;
}
