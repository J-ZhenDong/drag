import React from "react"
import HomePage from "@/pages/home"
import LoginPage from "@/pages/login"

const routes = [
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  }
]
export default routes