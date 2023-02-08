import { publicProcedure, router } from "../trpc";
import z from "zod";

import TractorService from "../controllers/TractorService";

export const tractorRouter = router({
  get: publicProcedure.query(async () => {
    const tractor = await TractorService.getAll();
    return tractor;
  }),
  create: publicProcedure
    .input(
      z.object({
        nameTractor: z.string(),
        brand: z.string(),
        marketCost: z.number(),
        depreciationPeriod: z.number(),
        enginePower: z.number(),
        fuelConsumption: z.number(),
        numberOfPersonnel: z.number(),
        gradeId: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const tractor = await TractorService.create(input, ctx.user);
      return tractor;
    }),
  patch: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        nameTractor: z.string(),
        brand: z.string(),
        marketCost: z.number(),
        depreciationPeriod: z.number(),
        enginePower: z.number(),
        fuelConsumption: z.number(),
        numberOfPersonnel: z.number(),
        gradeId: z.number().optional(),
      })
    )
    .query(
      async ({ input, ctx }) => await TractorService.patch(input, ctx.user)
    ),
});
