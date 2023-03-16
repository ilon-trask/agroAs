import Auth from "./pages/Auth";
import CalendarPage from "./pages/CalenderPage";
import Main from "./pages/MainPage";
import MapJornal from "./pages/MapJornal";
import StartPage from "./pages/StartPage";
import TechnologicalMap from "./pages/TechnologicalMap";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MAP_ROUTE,
  TEHMAP_ROUTER,
  CALENDAR_ROUTER,
} from "./utils/consts";

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
];
