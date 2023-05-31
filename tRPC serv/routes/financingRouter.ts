import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import FinancingService from "../controllers/FinancingService";
import { Ifinancing } from "../models/models";

const createFinancing = z.object({
  cost: z.number(),
  type: z.enum(["investment", "credit", "derj_support", "grant"]),
  name: z.string(),
  date: z.string(),
  isUseCost: z.boolean(),
  purpose: z.enum([
    "Поповнення обігових коштів",
    "Закупка основних засобів",
    "Власні",
    "Залучені",
    "Субсидія",
    "Дотація",
    "Поворотна допомога",
    "Державні",
    "Комерційні",
  ]),
  calculationType: z.enum(["Базовий", "Індивідуальний"]),
  calculationMethod: z.enum(["На бізнес-план", "На гектар"]),
  enterpriseId: z.number(),
});
export type CreateFinancingType = z.infer<typeof createFinancing>;
const patchFinancing = createFinancing.extend({ financingId: z.number() });
export type PatchFinancingType = z.infer<typeof patchFinancing>;
export const financingRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res: Ifinancing[] | undefined = await FinancingService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(createFinancing)
    .query(async ({ ctx, input }) => {
      const res: Ifinancing | undefined = await FinancingService.create(
        ctx.user,
        input
      );
      return res;
    }),
  patch: publicProcedure.input(patchFinancing).query(async ({ ctx, input }) => {
    const res = await FinancingService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ financingId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await FinancingService.delete(ctx.user, input);
      return res;
    }),
});
