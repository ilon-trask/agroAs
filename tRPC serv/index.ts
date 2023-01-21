import { createHTTPServer } from "@trpc/server/adapters/standalone";
import z from "zod";
import { publicProcedure, router } from "./trpc";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as trpcExpress from "@trpc/server/adapters/express";

export type AppRouter = typeof appRouter;

import { cartRouter } from "./routes/cartRouter";
import { tractorRouter } from "./routes/tractorRouter";
import { machineRouter } from "./routes/machineRouter";
import { sectionRouter } from "./routes/sectionRouter";
import { operRouter } from "./routes/operRouter";

let users = [{ id: 1, name: "bob" }];

const appRouter = router({
  cart: cartRouter,
  tractor: tractorRouter,
  machine: machineRouter,
  section: sectionRouter,
  oper: operRouter,
  "": publicProcedure.query(() => "some text"),
  getUser: publicProcedure.query(() => {
    console.log(users);
    return users;
  }),

  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      let item = { id: users[users.length - 1].id++, name: input.name };
      console.log(item);
      users.push(item);
      return "done";
    }),
});

// createHTTPServer({
//   router: appRouter,
//   createContext() {
//     return {};
//   },
// }).listen(5000);

const app = express();
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(cors());
app.use(
  "",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

const port = 5000;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
