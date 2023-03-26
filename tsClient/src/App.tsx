import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import NavBar from "./modules/NavBar";
import Footer from "./modules/Footer";
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
  getBusinessCategory,
  getBusinessPlans,
  getNoAgreeBusiness,
} from "./http/requests";

import { supabase } from "./http/requests";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";
import { IUserRole } from "../../tRPC serv";
import { observer } from "mobx-react-lite";
let ind = 0;
function App() {
  const { map, user, business } = useContext(Context);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        user.isAuth = true;
        user.role = data.session.user.role as IUserRole;
      }
      if (ind == 1) {
        getCarts(map);
        getWorks(map);
        getSection(map);
        getTractor(map);
        getMachine(map);
        getGrades(map);
        getCultural(map);
        getBusinessCategory(map, business);
        getBusinessPlans(map, business);

        if (user.role == "ADMIN" || user.role == "service_role") {
          getNoAgreeBusiness(map, business);
          getIsAgreeCarts(map);
        }
        if (
          user.role == "ADMIN" ||
          user.role == "service_role" ||
          user.role == ""
        )
          agreeCarts(map);
        console.log(123);
      }
    })();
  }, [user.isAuth]);

  useEffect(() => {
    ind = 1;
    getCarts(map);
    getWorks(map);
    getSection(map);
    getTractor(map);
    getMachine(map);
    getGrades(map);
    getCultural(map);
    getBusinessCategory(map, business);
    getBusinessPlans(map, business);

    if (user.role == "ADMIN" || user.role == "service_role") {
      getNoAgreeBusiness(map, business);
      getIsAgreeCarts(map);
    }
    if (user.role == "ADMIN" || user.role == "service_role" || user.role == "")
      agreeCarts(map);
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
