import productionService from "../controllers/productionService";
import { publicProcedure, router } from "../trpc";
import * as z from "zod";

const createProduction = z.object({
  productId: z.number(),
  isPrimary: z.boolean(),
  techCartId: z.number(),
  year: z.number(),
});
export type createProductionType = z.infer<typeof createProduction>;
const patchProduction = createProduction.extend({ prodId: z.number() });
export type PatchProductionType = z.infer<typeof patchProduction>;
export const productionRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await productionService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(createProduction)
    .query(async ({ ctx, input }) => {
      const res = await productionService.create(ctx.user, input);
      return res;
    }),
  patch: publicProcedure
    .input(patchProduction)
    .query(async ({ ctx, input }) => {
      const res = await productionService.patch(ctx.user, input);
      return res;
    }),
  delete: publicProcedure
    .input(z.object({ prodId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res: number | undefined = await productionService.delete(
        ctx.user,
        input
      );
      return res;
    }),
});
