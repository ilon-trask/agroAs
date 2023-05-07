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
});
