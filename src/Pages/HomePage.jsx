import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

import assignmentRaw1 from './Assignment1.jsx?raw';
import assignmentRaw2 from './Assignment2.jsx?raw';
import assignmentRaw3 from './Assignment3.jsx?raw';
import assignmentRaw4 from './Assignment4.jsx?raw';
import assignmentRaw5 from './Assignment5.jsx?raw';
import assignmentRaw6 from './Assignment6.jsx?raw';
import assignmentRaw7 from './Assignment7.jsx?raw';
import assignmentRaw8 from './Assignment8.jsx?raw';
import assignmentRaw9 from './Assignment9.jsx?raw';

import assignmentRaw31 from './Assignment31.jsx?raw';
import assignmentRaw32 from './Assignment32.jsx?raw';
import assignmentRaw33 from './Assignment33.jsx?raw';
import assignmentRaw34 from './Assignment34.jsx?raw';
import assignmentRaw35 from './Assignment35.jsx?raw';
import axios from "axios";

const HomePage = () => {

    const [toggle, setToggle] = useState('')
    const [viewType, setViewType] = useState('output')
    const [section, setSection] = useState('1')
    const [loader, setLoader] = useState(false)
    const [ifLoader, setIfLoader] = useState('')

    const assignments1 = [
        { id: 10, count: 1, question: "How to integrate Mappls SDKs?" },
        { id: 20, count: 2, question: "How does it initialize Mappls SDKs?" },
        { id: 30, count: 3, question: "How to show a popup on click of Map Marker?" },
    ]
    const assignments2 = [
        { id: 1, question: "How to show Mappls Map?" },
        { id: 2, question: "How to set zoom level and center of Map with animation?" },
        { id: 3, question: "How to plot a marker on Mappls Map?" },
        { id: 4, question: "Add a custom marker and when we click on the marker then display a custom pop-up." },
        { id: 5, question: "How to plot a polyline on Mappls Map?." },
        { id: 6, question: "How to plot a polyline with custom color on Mappls Map ?" },
        { id: 7, question: "How to plot a polygon on Mappls Map ?" },
        { id: 8, question: "How to plot a polygon with custom color ?" },
        { id: 9, question: "How to plot a polygon with opacity ?" },
    ]
    const assignments3 = [
        { id: 31, count: 1, question: "How to get human readable address information at a location/coordinate?" },
        { id: 32, count: 2, question: "How to get details of a place by its name?" },
        { id: 33, count: 3, question: "How to get road distance between two locations?" },
        { id: 34, count: 4, question: "How to get nearby places from a location of some specific category?" },
        { id: 35, count: 5, question: "How to get an image of a map with markers?" },
    ]

    const toggleFun = (id) => {
        if (toggle == id) {
            setToggle('')
            setIfLoader('')
        }
        else {
            setViewType('output')
            setToggle(id)
            setIfLoader(id)
        }
    }

    const viewFun = (type) => {
        setViewType(type)
    }

    const an10 = `
    1.	Sign Up on Mappls i.e. https://www.mappls.com .
    2.	Get the license key.
    3.	Go to the documentation : https://github.com/mappls-api/mappls-web-maps
    4.	Then follow the steps.
    `
    const an20 = `
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

//   Render the map 
   <div
        id="map"
        style={{ width: "100%", height: "100vh", display: "inline-block" }}
      >
    {isMapLoaded}
</div>
    `
    const an30 = `
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
      });

      mapRef.current = newMap;
    });

//   Render the map 
   <div
        id="map"
        style={{ width: "100%", height: "100vh", display: "inline-block" }}
      >
    {isMapLoaded}
</div>
    `

    useEffect(() => {

        if (section == 3 && !sessionStorage.getItem("accessToken")) {
            let body = {
                grant_type: "client_credentials",
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET
            }

            setLoader(true)

            axios.post("https://outpost.mappls.com/api/security/oauth/token", body, {
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                }
            })
                .then((res) => {
                    console.log("map key response: ", res)
                    sessionStorage.setItem("accessToken", res?.data?.access_token)
                })
                .catch((err) => {
                    console.log("map key error: ", err)
                })
                .finally(() => setLoader(false))
        }
    }, [section])

    return (
        <>
            <div className="w-screen flex justify-center *:text-slate-50">
                <div className="max-w-[1366px] w-full px-2">

                    <div className="w-full flex justify-center">
                        <h1 className='text-2xl font-medium text-center py-2 mt-2 mb-6 border-b w-max px-10'>Mappls' Map By <span className="font-bold text-amber-400">R U Bharti</span></h1>
                    </div>

                    <div className="w-full flex items-center justify-between mb-4 ">
                        <div onClick={() => setSection("1")} className={`w-1/3 text-center border-b-2 py-1 cursor-pointer hover:bg-amber-500/60 ${section == 1 && 'bg-amber-500/90 border-amber-700'}`}>Section 1</div>
                        <div onClick={() => setSection("2")} className={`w-1/3 text-center border-b-2 py-1 cursor-pointer hover:bg-amber-500/60 ${section == 2 && 'bg-amber-500/90 border-amber-700'}`}>Section 2</div>
                        <div onClick={() => setSection("3")} className={`w-1/3 text-center border-b-2 py-1 cursor-pointer hover:bg-amber-500/60 ${section == 3 && 'bg-amber-500/90 border-amber-700'}`}>Section 3</div>
                    </div>

                    <div className='w-full flex flex-col flex-wrap gap-4 mb-4'>
                        {
                            section == 1 && assignments1.map((elem, index) =>
                                <div className={`animate__animated animate__slideInRight animate__faster border ${toggle == elem.id ? 'border-green-400 bg-green-600/90 text-white hover:shadow-[0px_0px_20px_rgba(0,255,0,0.8)] h-full' : 'border-red-400 text-red-100 hover:bg-red-600/90 hover:text-white hover:shadow-[0px_0px_20px_rgba(255,0,0,0.8)]'} cursor-pointer w-full px-10 py-4`}>
                                    <div key={index} onClick={() => toggleFun(elem.id)} className={`${toggle == elem.id && "pb-4"} flex items-center justify-between`}>
                                        <p>{elem.count}. &nbsp;{elem.question}</p>
                                        <button className="px-4 text-sm bg-amber-800 border py-1 rounded hover:bg-amber-600">{toggle == elem.id ? "Hide" : "View"}</button>
                                    </div>
                                    <div className={`${toggle == elem.id ? '' : 'hidden'} `}>
                                        <div className={`block h-full overflow-auto`}>
                                            {toggle == 10 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {an10}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 20 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {an20}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 30 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {an30}
                                                </SyntaxHighlighter>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        {
                            section == 2 && assignments2.map((elem, index) =>
                                <div className={`animate__animated animate__slideInRight animate__faster border ${toggle == elem.id ? 'border-green-400 bg-green-600/90 text-white hover:shadow-[0px_0px_20px_rgba(0,255,0,0.8)] h-full' : 'border-red-400 text-red-100 hover:bg-red-600/90 hover:text-white hover:shadow-[0px_0px_20px_rgba(255,0,0,0.8)]'} cursor-pointer w-full px-10 py-4`}>
                                    <div key={index} onClick={() => toggleFun(elem.id)} className={`${toggle == elem.id && "pb-4"} flex items-center justify-between`}>
                                        <p>{elem.id}. &nbsp;{elem.question} {ifLoader == elem.id && <span className="italic text-sm">(Loading Output)</span>}</p>
                                        <button className="px-4 text-sm bg-amber-800 border py-1 rounded hover:bg-amber-600">{toggle == elem.id ? "Hide" : "View"}</button>
                                    </div>
                                    <div className={`${toggle == elem.id ? '' : 'hidden'} `}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <button onClick={() => viewFun('code')} className={`px-4 py-1 ${viewType == 'code' ? 'bg-gray-900' : 'text-white'} shadow-[0px_0px_15px_rgba(0,0,0,0.3)] font-medium hover:bg-gray-900 border hover:text-white border-slate-900 text-xs rounded `}>Code</button>
                                            <button onClick={() => viewFun('output')} className={`px-4 py-1 ${viewType == 'output' ? 'bg-violet-900' : 'text-white'} shadow-[0px_0px_15px_rgba(0,0,0,0.3)] font-medium hover:bg-violet-900 hover:text-white border border-violet-900 text-xs rounded `}>Output</button>
                                            <button onClick={() => window.open(`/mapple/assignment${elem.id}`, '_blank')} className="px-4 py-1 text-sky-50 font-medium border border-blue-800 text-xs rounded ">Open in new tab</button>
                                        </div>
                                        <div className={`${viewType == 'output' ? '' : 'hidden'}`}>
                                            <iframe
                                                onLoad={() => setIfLoader('')}
                                                src={`/mapple/assignment${toggle}`}
                                                style={{ width: '100%', height: '80vh', border: 'none' }}
                                                title={`Assignment ${toggle} Output`}
                                            />
                                        </div>
                                        <div className={`${viewType == 'code' ? 'block h-[80vh] overflow-auto' : 'hidden'}`}>
                                            {toggle == 1 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw1}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 2 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw2}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 3 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw3}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 4 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw4}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 5 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw5}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 6 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw6}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 7 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw7}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 8 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw8}
                                                </SyntaxHighlighter>
                                            }
                                            {toggle == 9 &&
                                                <SyntaxHighlighter language="javascript" style={coy}>
                                                    {assignmentRaw9}
                                                </SyntaxHighlighter>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        {
                            section == 3 && (
                                !loader ?
                                    <>
                                        {assignments3.map((elem, index) =>
                                            <div className={`animate__animated animate__slideInRight animate__faster border ${toggle == elem.id ? 'border-green-400 bg-green-600/90 text-white hover:shadow-[0px_0px_20px_rgba(0,255,0,0.8)] h-full' : 'border-red-400 text-red-100 hover:bg-red-600/90 hover:text-white hover:shadow-[0px_0px_20px_rgba(255,0,0,0.8)]'} cursor-pointer w-full px-10 py-4`}>
                                                <div key={index} onClick={() => toggleFun(elem.id)} className={`${toggle == elem.id && "pb-4"} flex items-center justify-between`}>
                                                    <p>{elem.count}. &nbsp;{elem.question} {ifLoader == elem.id && <span className="italic text-sm">(Loading Output)</span>}</p>
                                                    <button className="px-4 text-sm bg-amber-800 border py-1 rounded hover:bg-amber-600">{toggle == elem.id ? "Hide" : "View"}</button>
                                                </div>
                                                <div className={`${toggle == elem.id ? '' : 'hidden'} `}>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <button onClick={() => viewFun('code')} className={`px-4 py-1 ${viewType == 'code' ? 'bg-gray-900' : 'text-white'} shadow-[0px_0px_15px_rgba(0,0,0,0.3)] font-medium hover:bg-gray-900 border hover:text-white border-slate-900 text-xs rounded `}>Code</button>
                                                        <button onClick={() => viewFun('output')} className={`px-4 py-1 ${viewType == 'output' ? 'bg-violet-900' : 'text-white'} shadow-[0px_0px_15px_rgba(0,0,0,0.3)] font-medium hover:bg-violet-900 hover:text-white border border-violet-900 text-xs rounded `}>Output</button>
                                                        <button onClick={() => window.open(`/mapple/assignment${elem.id}`, '_blank')} className="px-4 py-1 text-sky-50 font-medium border border-blue-800 text-xs rounded ">Open in new tab</button>
                                                    </div>
                                                    <div className={`${viewType == 'output' ? '' : 'hidden'}`}>
                                                        <iframe
                                                            onLoad={() => setIfLoader('')}
                                                            src={`/mapple/assignment${toggle}`}
                                                            style={{ width: '100%', height: '80vh', border: 'none' }}
                                                            title={`Assignment ${toggle} Output`}
                                                        />
                                                    </div>
                                                    <div className={`${viewType == 'code' ? 'block h-[80vh] overflow-auto' : 'hidden'}`}>
                                                        {toggle == 31 &&
                                                            <SyntaxHighlighter language="javascript" style={coy}>
                                                                {assignmentRaw31}
                                                            </SyntaxHighlighter>
                                                        }
                                                        {toggle == 32 &&
                                                            <SyntaxHighlighter language="javascript" style={coy}>
                                                                {assignmentRaw32}
                                                            </SyntaxHighlighter>
                                                        }
                                                        {toggle == 33 &&
                                                            <SyntaxHighlighter language="javascript" style={coy}>
                                                                {assignmentRaw33}
                                                            </SyntaxHighlighter>
                                                        }
                                                        {toggle == 34 &&
                                                            <SyntaxHighlighter language="javascript" style={coy}>
                                                                {assignmentRaw34}
                                                            </SyntaxHighlighter>
                                                        }
                                                        {toggle == 35 &&
                                                            <SyntaxHighlighter language="javascript" style={coy}>
                                                                {assignmentRaw35}
                                                            </SyntaxHighlighter>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </> :
                                    <>
                                        <div className="py-2 text-center font-medium bg-slate-500 animate-pulse">
                                            Fetching Token...
                                        </div>
                                    </>
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomePage