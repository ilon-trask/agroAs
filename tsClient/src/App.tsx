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
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";

function App() {
  const { map, user } = useContext(Context);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        user.isAuth = true;
        user.role = data.session.user.role as
          | "ADMIN"
          | "authenticated"
          | ""
          | undefined;
      }
      console.log(user.role);
      console.log(error);
      console.log(data);
      supabase.auth.getUser().then((data) => console.log(data));
    })();
  }, [user.isAuth]);

  useEffect(() => {
    getCarts(map);
    getSection(map);
    getTractor(map);
    getMachine(map);
    getGrades(map);
    console.log(3);
  }, []);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <NavBar />

        <AppRouter />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
