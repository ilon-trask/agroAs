import Auth from "./pages/Auth";
import BusinessPlanPage from "./pages/BusinessPlanPage";
import BusinessCatalog from "./pages/BusinessCatalog";
import CalendarPage from "./pages/CalendarPage";
import StartPage from "./pages/StartPage";
import TechnologicalMap from "./pages/TechnologicalMap";
import { INCOME_ROUTER, YIELD_CALC_ROUTER, TEJ_ROUTER } from "./utils/consts";
import TEJJornal from "./pages/TEJJornal";
import HowThisWork from "./pages/HowThisWork";
import Income from "./pages/Income";
import YieldСalculation from "./pages/YieldСalculation";
import TEJustification from "./pages/TEJustification";
// export const authRoutes = [];

export const publicRoutes = [
  {
    patch: INCOME_ROUTER,
    Component: <Income />,
  },
  {
    patch: YIELD_CALC_ROUTER,
    Component: <YieldСalculation />,
  },
  {
    patch: TEJ_ROUTER,
    Component: <TEJustification />,
  },
];
