import React from 'react'
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from 'react-loader-spinner';

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const PolylineComponent = ({ map }) => {
  const polylineRef = useRef(null);

  useEffect(() => {
    if (polylineRef.current) {
      mapplsClassObject.removeLayer({ map: map, layer: polylineRef.current });
    }
    polylineRef.current = mapplsClassObject.Polyline({
      map: map,
      path: [
        { lat: 28.55108, lng: 77.26913 },
        { lat: 28.55106, lng: 77.26906 },
        { lat: 28.55105, lng: 77.26897 },
        { lat: 28.55101, lng: 77.26872 },
        { lat: 28.55099, lng: 77.26849 },
        { lat: 28.55097, lng: 77.26831 },
        { lat: 28.55093, lng: 77.26794 },
        { lat: 28.55089, lng: 77.2676 },
        { lat: 28.55123, lng: 77.26756 },
        { lat: 28.55145, lng: 77.26758 },
        { lat: 28.55168, lng: 77.26758 },
        { lat: 28.55175, lng: 77.26759 },
        { lat: 28.55177, lng: 77.26755 },
        { lat: 28.55179, lng: 77.26753 },
      ],
      fitbounds: true,
      strokeColor: '#0000ff',
      strokeOpacity: 1.0,
      strokeWeight: 10,
      fitbounds: true,
      animate:
      {
        speed: 5,
				icon_width: 35, // or as “35”
        icon_height: 50, // or as “15”,
        icon_url: ("http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png"),
        repeat: true //false,
      },
    });
  });
};

const Assignment6 = () => {

  const map = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    mapplsClassObject.initialize(import.meta.env.VITE_MAP_KEY, { map: true }, () => {
      if (map.current) {
        map.current.remove();
      }
      map.current = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.633, 77.2194],
          zoom: 4,
        },
      });
      map.current.on("load", () => {
        setIsMapLoaded(true);
      });
    });
  }, []);

  return (
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
        </div>
      }
      {isMapLoaded && <PolylineComponent map={map.current} />}
    </div>
  );
};

export default Assignment6