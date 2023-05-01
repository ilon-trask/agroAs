import { createHTTPServer } from "@trpc/server/adapters/standalone";
import z from "zod";
import { publicProcedure, router } from "./trpc";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./db";
import jwt from "jsonwebtoken";

import * as trpcExpress from "@trpc/server/adapters/express";

export type AppRouter = typeof appRouter;

import { cartRouter } from "./routes/cartRouter";
import { tractorRouter } from "./routes/tractorRouter";
import { machineRouter } from "./routes/machineRouter";
import { operRouter } from "./routes/operRouter";

import OS from "os";
import { inferAsyncReturnType } from "@trpc/server";
import { workRouter } from "./routes/workRouter";
import { culturalRouter } from "./routes/culturalRouter";
import SectionService from "./controllers/SectionService";
import gradeService from "./controllers/gradeService";
import businessRouter from "./routes/businessRouter";
import feedBackRouter from "./routes/feedBackRouter";
import { resumeRouter } from "./routes/resumeRouter";
import { titleRouter } from "./routes/titleRouter";
import { incomeRouter } from "./routes/incomeRouter";
import { TEJRouter } from "./routes/TEJRouter";
import { outcomeRouter } from "./routes/outcomeRouter";
import { productionRouter } from "./routes/productionRouter";
import { saleRouter } from "./routes/saleRouter";

export const adminId = "c87cb1e9-6655-4f2e-8d9f-2ad2680b782c";

const appRouter = router({
  cart: cartRouter,
  tractor: tractorRouter,
  machine: machineRouter,
  section: router({
    get: publicProcedure.query(async () => {
      const data = await SectionService.getAll();
      return data;
    }),
  }),
  oper: operRouter,
  works: workRouter,
  grade: router({
    get: publicProcedure.query(async () => {
      const grades = await gradeService.get();
      return grades;
    }),
  }),
  cultural: culturalRouter,
  business: businessRouter,
  feedBack: feedBackRouter,
  resume: resumeRouter,
  titlePage: titleRouter,
  income: incomeRouter,
  outcome: outcomeRouter,
  TEJ: TEJRouter,
  production: productionRouter,
  sale: saleRouter,
  "": publicProcedure.query(() => "some text"),
});

export type IUserRole =
  | "ADMIN"
  | "authenticated"
  | ""
  | "AUTHOR"
  | "service_role";

const app = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

export type Principal = {
  sub: string;
  role: IUserRole;
  email: string;
};
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return {};
  const user = jwt.verify(
    token,
    "gdrlyeRGbmZa10k7HByehmz4MU4EnTrOBBSEWST1gA+Bz9IupfCNm59k98ckJKti3oiCPhuymM5B/6tPZhXbcA=="
  ) as Principal;

  return { user };
};
export type Context = inferAsyncReturnType<typeof createContext>;
app.use(cors());
app.use(
  "",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await sequelize.sync();
  console.log(`🚀 Server listening on port ${port}`);
});
