import React from "react";
import ReactDOM from "react-dom/client";
import Temp from "./Temp.jsx";  // <-- Make sure the T is capital, matches filename
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Temp />
  </React.StrictMode>
);

