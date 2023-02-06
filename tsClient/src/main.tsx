import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import MapStore from "./store/MapStore";
import UserStore from "./store/UserStore";

export const Context = createContext({
  user: new UserStore(),
  map: new MapStore(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider
    value={{
      user: new UserStore(),
      map: new MapStore(),
    }}
  >
    <App />
  </Context.Provider>
);
