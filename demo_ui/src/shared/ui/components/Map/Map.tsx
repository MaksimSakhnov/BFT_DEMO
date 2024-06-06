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
      center: new L.LatLng(51.51341860891628, 45.999143055442566),
      zoom: 13,
    });

    const basemapLayer = L.tileLayer(
      'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
    );
    window.map.addLayer(basemapLayer);
  }, []);

  return <div className={styles.map} ref={mapElement} />;
}
