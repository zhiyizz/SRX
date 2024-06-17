import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import {  createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.scss'
// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<Home />
//   }
// ])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
