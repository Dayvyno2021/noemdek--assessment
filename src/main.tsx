import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Scheduling from './screens/Reservations/Scheduling.tsx';
import Bookings from './screens/Reservations/Bookings.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<h3>Homepage is empty, navigate to scheduling</h3>}/>
      <Route path='/scheduling' element={<Scheduling/>}/>
      <Route path='/bookings' element={<Bookings/>}/>
      <Route path='/*' element={<h2>Page is vacant</h2>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
