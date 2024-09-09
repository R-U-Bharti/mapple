import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const PlacedetailsPlugin = ({ map }) => {
  const placedetailsRef = useRef(null);

  useEffect(() => {
    if (map && placedetailsRef.current) {
      placedetailsRef.current.remove();
      mapplsClassObject.removeLayer({ map, layer: placedetailsRef.current });
    }

    placedetailsRef.current = mapplsPluginObject.getPinDetails(
      { pin: "mmi000" },
      (e) => {
        console.log("map details: ", e); /* get details in console */

        // Add a marker to the map
        const markerObject = new mapplsClassObject.Marker({
          position: { lat: 28.550794, lng: 77.268944 }, // Marker initial position
          map: map, // Attach the marker to the map
        });

        // Change the marker's position and icon
        markerObject.setPosition({ lat: 28.454, lng: 77.5454 });
        markerObject.setIcon("/pin.png");
        markerObject.setPopup(`<div style='color: black;'><h4 style='font-weight: 600; border-bottom: 1px solid gray;'>Marker Address</h4><p>${e?.data?.address}</p></div>`)
        markerObject();
      }
    );
    return () => {
      if (map && placedetailsRef.current) {
        mapplsClassObject.removeLayer({ map, layer: placedetailsRef.current });
      }
    };
  }, [map]);
};

const Assignment31 = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadObject = { map: true, plugins: ["placedetails"] };

  useEffect(() => {
    mapplsClassObject.initialize(sessionStorage.getItem("accessToken") ?? import.meta.env.VITE_ACCESS_TOKEN, loadObject, () => {
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
      {isMapLoaded && <PlacedetailsPlugin map={mapRef.current} />}
    </div>
  );
};

export default Assignment31;