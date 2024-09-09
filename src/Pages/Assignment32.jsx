import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();
var callback;
const PlaceSearchPlugin = ({ map }) => {
  const placeSearchRef = useRef(null);

  useEffect(() => {
    if (map && placeSearchRef.current) {
      mapplsClassObject.removeLayer({ map, layer: placeSearchRef.current });
    }
    var optional_config = {
      location: [28.61, 77.23],
      region: "IND",
      height: 300,
    };
    placeSearchRef.current = mapplsPluginObject.search(
      document.getElementById("auto"),
      optional_config,
      callback
    );
    callback = (data) => {
      console.log(data); /* get search data in console */
    };

    return () => {
      if (map && placeSearchRef.current) {
        mapplsClassObject.removeLayer({ map, layer: placeSearchRef.current });
      }
    };
  }, [map]);
};

const Assignment31 = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const auto = {
    width: "300px",
    position: "absolute",
    zIndex: 999,
    fontSize: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    outline: "none !important",
  };

  const loadObject = { map: true, plugins: ["search"] };

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
      <input
        style={auto}
        type="text"
        id="auto"
        name="auto"
        className="search-outer form-control as-input text-zinc-900 focus:outline-none"
        placeholder="Search places or eLoc's..."
        required=""
        spellCheck="false"
      />
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
      {isMapLoaded && <PlaceSearchPlugin map={mapRef.current} />}
    </div>
  );
};

export default Assignment31;