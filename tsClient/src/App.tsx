import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import NavBar from "./modules/NavBar";
import { useEffect, useContext } from "react";
import { Context } from "./main";
import {
  getCarts,
  getSection,
  getTractor,
  getMachine,
  getGrades,
  getWorks,
  getCultural,
  getIsAgreeCarts,
  agreeCarts,
} from "./http/requests";

import { supabase } from "./http/requests";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";
import { IUserRole } from "../../tRPC serv";

function App() {
  const { map, user } = useContext(Context);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        user.isAuth = true;
        user.role = data.session.user.role as IUserRole;
      }
    })();
  }, [user.isAuth]);

  useEffect(() => {
    getCarts(map);
    getWorks(map);
    getSection(map);
    getTractor(map);
    getMachine(map);
    getGrades(map);
    getCultural(map);
    if (true) getIsAgreeCarts(map);
    agreeCarts(map);
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
