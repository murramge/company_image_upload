import React from "react";
import "./styles/app.css";
import App from "./app";

import Bizcontent from "./API/bizcontent/bizcontent";

import { createRoot } from "react-dom/client";
import Auth from "./API/auth/auth";

const bizcontent = new Bizcontent();
const auth = new Auth();
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App bizcontent={bizcontent} auth={auth} />
  </React.StrictMode>
);
