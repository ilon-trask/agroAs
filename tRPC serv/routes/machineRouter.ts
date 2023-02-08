import { router, publicProcedure } from "../trpc";
import { z } from "zod";

import MachineService from "../controllers/MachineService";

export const machineRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const machine = await MachineService.getAll(ctx.user);
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
        gradeId: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const machine = await MachineService.create(input, ctx.user);
      return machine;
    }),
  patch: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        nameMachine: z.string(),
        brand: z.string(),
        marketCost: z.number(),
        depreciationPeriod: z.number(),
        widthOfCapture: z.number(),
        workingSpeed: z.number(),
        numberOfServicePersonnel: z.number(),
        gradeId: z.number().optional(),
      })
    )
    .query(
      async ({ input, ctx }) => await MachineService.patch(input, ctx.user)
    ),
});
