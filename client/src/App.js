import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { authRoutes, publicRoutes } from "./routes";
import css from "./App.css";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import {
  getCarts,
  getSection,
  getTractor,
  getMachine,
} from "./http/requests.ts";

function App() {
  const { map } = useContext(Context);
  useEffect(() => {
    getCarts(map);
    getSection(map);
    getTractor(map);
    getMachine(map);
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
