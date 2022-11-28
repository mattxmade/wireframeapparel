import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

import "./index.scss";
import App from "./components/App";
import LocalStorage from "./data/LocalStorage.module";

const pageAccessedByReload = window.performance // [1]
  .getEntriesByType("navigation")
  .map((nav) => nav.type)
  .includes("reload");

if (pageAccessedByReload) LocalStorage.set("visited", false);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// [1] https://stackoverflow.com/a/68842880
