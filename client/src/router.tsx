import { Login, Layout, WishList, NewWish, EditWish } from './pages'
import { Navigate, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/wishes" replace />,
      },
      {
        path: '/wishes',
        element: <WishList />,
      },
      {
        path: '/wishes/new',
        element: <NewWish />,
      },
      {
        path: '/wishes/:uuid/edit',
        element: <EditWish />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
