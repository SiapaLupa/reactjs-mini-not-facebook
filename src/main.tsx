import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './Landing'
import Post from './Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import NavBar from "./templates/NavBar";
import Notification from './Notification';
import SignOut from './SignOut';
import Home from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signout",
    element: <SignOut />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/notification",
    element: <Notification />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
