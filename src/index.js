import React from "react";
import ReactDOM from "react-dom";
import "./styles/app.css";
import App from "./app";

import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
