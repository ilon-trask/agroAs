import { YIELD_CALC_ROUTER, TEJ_ROUTER } from "./utils/consts";
import YieldСalculation from "./pages/YieldСalculation";
import TEJustification from "./pages/TEJustification";
// export const authRoutes = [];

export const publicRoutes = [
  {
    patch: YIELD_CALC_ROUTER,
    Component: <YieldСalculation />,
  },
  {
    patch: TEJ_ROUTER,
    Component: <TEJustification />,
  },
];
