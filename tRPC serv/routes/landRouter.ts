import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import landService from "../controllers/landService";

export const createLand = z.object({
  name: z.string(),
  area: z.number(),
  cadastreNumber: z.number(),
  date: z.string(),
  rightOfUse: z.enum(["Оренда", "Власна"]),
  businessPlanId: z.number().optional().nullable(),
  enterpriseId: z.number().nullish().optional(),
  rate: z.number(),
  ownership: z.enum(["Комунальна", "Приватна", "Державна"]),
});
export type CreateLandType = z.infer<typeof createLand>;
export const patchLand = createLand.extend({ landId: z.number() });
export type PatchLandType = z.infer<typeof patchLand>;
export const landRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await landService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createLand).query(async ({ ctx, input }) => {
    const res = await landService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchLand).query(async ({ ctx, input }) => {
    const res = await landService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ landId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await landService.delete(ctx.user, input);
      return res;
    }),
});
