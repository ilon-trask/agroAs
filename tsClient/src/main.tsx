import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Loader from "./components/Loader";
import "./index.css";
import MapStore from "./store/MapStore";
import UserStore from "./store/UserStore";
import BusinessStore from "./store/BusinessStore";
import IncomeStore from "./store/IncomeStore";
import TEJStore from "./store/TEJStore";
import EnterpriseStore from "./store/EnterpriseStore";

export const Context = createContext({
  user: new UserStore(),
  map: new MapStore(),
  business: new BusinessStore(),
  income: new IncomeStore(),
  TEJ: new TEJStore(),
  enterpriseStore: new EnterpriseStore(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider
    value={{
      user: new UserStore(),
      map: new MapStore(),
      business: new BusinessStore(),
      income: new IncomeStore(),
      TEJ: new TEJStore(),
      enterpriseStore: new EnterpriseStore(),
    }}
  >
    <App />
  </Context.Provider>
);
