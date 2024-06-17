import React from 'react'
import 'core-js';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import App from './App.tsx'
import Promotion from './pages/promotion/index.tsx'
import Professional from './pages/professional/index.tsx'
import Equity from './pages/equity/index.tsx'
import Spraypaint from './pages/spraypaint/index.tsx'
import Upkeep from './pages/upkeep/index.tsx'
import Maintenance from './pages/maintenance/index.tsx'
import Workshop from './pages/workshop/index.tsx'
import Delivery from './pages/delivery/index.tsx'
import './index.scss'
import './utils/rem.ts'
// import 'amfe-flexible'
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  //   children:[
  //     {
  //       path: "/promotion",
  //       element: <Promotion />,
  //     },
  //     {
  //       path: "professional",
  //       element: <Professional />,
  //     },
  //     {
  //       path: "/care/equity",
  //       element: <Equity /> ,
  //     },
  //     {
  //       path: "/care/spraypaint",
  //       element: <Spraypaint /> ,
  //     },
  //     {
  //       path: "/care/upkeep",
  //       element: <Upkeep /> ,
  //     },
  //     {
  //       path: "/care/maintenance",
  //       element: <Maintenance /> ,
  //     },
  //     {
  //       path: "/care/workshop",
  //       element: <Workshop /> ,
  //     },
  //     {
  //       path: "/care/delivery",
  //       element: <Delivery /> ,
  //     }
  //   ]
  // },
  
  {
    path: "/",
    element: <App />,
  },
  {
    path: "promotion",
    element: <Promotion />,
  },
  {
    path: "professional",
    element: <Professional />,
  },
  {
    path: "equity",
    element: <Equity /> ,
  },
  {
    path: "spraypaint",
    element: <Spraypaint /> ,
  },
  {
    path: "upkeep",
    element: <Upkeep /> ,
  },
  {
    path: "maintenance",
    element: <Maintenance /> ,
  },
  {
    path: "workshop",
    element: <Workshop /> ,
  },
  {
    path: "delivery",
    element: <Delivery /> ,
  }


],{basename:"/care/"});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
      <>
      <RouterProvider router={router}  />
      </>

     
    // <BrowserRouter>
    //   <Routes >
    //     <Route path="/care">
    //       <Route index element={<App />} />
    //       <Route path="/care/promotion"  element={<Promotion />} />
    //       <Route path="/care/professional"  element={<Professional />} />
    //       <Route path="/care/equity"  element={<Equity />} />
    //       <Route path="/care/spraypaint"  element={<Spraypaint />} />
    //       <Route path="/care/upkeep"  element={<Upkeep />} />
    //       <Route path="/care/maintenance"  element={<Maintenance />} />
    //       <Route path="/care/workshop"  element={<Workshop />} />
    //       <Route path="/care/delivery"  element={<Delivery />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  // </React.StrictMode>,
)
