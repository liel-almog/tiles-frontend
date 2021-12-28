import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { AuthContextProvider } from "./contexts/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
