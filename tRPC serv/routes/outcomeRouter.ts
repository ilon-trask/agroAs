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
export const outcomeRouter = router({
  create: publicProcedure.input(createOutcome).query(async ({ ctx, input }) => {
    const res = await outComeService.create(ctx.user, input);
    return res;
  }),
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await outComeService.get(ctx.user);
    return res;
  }),
});
