// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Tasks from './Components/Tasks.jsx'
import Home from './Components/Home.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import ErrorPage from './Components/ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
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
    basename: "/TASKIFY/",
  }
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)