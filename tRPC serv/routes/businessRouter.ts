import { router, publicProcedure } from "../trpc";
import z from "zod";
import BusinessService, {
  resBusinessPlan,
} from "../controllers/BusinessService";
import { IbusinessCategory, IbusinessPlan } from "../models/models";
const createType = z.object({
  name: z.string(),
  businessCategoryId: z.number(),
});
export type CreateBusinessPlan = z.infer<typeof createType>;
const patchType = z.object({
  planId: z.number(),
  name: z.string(),
  businessCategoryId: z.number(),
});
export type PatchBusinessPlan = z.infer<typeof patchType>;
const deleteType = z.object({
  BusinessId: z.number(),
});
export type DeleteBusinessPlan = z.infer<typeof deleteType>;
const setIsPublic = z.object({
  BusinessId: z.number(),
  isPublic: z.boolean(),
  description: z.string().optional(),
});
export type SetIsPublicBusinessPlan = z.infer<typeof setIsPublic>;
const setIsAgree = z.object({
  BusinessId: z.number(),
  isAgree: z.boolean(),
  description: z.string().optional(),
});
export type SetIsAgreeBusinessPlan = z.infer<typeof setIsAgree>;

const businessRouter = router({
  getCategory: publicProcedure.query(async () => {
    const res: IbusinessCategory[] = await BusinessService.getCategory();
    return res;
  }),
  get: publicProcedure.query(async ({ ctx }) => {
    const res: resBusinessPlan[] = await BusinessService.get(ctx.user);

    return res;
  }),
  create: publicProcedure.input(createType).query(async ({ input, ctx }) => {
    const res: resBusinessPlan = await BusinessService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchType).query(async ({ input, ctx }) => {
    const res: resBusinessPlan | null | undefined = await BusinessService.patch(
      ctx.user,
      input
    );
    return res;
  }),
  delete: publicProcedure.input(deleteType).query(async ({ input, ctx }) => {
    const res: number = await BusinessService.delete(ctx.user, input);
    return res;
  }),
  setIsPublic: publicProcedure
    .input(setIsPublic)
    .query(async ({ input, ctx }) => {
      const res: resBusinessPlan | null | undefined =
        await BusinessService.setIsPublic(ctx.user, input);
      return res;
    }),
  getNoAgree: publicProcedure.query(async () => {
    const res: resBusinessPlan[] = await BusinessService.getNoAgree();
    return res;
  }),
  setIsAgree: publicProcedure
    .input(setIsAgree)
    .query(async ({ input, ctx }) => {
      let res: [number] | undefined | null = await BusinessService.setIsAgree(
        ctx.user,
        input
      );
      return res;
    }),
});
export default businessRouter;
