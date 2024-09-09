import React from 'react'
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { Grid } from 'react-loader-spinner';

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const Assignment2 = ({render}) => {

    const mapRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const loadObject = {
        map: true,
        layer: 'raster', // Optional: Default is Vector
        version: '3.0', // Optional: Version 3.5 is also available with CSP headers
        libraries: ['polydraw'], // Optional for Polydraw and airspaceLayers
        plugins: ['direction'] // Optional for All plugins
    };

    const autoZoomToLevel10 = () => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                zoom: 10, // Target zoom level
                speed: 1.2, // Speed of the zoom animation (1.2 is moderate speed)
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
                    center: [28.633, 77.2194],
                    zoom: 4,
                },
            });

            newMap.on("load", () => {
                setIsMapLoaded(true);
                autoZoomToLevel10(); // Trigger the zoom once the map is fully loaded
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

export default Assignment2