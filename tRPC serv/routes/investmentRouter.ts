import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import { Iinvestment } from "../models/models";
import investmentService from "../controllers/investmentService";

const createInvestment = z.object({
  cost: z.number(),
  name: z.string(),
  date: z.string(),
  origin: z.enum(["Власні", "Залучені"]),
  enterpriseId: z.number(),
});
export type CreateInvestmentType = z.infer<typeof createInvestment>;
const patchInvestment = createInvestment.extend({ investmentId: z.number() });
export type PatchInvestmentType = z.infer<typeof patchInvestment>;
export const investmentRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await investmentService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(createInvestment)
    .query(async ({ ctx, input }) => {
      const res = await investmentService.create(ctx.user, input);
      return res;
    }),
  patch: publicProcedure
    .input(patchInvestment)
    .query(async ({ ctx, input }) => {
      const res = await investmentService.patch(ctx.user, input);
      return res;
    }),
  delete: publicProcedure
    .input(z.object({ investmentId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await investmentService.delete(ctx.user, input.investmentId);
      return res;
    }),
});
