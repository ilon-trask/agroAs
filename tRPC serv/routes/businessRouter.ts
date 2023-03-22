import { router, publicProcedure } from "../trpc";
import z from "zod";
import BusinessService from "../controllers/BusinessService";
import { IbusinessCategory, IbusinessPlan } from "../models/models";
const createType = z.object({
  name: z.string(),
  businessCategoryId: z.number(),
});
const patchType = z.object({
  planId: z.number(),
  name: z.string(),
  businessCategoryId: z.number(),
});
export type CreateBusinessPlan = z.infer<typeof createType>;
export type PatchBusinessPlan = z.infer<typeof patchType>;
const businessRouter = router({
  getCategory: publicProcedure.query(async () => {
    const res: IbusinessCategory[] = await BusinessService.getCategory();
    return res;
  }),
  get: publicProcedure.query(async ({ ctx }) => {
    const res: IbusinessPlan[] = await BusinessService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createType).query(async ({ input, ctx }) => {
    const res: IbusinessPlan = await BusinessService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchType).query(async ({ input, ctx }) => {
    const res: [number] | undefined = await BusinessService.patch(
      ctx.user,
      input
    );
    if (!res) throw new Error("");
    return res;
  }),
});
export default businessRouter;
