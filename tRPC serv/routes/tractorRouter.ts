import { publicProcedure, router } from "../trpc";
import z from "zod";

import TractorService from "../controllers/TractorService";

export const tractorRouter = router({
  get: publicProcedure.query(async () => {
    const tractor = await TractorService.getAll();
    tractor.forEach((el) => console.log(el));

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
        typeOfWork: z.number(),
      })
    )
    .query(async ({ input }) => {
      const tractor = await TractorService.create(input);
      return tractor;
    }),
});
