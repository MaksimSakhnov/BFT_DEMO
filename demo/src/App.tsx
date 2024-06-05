import React from 'react';
import Map from 'components/Map';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.page_main}>
      <div className={styles.map}>
        <Map />
      </div>
    </div>
  );
}

export default App;
