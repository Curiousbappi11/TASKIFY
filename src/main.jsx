// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import ErrorPage from './Components/ErrorPage.jsx'
import Home from './Components/Home.jsx'
import Tasks from './Components/Tasks.jsx'
import Notes from './Components/Notes.jsx'
import Reminders from './Components/Reminders.jsx'
import Pomodoro from './Components/Pomodoro.jsx'
import Calendar from './Components/Calendar.jsx'

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
        path: 'tasks',
        Component: Tasks
      },
      {
        path: 'notes',
        Component: Notes
      },
      {
        path: 'reminders',
        Component: Reminders
      },
      {
        path: 'pomodoro',
        Component: Pomodoro
      },
      {
        path: 'calendar',
        Component: Calendar
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