import { router, publicProcedure } from "../trpc";
import z from "zod";
import workService from "../controllers/workService";
const createProps = z.object({
  nameWork: z.string(),
  area: z.number(),
  salary: z.number(),
  priceDiesel: z.number(),
  isPublic: z.boolean().optional(),
});
export type CreateProps = z.infer<typeof createProps>;
const deleteProps = z.object({ workId: z.number() });
export type DeleteProps = z.infer<typeof deleteProps>;
const patchProps = z.object({
  workId: z.number(),
  nameWork: z.string(),
  area: z.number(),
  salary: z.number(),
  priceDiesel: z.number(),
  isPublic: z.boolean().optional(),
});
export type PatchProps = z.infer<typeof patchProps>;
export const workRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const works = await workService.get(ctx.user);
    return works;
  }),
  create: publicProcedure.input(createProps).query(async ({ input, ctx }) => {
    const res = await workService.create(input, ctx.user);
    return res;
  }),
  delete: publicProcedure.input(deleteProps).query(async ({ input, ctx }) => {
    const res = await workService.delete(input, ctx.user);
    return res;
  }),
  patch: publicProcedure.input(patchProps).query(async ({ input, ctx }) => {
    const res = await workService.patch(input, ctx.user);
    return res;
  }),
});
