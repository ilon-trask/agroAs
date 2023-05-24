import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import CreditService from "../controllers/CreditService";
import { Icredit } from "../models/models";

const createCredit = z.object({
  cost: z.number(),
  name: z.string(),
  date: z.string(),
  isUseCost: z.boolean(),
  purpose: z.enum(["Поповнення обігових коштів", "Закупка основних засобів"]),
  enterpriseId: z.number(),
});
export type CreateCreditType = z.infer<typeof createCredit>;
const patchCredit = createCredit.extend({ creditId: z.number() });
export type PatchCreditType = z.infer<typeof patchCredit>;
export const creditRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res: Icredit[] | undefined = await CreditService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createCredit).query(async ({ ctx, input }) => {
    const res: Icredit | undefined = await CreditService.create(
      ctx.user,
      input
    );
    return res;
  }),
  patch: publicProcedure.input(patchCredit).query(async ({ ctx, input }) => {
    const res = await CreditService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ creditId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await CreditService.delete(ctx.user, input);
      return res;
    }),
});
