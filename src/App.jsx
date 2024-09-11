import { Suspense, lazy } from 'react'
import 'animate.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
const HomePage = lazy(() => import("./Pages/HomePage"));
const Assignment1 = lazy(() => import('./Pages/Assignment1'));
const Assignment2 = lazy(() => import('./Pages/Assignment2'));
const Assignment3 = lazy(() => import('./Pages/Assignment3'));
const Assignment4 = lazy(() => import('./Pages/Assignment4'));
const Assignment5 = lazy(() => import('./Pages/Assignment5'));
const Assignment6 = lazy(() => import('./Pages/Assignment6'));
const Assignment7 = lazy(() => import('./Pages/Assignment7'));
const Assignment8 = lazy(() => import('./Pages/Assignment8'));
const Assignment9 = lazy(() => import('./Pages/Assignment9'));
const Assignment31 = lazy(() => import('./Pages/Assignment31'));
const Assignment32 = lazy(() => import('./Pages/Assignment32'));
const Assignment33 = lazy(() => import('./Pages/Assignment33'));
const Assignment34 = lazy(() => import('./Pages/Assignment34'));
const Assignment35 = lazy(() => import('./Pages/Assignment35'));

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
        <Suspense fallback={<div className='h-screen w-screen flex items-center justify-center text-white italic'>Component Loading...</div>}>
          <Routes>
            <Route index element={<HomePage />} />
            {
              routes.map((route, index) =>
                <Route key={index} path={route.path} element={route.element} />
              )
            }
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App