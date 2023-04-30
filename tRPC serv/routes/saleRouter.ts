import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import saleService from "../controllers/saleService";

const createSale = z.object({
  amount: z.number(),
  productionId: z.number(),
  price: z.number(),
  date: z.string(),
});
export type createSaleType = z.infer<typeof createSale>;
const patchSale = createSale.extend({ saleId: z.number() });
export type PatchSaleType = z.infer<typeof patchSale>;
export const saleRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await saleService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createSale).query(async ({ ctx, input }) => {
    const res = await saleService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchSale).query(async ({ ctx, input }) => {
    const res = await saleService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ saleId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await saleService.delete(ctx.user, input);
      return res;
    }),
});
