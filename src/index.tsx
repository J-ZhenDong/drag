import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
// import '@/styles'
import App from "./App";
import './i18n'
import './index.css'
const container = document.getElementById("root")!;
document.documentElement.setAttribute('data-theme', 'dark')
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </Provider>
);
