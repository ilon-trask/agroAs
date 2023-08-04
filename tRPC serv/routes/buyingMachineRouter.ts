import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import BuyingMachineService from "../controllers/BuyingMachineService";
export const createBuyingMachine = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  amount: z.number(),
  purpose: z.enum(["Трактор", "СГ машина", "Технологічне обладнання", "МШП"]),
  date: z.string(),
  year: z.number(),
  businessPlanId: z.number(),
  enterpriseId: z.number().nullish(),
});
export type CreateBuyingMachine = z.infer<typeof createBuyingMachine>;
export const patchBuyingMachine = createBuyingMachine.extend({
  buyingId: z.number(),
});
export type PatchBuyingMachine = z.infer<typeof patchBuyingMachine>;
export const buyingMachineRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const machine = await BuyingMachineService.get(ctx.user);
    return machine;
  }),
  create: publicProcedure
    .input(createBuyingMachine)
    .query(async ({ input, ctx }) => {
      const machine = await BuyingMachineService.create(ctx.user, input);
      return machine;
    }),
  patch: publicProcedure
    .input(patchBuyingMachine)
    .query(
      async ({ input, ctx }) =>
        await BuyingMachineService.patch(ctx.user, input)
    ),
  delete: publicProcedure
    .input(z.object({ buyingId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await BuyingMachineService.delete(ctx.user, input.buyingId);
      return res;
    }),
});
