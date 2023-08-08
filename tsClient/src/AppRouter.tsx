import React, { useContext, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import BusinessCatalog from "./pages/BusinessCatalog";
import BusinessPlanPage from "./pages/BusinessPlanPage";
import HowThisWork from "./pages/HowThisWork";
import StartPage from "./pages/StartPage";
import TechnologicalMap from "./pages/TechnologicalMap";
import TEJJornal from "./pages/TEJJornal";
import TEJustification from "./pages/TEJustification";
import YieldСalculation from "./pages/YieldСalculation";
import Auth from "./pages/Auth";
import CalendarPage from "./pages/CalendarPage";

import {
  HOW_ROUTER,
  TEJ_ROUTER,
  YIELD_CALC_ROUTER,
  MAP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TEHMAP_ROUTER,
  CALENDAR_ROUTER,
  BUSINESSpLAN_ROUTER,
  BUSINESScATALOG_ROUTER,
  BUSINESS_ROUTER,
  ENTERPRISE_JOURNAL_ROUTER,
  ENTERPRISE_ROUTER,
  ENTERPRISE_FORM_ROUTER,
  ENTERPRISE_TAX_GROUP,
  DATA_BASE_ROUTER,
} from "./utils/consts";

import BusinessJurnal from "./pages/BusinessJurnal";
import EnterpriseJournal from "./pages/EnterpriseJournal";
import Enterprise from "./pages/Enterprise";
import EnterpriseFormPage from "./pages/EnterpriseFormPage";
import EnterpriseTaxPage from "./pages/EnterpriseTaxPage";
import DataBasePage from "./pages/DataBasePage";
import MapJornal from "./pages/MapJornal";
import { Context } from "./main";

export default function AppRouter() {
  const location = useLocation();
  const { user } = useContext(Context);
  useEffect(() => {
    localStorage.setItem("lastLocation", location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();

  useEffect(() => {
    const lastLocation = localStorage.getItem("lastLocation");
    if (lastLocation) {
      // localStorage.removeItem("lastLocation");
      navigate(lastLocation);
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path={BUSINESS_ROUTER} element={<StartPage />} />
      <Route path={LOGIN_ROUTE} element={<Auth />} />
      <Route path={REGISTRATION_ROUTE} element={<Auth />} />
      <Route path={TEHMAP_ROUTER + "/:id"} element={<TechnologicalMap />} />
      <Route path={CALENDAR_ROUTER + "/:id"} element={<CalendarPage />} />
      <Route
        path={BUSINESSpLAN_ROUTER + "/:id"}
        element={<BusinessPlanPage />}
      />
      <Route path={BUSINESScATALOG_ROUTER} element={<BusinessCatalog />} />
      {user.role == "service_role" && (
        <Route path={MAP_ROUTE} element={<MapJornal />} />
      )}
      <Route path={HOW_ROUTER} element={<HowThisWork />} />

      <Route
        path={YIELD_CALC_ROUTER + "/:busId" + "/:busProdId"}
        element={<YieldСalculation />}
      />
      {/* <Route path={TEJ_JORNAL_ROUTER} element={<TEJJornal />} /> */}
      <Route path={TEJ_ROUTER + "/:cartId"} element={<TEJustification />} />
      <Route path={ENTERPRISE_JOURNAL_ROUTER} element={<EnterpriseJournal />} />
      <Route path={ENTERPRISE_ROUTER + "/:id"} element={<Enterprise />} />
      <Route
        path={ENTERPRISE_FORM_ROUTER + "/:form" + "/:busId"}
        element={<EnterpriseFormPage />}
      />
      <Route
        path={ENTERPRISE_TAX_GROUP + "/:tax" + "/:id"}
        element={<EnterpriseTaxPage />}
      />
      <Route path={DATA_BASE_ROUTER} element={<DataBasePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
