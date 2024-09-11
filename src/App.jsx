import 'animate.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Assignment1 from './Pages/Assignment1'
import Assignment2 from './Pages/Assignment2'
import Assignment3 from './Pages/Assignment3'
import Assignment4 from './Pages/Assignment4'
import Assignment5 from './Pages/Assignment5'
import Assignment6 from './Pages/Assignment6'
import Assignment7 from './Pages/Assignment7'
import Assignment8 from './Pages/Assignment8'
import Assignment9 from './Pages/Assignment9'
import Assignment31 from './Pages/Assignment31'
import Assignment32 from './Pages/Assignment32'
import Assignment33 from './Pages/Assignment33'
import Assignment34 from './Pages/Assignment34'
import Assignment35 from './Pages/Assignment35'
import { useEffect } from 'react'

const App = () => {

  const routes = [
    { path: "/assignment1", element: <Assignment1 /> },
    { path: "/assignment2", element: <Assignment2 /> },
    { path: "/assignment3", element: <Assignment3 /> },
    { path: "/assignment4", element: <Assignment4 /> },
    { path: "/assignment5", element: <Assignment5 /> },
    { path: "/assignment6", element: <Assignment6 /> },
    { path: "/assignment7", element: <Assignment7 /> },
    { path: "/assignment8", element: <Assignment8 /> },
    { path: "/assignment9", element: <Assignment9 /> },

    { path: "/assignment31", element: <Assignment31 /> },
    { path: "/assignment32", element: <Assignment32 /> },
    { path: "/assignment33", element: <Assignment33 /> },
    { path: "/assignment34", element: <Assignment34 /> },
    { path: "/assignment35", element: <Assignment35 /> },
  ]

  return (
    <>
      <BrowserRouter basename='/mapple'>
        <Routes>
          <Route index element={<HomePage />} />
          {
            routes.map((route, index) =>
              <Route key={index} path={route.path} element={route.element} />
            )
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App