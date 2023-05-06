import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import administrationService from "../controllers/administrationService";

const createAdministration = z.object({
  name: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  price: z.number(),
  purpose: z.enum(["Оплата праці", "Спрала податків", "Оплата послуг"]),
  periodCalc: z.enum(["Помісячно", "Поквартально", "За рік"]),
});
export type CreateAdministration = z.infer<typeof createAdministration>;
const patchAdministration = createAdministration.extend({ admId: z.number() });
export type PatchAdministration = z.infer<typeof patchAdministration>;
export const administrationRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const machine = await administrationService.get(ctx.user);
    return machine;
  }),
  create: publicProcedure
    .input(createAdministration)
    .query(async ({ input, ctx }) => {
      const machine = await administrationService.create(ctx.user, input);
      return machine;
    }),
  patch: publicProcedure
    .input(patchAdministration)
    .query(
      async ({ input, ctx }) =>
        await administrationService.patch(ctx.user, input)
    ),
  delete: publicProcedure
    .input(z.object({ admId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await administrationService.delete(ctx.user, input.admId);
      return res;
    }),
});
