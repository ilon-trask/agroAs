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
import { observer } from "mobx-react-lite";

function App() {
  const { map, user } = useContext(Context);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        user.isAuth = true;
        user.role = data.session.user.role as IUserRole;
      }
      getCarts(map);
      getWorks(map);
      getSection(map);
      getTractor(map);
      getMachine(map);
      getGrades(map);
      getCultural(map);
      console.log(1);

      if (user.role == "ADMIN" || user.role == "service_role")
        getIsAgreeCarts(map);
      if (user.role == "ADMIN" || user.role == "") agreeCarts(map);
    })();
  }, [user.isAuth]);

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <NavBar />
        <AppRouter />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default observer(App);
