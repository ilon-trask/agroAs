import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./modules/NavBar";
import { useEffect, useContext } from "react";
import { Context } from "./main";
import "./App.css";
import {
  getCarts,
  getSection,
  getTractor,
  getMachine,
  getGrades,
} from "./http/requests";
import { supabase } from "./http/requests";

function App() {
  const { map, user } = useContext(Context);
  useEffect(() => {
    (async () => {
      const session = await supabase.auth.refreshSession();
      console.log(session.data.session);
      console.log(session);
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        user.setIsAuth(true);
      }
      console.log(error);
      console.log(data);
    })();
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
