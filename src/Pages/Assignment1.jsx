import React from 'react'
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from 'react-loader-spinner';

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const Assignment1 = () => {

  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadObject = {
    map: true,
    layer: 'raster', // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins: ['direction'] // Optional for All the plugins
  };

  useEffect(() => {
    mapplsClassObject.initialize(import.meta.env.VITE_MAP_KEY, loadObject, () => {
      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.633, 77.2194],
          zoom: 4,
        },
      });

      newMap.on("load", () => {
        setIsMapLoaded(true);
      });
      mapRef.current = newMap;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <>
      <div
        id="map"
        style={{ width: "100%", height: "100vh", display: "inline-block" }}
      >
        {!isMapLoaded &&
          <div className="" style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Grid
              visible={true}
              height="80"
              width="80"
              color="#ffffff"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperClass="grid-wrapper"
            />
            <div style={{ fontWeight: '500', fontSize: '14px', color: 'white' }}>Loading Map...</div>
          </div>}
        {isMapLoaded}
      </div>
    </>
  );
}

export default Assignment1