import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import CreditService from "../controllers/CreditService";
import { Icredit } from "../models/models";
import EnterpriseService from "../controllers/EnterpriseService";

const createEnterprise = z.object({
  name: z.string(),
  form: z.enum([
    "ФОП",
    "ФОП + 1",
    "ФОП + 2",
    "ФОП + 3",
    "ФОП + 4",
    "Юридична особа ФГ",
  ]),
  taxGroup: z.enum([
    "II група",
    "III група з пдв",
    "III група без пдв",
    "IV група",
    "Загальна",
  ]),
});
export type CreateEnterpriseType = z.infer<typeof createEnterprise>;
const patchEnterprise = createEnterprise.extend({ entId: z.number() });
export type PatchEnterpriseType = z.infer<typeof patchEnterprise>;
export const enterpriseRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await EnterpriseService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(createEnterprise)
    .query(async ({ ctx, input }) => {
      const res = await EnterpriseService.create(ctx.user, input);
      return res;
    }),
  patch: publicProcedure
    .input(patchEnterprise)
    .query(async ({ ctx, input }) => {
      const res = await EnterpriseService.patch(ctx.user, input);
      return res;
    }),
  delete: publicProcedure
    .input(z.object({ entId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await EnterpriseService.delete(ctx.user, input);
      return res;
    }),
});
