import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Loader from "./components/Loader";
import "./index.css";
import MapStore from "./store/MapStore";
import UserStore from "./store/UserStore";
import BusinessStore from "./store/BusinessStore";

export const Context = createContext({
  user: new UserStore(),
  map: new MapStore(),
  business: new BusinessStore(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider
    value={{
      user: new UserStore(),
      map: new MapStore(),
      business: new BusinessStore(),
    }}
  >
    <App />
  </Context.Provider>
);
