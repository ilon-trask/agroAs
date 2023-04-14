import Auth from "./pages/Auth";
import BusinessPlanPage from "./pages/BusinessPlanPage";
import BusinessCatalog from "./pages/BusinessCatalog";
import CalendarPage from "./pages/CalenderPage";
import StartPage from "./pages/StartPage";
import TechnologicalMap from "./pages/TechnologicalMap";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MAP_ROUTE,
  TEHMAP_ROUTER,
  CALENDAR_ROUTER,
  BUSINESSpLAN_ROUTER,
  BUSINESScATALOG_ROUTER,
  BUSINESS_ROUTER,
  HOW_ROUTER,
  INCOME_ROUTER,
  YIELD_CALC_ROUTER,
  TEJ_JORNAL_ROUTER,
  TEJ_ROUTER,
} from "./utils/consts";
import TEJJornal from "./pages/TEJJornal";
import HowThisWork from "./pages/HowThisWork";
import Income from "./pages/Income";
import YieldСalculation from "./pages/YieldСalculation";
import TEJustification from "./pages/TEJustification";
// export const authRoutes = [];

export const publicRoutes = [
  {
    path: MAP_ROUTE,
    Component: <StartPage />,
  },
  {
    path: LOGIN_ROUTE,
    Component: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth />,
  },
  {
    path: TEHMAP_ROUTER + "/:id",
    Component: <TechnologicalMap />,
  },
  {
    path: CALENDAR_ROUTER + "/:id",
    Component: <CalendarPage />,
  },
  {
    path: BUSINESSpLAN_ROUTER + "/:id",
    Component: <BusinessPlanPage />,
  },
  {
    path: BUSINESScATALOG_ROUTER,
    Component: <BusinessCatalog />,
  },
  {
    path: BUSINESS_ROUTER,
    Component: <TEJJornal />,
  },
  {
    patch: HOW_ROUTER,
    Component: <HowThisWork />,
  },
  {
    patch: INCOME_ROUTER,
    Component: <Income />,
  },
  {
    patch: YIELD_CALC_ROUTER,
    Component: <YieldСalculation />,
  },
  {
    patch: TEJ_JORNAL_ROUTER,
    Component: <TEJJornal />,
  },
  {
    patch: TEJ_ROUTER,
    Component: <TEJustification />,
  },
];
