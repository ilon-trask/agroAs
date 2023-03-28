import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import NavBar from "./modules/NavBar";
import Footer from "./modules/Footer";
import { useEffect, useContext, useState } from "react";
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
  getBusinessCategory,
  getBusinessPlans,
  getNoAgreeBusiness,
  getOnlyCart,
} from "./http/requests";

import { supabase } from "./http/requests";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";
import { IUserRole } from "../../tRPC serv";
import { observer } from "mobx-react-lite";
function App() {
  const { map, user, business } = useContext(Context);

  const [ind, setInd] = useState(0);
  useEffect(() => {
    if (ind > 0) {
      // getWorks(map);

      getCultural(map);

      getOnlyCart(map);

      console.log(123);
      if (user.role == "ADMIN" || user.role == "service_role") {
        getNoAgreeBusiness(map, business);
        getIsAgreeCarts(map);
      }
      if (
        // user.role == "ADMIN" ||
        // user.role == "service_role" ||
        user.role == ""
      )
        agreeCarts(map);
    }
  }, [user.isAuth, ind]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        user.isAuth = true;
        user.role = data.session.user.role as IUserRole;
      }
      setInd(1);
    })();
  }, []);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box minH={"100vh"} display={"flex"} flexDirection={"column"}>
          <NavBar />
          <AppRouter />
          <Footer />
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default observer(App);
