import { router, publicProcedure } from "../trpc";
import z from "zod";

import OperService from "../controllers/OperService";

export const operRouter = router({
  get: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const oper = await OperService.getOper(input.id);
      oper.sort((a, b) => a.id! - b.id!);
      return oper;
    }),
  create: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        sum: z.number(),
        arr: z.object({
          cell: z.enum([
            "costMaterials",
            "costServices",
            "costMechanical",
            "costTransport",
          ]),
          res: z.object({
            nameOper: z.string(),
            price: z.number().optional(),
            amount: z.number().optional(),
            unitsOfCost: z.string().optional(),
            unitsOfConsumption: z.string().optional(),
            fuelConsumption: z.number().optional(),
            workingSpeed: z.number().optional(),
            idMachine: z.number().optional(),
            idTractor: z.number().optional(),
          }),
          section: z.number(),
        }),
      })
    )
    .query(async ({ input }) => {
      const oper = await OperService.createOper(input);
      console.log(oper);
      return oper;
    }),
  patch: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        sum: z.number(),
        arr: z.object({
          cell: z.enum([
            "costMaterials",
            "costServices",
            "costMechanical",
            "costTransport",
          ]),
          res: z.object({
            operId: z.number(),
            nameOper: z.string(),
            price: z.number().optional(),
            amount: z.number().optional(),
            unitsOfCost: z.string().optional(),
            unitsOfConsumption: z.string().optional(),
            fuelConsumption: z.number().optional(),
            workingSpeed: z.number().optional(),
            idMachine: z.number().optional(),
            idTractor: z.number().optional(),
          }),
          section: z.number(),
        }),
      })
    )
    .query(async ({ input }) => {
      const oper = await OperService.patchOper(input);
      console.log(oper);

      return oper;
    }),
  delete: publicProcedure
    .input(
      z.object({ cartId: z.number(), operId: z.number(), akk: z.number() })
    )
    .query(async ({ input }) => {
      const oper = await OperService.deleteOper(input);
      console.log(oper);

      return oper;
    }),
  getProps: publicProcedure
    .input(
      z.object({
        operId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const oper = await OperService.getProps(input);
      return oper;
    }),
});
