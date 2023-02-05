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

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bicofnobkczquxvztyzl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY29mbm9ia2N6cXV4dnp0eXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5MjQ5MTIsImV4cCI6MTk5MDUwMDkxMn0.jEd8pHzVzlqZxf-ioqC_QKoda_xqfD2nh4niJ1mea9s"
);

function App() {
  const { map, user } = useContext(Context);
  useEffect(async () => {
    const session = await supabase.auth.refreshSession();
    console.log(session.data.session);
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
