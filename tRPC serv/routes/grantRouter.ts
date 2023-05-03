import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import GrantService from "../controllers/GrantService";
const createGrant = z.object({
  cost: z.number(),
  name: z.string(),
  date: z.string(),
  purpose: z.enum(["Державні", "Комерційні"]),
});
export type CreateGrantType = z.infer<typeof createGrant>;
const patchGrant = createGrant.extend({ grantId: z.number() });
export type PatchGrantType = z.infer<typeof patchGrant>;
export const grantRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await GrantService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createGrant).query(async ({ ctx, input }) => {
    const res = await GrantService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchGrant).query(async ({ ctx, input }) => {
    const res = await GrantService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ grantId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await GrantService.delete(ctx.user, input);
      return res;
    }),
});
