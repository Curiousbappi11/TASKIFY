// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './CustomHooks/ContextProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Tasks from './Components/Tasks.jsx'
import Home from './Components/Home.jsx'
import { Component } from 'react'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "tasks",
        Component: Tasks
      },
    ],
  },
],
{
  basename: "/TASKIFY",
}
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)