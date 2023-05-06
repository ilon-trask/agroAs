import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import NavBar from "./modules/NavBar";
import Footer from "./modules/Footer";
import { useEffect, useContext, useState } from "react";
import { Context } from "./main";
import {
  getCultural,
  getIsAgreeCarts,
  agreeCarts,
  getBusinessPlans,
  getNoAgreeBusiness,
  getOnlyCart,
  getCulturalInc,
  getYieldPlants,
  getPurposesMaterial,
  getCultureTEJMap,
  getCultivationTechnologiesMap,
  getAgreeTEJ,
  getTechnologiesTEJ,
  getSection,
  getOutcome,
  getProductTEJMap,
  getProduction,
  getAdministration,
} from "./http/requests";

import { supabase } from "./http/requests";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";
import { IUserRole } from "../../tRPC serv";
import { observer } from "mobx-react-lite";
function App() {
  const { map, user, business, income, TEJ } = useContext(Context);

  const [ind, setInd] = useState(0);
  useEffect(() => {
    if (ind > 0) {
      // getWorks(map);
      getCulturalInc(income);
      getYieldPlants(income);
      getCultural(map);
      getPurposesMaterial(map);
      getCultureTEJMap(map);
      getCultivationTechnologiesMap(map);
      getSection(map);
      getOutcome(map);
      getProductTEJMap(map);
      getProduction(income);
      getAdministration(map);
      if (user.role != "") getOnlyCart(map);

      console.log(123);
      if (user.role == "ADMIN" || user.role == "service_role") {
        getNoAgreeBusiness(map, business);
        getIsAgreeCarts(map);
      }
      if (
        // user.role == "ADMIN" ||
        // user.role == "service_role" ||
        user.role == ""
      ) {
        agreeCarts(map);
        getAgreeTEJ(TEJ);
        getTechnologiesTEJ(TEJ);
      }
    }
  }, [user.isAuth, ind]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        user.isAuth = true;
        user.role = data.session.user.role as IUserRole;
        map.maps = [];
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
