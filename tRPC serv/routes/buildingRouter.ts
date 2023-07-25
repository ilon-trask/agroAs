import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import buildingService from "../controllers/buildingService";

export const createBuilding = z.object({
  name: z.string(),
  startPrice: z.number(),
  depreciationPeriod: z.string().nullish(),
  date: z.string(),
  description: z.string(),
  businessPlanId: z.number(),
  enterpriseId: z.number().nullish(),
});
export type CreateBuildingType = z.infer<typeof createBuilding>;
export const patchBuilding = createBuilding.extend({ buildId: z.number() });
export type PatchBuildingType = z.infer<typeof patchBuilding>;
export const buildingRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await buildingService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(createBuilding)
    .query(async ({ ctx, input }) => {
      const res = await buildingService.create(ctx.user, input);
      return res;
    }),
  patch: publicProcedure.input(patchBuilding).query(async ({ ctx, input }) => {
    const res = await buildingService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ buildId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await buildingService.delete(ctx.user, input);
      return res;
    }),
});
