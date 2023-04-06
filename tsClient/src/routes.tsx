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
} from "./utils/consts";
import BusinessPage from "./pages/BusinessPage";
import HowThisWork from "./pages/HowThisWork";

export const authRoutes = [];

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
    Component: <BusinessPage />,
  },
  {
    patch: HOW_ROUTER,
    Component: <HowThisWork />,
  },
];
