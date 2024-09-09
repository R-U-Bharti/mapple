import React from 'react'
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from 'react-loader-spinner';

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const Assignment3 = ({render}) => {

  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadObject = {
    map: true,
    layer: 'raster', // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins: ['direction'] // Optional for All the plugins
  };

  const autoZoomToLevel10 = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        zoom: 16, // Target zoom level
        speed: 1, // Speed of the zoom animation (1.2 is moderate speed)
        curve: 1,  // Controls the smoothness (1 is default)
        essential: true // Ensures smooth animation
      });
    }
  };

  useEffect(() => {
    mapplsClassObject.initialize(import.meta.env.VITE_MAP_KEY, loadObject, () => {
      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.6139, 77.2090],
          zoom: 4,
        },
      });

      newMap.on("load", () => {
        setIsMapLoaded(true);
        // Add a marker to the map
        const markerObject = new mapplsClassObject.Marker({
          position: { lat: 28.5512908, lng: 77.26809282 }, // Marker initial position
          map: newMap, // Attach the marker to the map
        });

        // Change the marker's position and icon
        markerObject.setPosition({ lat: 28.454, lng: 77.5454 });
        markerObject.setIcon("https://apis.mapmyindia.com/map_v3/1.png");
        markerObject();

        autoZoomToLevel10();
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

export default Assignment3