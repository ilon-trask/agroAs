import { publicProcedure, router } from "../trpc";
import * as z from "zod";
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
const patchEnterpriseLeader = z.object({
  enterpriseId: z.number(),
  leader: z.string(),
  leaderEducation: z.string(),
});
export type PatchEnterpriseLeader = z.infer<typeof patchEnterpriseLeader>;
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
  patchEnterpriseLeader: publicProcedure
    .input(patchEnterpriseLeader)
    .query(async ({ ctx, input }) => {
      const res = await EnterpriseService.patchEnterpriseLeader(
        ctx.user,
        input
      );
      return res;
    }),
});
