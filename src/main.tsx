import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Post from './Post'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './Login';
import Register from './Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post",
    element: <Post />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
