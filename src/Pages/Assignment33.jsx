import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const GetdistancePlugin = ({ map }) => {
  const getDistanceRef = useRef(null);

  useEffect(() => {
    if (map && getDistanceRef.current) {
      getDistanceRef.current.remove();
      mapplsClassObject.removeLayer({ map, layer: getDistanceRef.current });
    }

    getDistanceRef.current = mapplsPluginObject.getDistance(
      {
        map: map,
        coordinates: "mmi000;123zrr",
        eloc: ["mmi000", "123zrr"],
        popupHtml: ["<h1>MMI</h1>”,”<h1>Agra</h1>"],
        html: ["1", "2"],
        icon: { url: "http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png", width: 35, height: 50 },
      },
      callback_method
    );
    function callback_method(data) {
      console.log(data);
    }
    return () => {
      if (map && getDistanceRef.current) {
        mapplsClassObject.removeLayer({ map, layer: getDistanceRef.current });
      }
    };
  }, [map]);
};

const Assignment33 = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadObject = { map: true, plugins: ["getDistance"] };

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
      {isMapLoaded && <GetdistancePlugin map={mapRef.current} />}
    </div>
  );
};

export default Assignment33;