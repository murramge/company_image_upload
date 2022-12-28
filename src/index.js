import React from "react";
import "./styles/app.css";
import App from "./app";
import RecentRequestHistory from "./API/bcmanager/resentRequestHistory";
import Bizcontent from "./API/consumer/bizcontent";
import { createRoot } from "react-dom/client";

const recentRequest = new RecentRequestHistory(10);
const bizcontent = new Bizcontent();

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App recentRequest={recentRequest} bizcontent={bizcontent} />
  </React.StrictMode>
);
