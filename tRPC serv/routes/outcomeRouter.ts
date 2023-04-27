import { publicProcedure, router } from "../trpc";
import z from "zod";
import outComeService from "../controllers/outComeService";
const createOutcome = z.object({
  type: z.enum(["Інвестиційні", "Операційні", "Не визначено"]),
  group: z.enum([
    "Прямі",
    "Загально виробничі",
    "Постійні",
    "Купівля техніки і обладнання",
    "Будівництво будівель і споруд",
    "Не визначино",
  ]),
  cartId: z.number(),
});
export type createOutcomeType = z.infer<typeof createOutcome>;
const patchOutcome = createOutcome.extend({ outcomeId: z.number() });

export type patchOutcomeType = z.infer<typeof patchOutcome>;
export const outcomeRouter = router({
  create: publicProcedure.input(createOutcome).query(async ({ ctx, input }) => {
    const res = await outComeService.create(ctx.user, input);
    return res;
  }),
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await outComeService.get(ctx.user);
    return res;
  }),
  setIsUsing: publicProcedure
    .input(z.object({ outcomeId: z.number(), value: z.boolean() }))
    .query(async ({ input, ctx }) => {
      const res = await outComeService.setIsUsing(ctx.user, input);
      return res;
    }),
  delete: publicProcedure
    .input(z.object({ outcomeId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await outComeService.delete(ctx.user, input.outcomeId);
      return res;
    }),
  patch: publicProcedure.input(patchOutcome).query(async ({ ctx, input }) => {
    const res = await outComeService.patch(ctx.user, input);
    return res;
  }),
});
