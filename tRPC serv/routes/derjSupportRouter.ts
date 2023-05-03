import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import derjSupportService from "../controllers/derjSupportService";

const createDerj = z.object({
  cost: z.number(),
  name: z.string(),
  date: z.string(),
  purpose: z.enum(["Субсидія", "Дотація", "Поворотна допомога"]),
});
export type CreateDerjType = z.infer<typeof createDerj>;
const patchDerj = createDerj.extend({ derjId: z.number() });
export type PatchDerjType = z.infer<typeof patchDerj>;
export const derjSupportRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await derjSupportService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createDerj).query(async ({ ctx, input }) => {
    const res = await derjSupportService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchDerj).query(async ({ ctx, input }) => {
    const res = await derjSupportService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ derjId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await derjSupportService.delete(ctx.user, input.derjId);
      return res;
    }),
});
