import React from "react"
import type { RouteObject } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import Layout from "@/layout"
import HomePage from "@/pages/home"
import ControlPage from "@/pages/control"
import LoginPage from "@/pages/login"

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        element: <HomePage/>,
        index: true
      },
      {
        path: '/control',
        element: <ControlPage/>
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  }
])

export default routes