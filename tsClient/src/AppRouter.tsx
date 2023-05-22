import React, { useEffect } from "react";
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
import Income from "./pages/Income";
import StartPage from "./pages/StartPage";
import TechnologicalMap from "./pages/TechnologicalMap";
import TEJJornal from "./pages/TEJJornal";
import TEJustification from "./pages/TEJustification";
import YieldСalculation from "./pages/YieldСalculation";
import Auth from "./pages/Auth";
import CalendarPage from "./pages/CalendarPage";
TEJJornal;
import { publicRoutes } from "./routes";
import {
  HOW_ROUTER,
  INCOME_ROUTER,
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
  CASH_FLOW,
  GOODS_ROUTER,
  ENTERPRISE_JOURNAL_ROUTER,
  ENTERPRISE_ROUTER,
  ENTERPRISE_FORM_ROUTER,
} from "./utils/consts";
import CashFlow from "./pages/CashFlow";
import Goods from "./pages/Goods";
import BusinessJurnal from "./pages/BusinessJurnal";
import EnterpriseJournal from "./pages/EnterpriseJournal";
import Enterprise from "./pages/Enterprise";
import EnterpriseFormPage from "./pages/EnterpriseFormPage";

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastLocation", location.pathname);
  }, [location]);

  const navigate = useNavigate();

  useEffect(() => {
    const lastLocation = localStorage.getItem("lastLocation");
    if (lastLocation) {
      localStorage.removeItem("lastLocation");
      navigate(lastLocation);
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path={MAP_ROUTE} element={<StartPage />} />
      <Route path={LOGIN_ROUTE} element={<Auth />} />
      <Route path={REGISTRATION_ROUTE} element={<Auth />} />
      <Route path={TEHMAP_ROUTER + "/:id"} element={<TechnologicalMap />} />
      <Route path={CALENDAR_ROUTER + "/:id"} element={<CalendarPage />} />
      <Route
        path={BUSINESSpLAN_ROUTER + "/:id"}
        element={<BusinessPlanPage />}
      />
      <Route path={BUSINESScATALOG_ROUTER} element={<BusinessCatalog />} />
      <Route path={BUSINESS_ROUTER} element={<BusinessJurnal />} />
      <Route path={HOW_ROUTER} element={<HowThisWork />} />
      <Route path={INCOME_ROUTER} element={<Income />} />
      <Route path={YIELD_CALC_ROUTER + "/:id"} element={<YieldСalculation />} />
      {/* <Route path={TEJ_JORNAL_ROUTER} element={<TEJJornal />} /> */}
      <Route path={TEJ_ROUTER + "/:id"} element={<TEJustification />} />
      <Route path={CASH_FLOW} element={<CashFlow />} />
      <Route path={GOODS_ROUTER} element={<Goods />} />
      <Route path={ENTERPRISE_JOURNAL_ROUTER} element={<EnterpriseJournal />} />
      <Route path={ENTERPRISE_ROUTER + "/:id"} element={<Enterprise />} />
      <Route
        path={ENTERPRISE_FORM_ROUTER + "/:form" + "/:id"}
        element={<EnterpriseFormPage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
