import { Root, Login, Layout } from './pages'
import { createBrowserRouter } from "react-router-dom"

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
  },
  {
    path: "/login",
    Component: Login,
  }
])

export default Router
