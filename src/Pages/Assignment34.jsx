import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const NearbySearchPlugin = ({ map, category = "atm" }) => {
  const nearbysearchRef = useRef(null);

  useEffect(() => {
    if (map && nearbysearchRef.current) {
      nearbysearchRef.current.remove();
      mapplsClassObject.removeLayer({ map, layer: nearbysearchRef.current });
    }
    var options = {
      divId: "nearby_search",
      map: map,
      keywords: category,
      refLocation: "28.632735,77.219696",
      fitbounds: true,
      icon: {
        url: "https://apis.mappls.com/map_v3/1.png",
      },
      popupOptions: {
        color: '#000'
      },
      click_callback: function (d) {
        if (d) {
          var l =
            "Name: " +
            d.placeName +
            "\nAddress: " +
            d.placeAddress +
            "\neLoc: " +
            d.eLoc;
          alert(l);
        }
      },
    };

    nearbysearchRef.current = mapplsPluginObject.nearby(
      options,
      function (data) {
        let nr = data;
        console.log(nr);
      }
    );

    return () => {
      if (map && nearbysearchRef.current) {
        mapplsClassObject.removeLayer({ map, layer: nearbysearchRef.current });
      }
    };
  }, [map, category]);
};

const Assignment34 = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [category, setCategory] = useState('')
  const [temp, setTemp] = useState('')

  const auto = {
    width: "300px",
    position: "absolute",
    zIndex: 999,
    fontSize: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    outline: "none !important",
  };

  const loadObject = { map: true, plugins: ["nearby"] };

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
      style={{ width: "100%", height: "99vh", display: "inline-block" }}
    >
      <input
        style={auto}
        type="text"
        id="auto"
        name="auto"
        className="search-outer form-control as-input text-zinc-900 focus:outline-none"
        placeholder="Type category..."
        required=""
        spellCheck="false"
        onChange={e => setTemp(e.target.value)}
      />
      <button onClick={() => setCategory(temp)} className="text-white bg-green-600 hover:bg-green-500 px-3 py-1 w-max " style={{
        position: "absolute",
        zIndex: 999,
        fontSize: "15px",
        padding: "10px",
        left: "300px"
      }}>Go</button>
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
      {isMapLoaded && <NearbySearchPlugin map={mapRef.current} category={category} />}
    </div>
  );
};

export default Assignment34