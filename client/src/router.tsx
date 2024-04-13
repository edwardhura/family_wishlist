import { Login, Layout, WishList, NewWish, EditWish } from './pages'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
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
