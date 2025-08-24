import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // optional, if you want to add global styles

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);