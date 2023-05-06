import { router, publicProcedure } from "../trpc";
import { z } from "zod";

import { Imachine } from "../models/models";
import BuyingMachineService from "../controllers/BuyingMachineService";
const createBuyingMachine = z.object({
  name: z.string(),
  brand: z.string(),
  cost: z.number(),
  amount: z.number(),
  purpose: z.enum(["Трактор", "СГ машина", "Технологічне обладнання"]),
  date: z.string(),
});
export type CreateBuyingMachine = z.infer<typeof createBuyingMachine>;
const patchBuyingMachine = createBuyingMachine.extend({ buyingId: z.number() });
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
