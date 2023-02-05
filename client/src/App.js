import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./modules/NavBar";
import { authRoutes, publicRoutes } from "./routes";
import css from "./App.css";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import {
  getCarts,
  getSection,
  getTractor,
  getMachine,
  getGrades,
} from "./http/requests.ts";

import { supabase } from "./http/requests";

function App() {
  const { map, user } = useContext(Context);
  useEffect(async () => {
    const session = await supabase.auth.refreshSession();
    console.log(session.data.session);
    console.log(session);
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      user.setIsAuth(true);
    }
    console.log(error);
    console.log(data);
  }, []);

  useEffect(() => {
    getCarts(map);
    getSection(map);
    getTractor(map);
    getMachine(map);
    getGrades(map);
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
