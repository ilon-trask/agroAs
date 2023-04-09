import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./main";
import HowThisWork from "./pages/HowThisWork";
import Income from "./pages/Income";
import YieldСalculation from "./pages/YieldСalculation";
import { authRoutes, publicRoutes } from "./routes";
import { HOW_ROUTER, INCOME_ROUTER, YIELD_CALC_ROUTER } from "./utils/consts";

export default function AppRouter() {
  const { user } = useContext(Context);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path={HOW_ROUTER} element={<HowThisWork />} />
      <Route path={INCOME_ROUTER} element={<Income />} />
      <Route path={YIELD_CALC_ROUTER + "/:id"} element={<YieldСalculation />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
