import { Login, Layout } from './pages'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
  },
  {
    path: '/login',
    Component: Login,
  },
])
