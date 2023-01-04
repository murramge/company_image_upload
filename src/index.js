import React from "react";
import "./styles/app.css";
import App from "./app";
import RecentRequestHistory from "./API/bcmanager/resentRequestHistory";
import RecentUploadHistory from "./API/bcmanager/recentUploadHistory";
import Bizcontent from "./API/consumer/bizcontent";
import Searchcompany from "./API/bcmanager/searchcompany";

import { createRoot } from "react-dom/client";

const recentRequest = new RecentRequestHistory(10);
const recentUpload = new RecentUploadHistory(10);
const bizcontent = new Bizcontent();
const searchCompany = new Searchcompany();
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App
      recentRequest={recentRequest}
      recentUpload={recentUpload}
      bizcontent={bizcontent}
      searchCompany={searchCompany}
    />
  </React.StrictMode>
);
