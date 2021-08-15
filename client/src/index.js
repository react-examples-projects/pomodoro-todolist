import React from "react";
import ReactDOM from "react-dom";
import Routers from "./Components/Routers";
import "tiny-ui/dist/styles/index.css";
import "./Styles/App.scss";

ReactDOM.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
  document.getElementById("root")
);
