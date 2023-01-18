import React from "react";
import "./styles/app.css";
import App from "./app";

import Bizcontent from "./API/bizcontent/bizcontent";

import { createRoot } from "react-dom/client";

const bizcontent = new Bizcontent();

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App bizcontent={bizcontent} />
  </React.StrictMode>
);
