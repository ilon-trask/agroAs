import { router, publicProcedure } from "../trpc";
import { z } from "zod";

import MachineService from "../controllers/MachineService";

export const machineRouter = router({
  get: publicProcedure.query(async () => {
    const machine = await MachineService.getAll();
    return machine;
  }),
  create: publicProcedure
    .input(
      z.object({
        nameMachine: z.string(),
        brand: z.string(),
        marketCost: z.number(),
        depreciationPeriod: z.number(),
        widthOfCapture: z.number(),
        workingSpeed: z.number(),
        numberOfServicePersonnel: z.number(),
        typeOfWork: z.number(),
      })
    )
    .query(async ({ input }) => {
      const machine = await MachineService.create(input);
      return machine;
    }),
});
