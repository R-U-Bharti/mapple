import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";

const mapplsClassObject = new mappls();

var mixjson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [28.5495, 77.267854],
      },
      properties: {
        name: "MapmyIndia old Office",
        description: "Okhla delhi",
        icon: "https://apis.mapmyindia.com/map_v3/1.png",
        "icon-size": 1,
        text: "",
        "text-size": 20,
        "text-offset": [0, 0],
        "text-color": "red",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [28.5510446, 77.268952],
      },
      properties: {
        name: '<div onclick="function1()">MapmyIndia New Office</div>',
        description: "68,Okhla delhi",
        icon: "https://apis.mapmyindia.com/map_v3/1.png",
        "icon-size": 0.55,
        text: "1",
        "icon-offset": [0, -20],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [28.551042, 77.268953],
          [28.551005, 77.268649],
          [28.550986, 77.268392],
          [28.550967, 77.268231],
          [28.550967, 77.268177],
          [28.550958, 77.268016],
          [28.55092, 77.267587],
          [28.550722, 77.267651],
          [28.55042, 77.267823],
          [28.550128, 77.267802],
          [28.549751, 77.267995],
          [28.549652, 77.268039],
        ],
      },
      properties: {
        name: "Direction1",
        description: "Direction2",
        stroke: "#33CC00",
        "stroke-opacity": 0.6509803921568628,
        "stroke-width": 10,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.550868798522835, 77.26878225803375],
            [28.550868798522835, 77.26899683475493],
            [28.550383454405356, 77.26903975009918],
            [28.550388166494926, 77.26883590221404],
          ],
        ],
      },
      properties: {
        name: "MapmyIndia Head Office",
        stroke: "#0000ff",
        "stroke-opacity": 0.9, // change the stroke opacity
        "stroke-width": 3,
        fill: "#0000ff",
        "fill-opacity": 0.2, // change the polygon opacity
      },
    },
  ],
};

const GeoJsonComponent = ({ map }) => {
  const geoJsonRef = useRef(null);

  useEffect(() => {
    if (geoJsonRef.current) {
      mapplsClassObject.removeLayer({ map: map, layer: geoJsonRef.current });
    }
    geoJsonRef.current = mapplsClassObject.addGeoJson({
      map: map,
      data: mixjson,
      overlap: false,
      fitbounds: true,
      preserveViewport: true,
    });
  });
};

const Assignment9 = () => {
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
      style={{ width: "100%", height: "99vh", display: "inline-block" }}
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
      {isMapLoaded && <GeoJsonComponent map={map.current} />}
    </div>
  );
};

export default Assignment9