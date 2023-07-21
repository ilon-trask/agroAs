import { router, publicProcedure } from "../trpc";
import z from "zod";
import BusinessService, {
  resBusinessPlan,
} from "../controllers/BusinessService";
import { createFinancing } from "./financingRouter";
import { createBuyingMachine, patchBuyingMachine } from "./buyingMachineRouter";
import { createBuilding, patchBuilding } from "./buildingRouter";
import { createOutcome, patchOutcome } from "./outcomeRouter";
const productIds = z.array(
  z.object({
    ownId: z.number().or(z.string()),
    year: z.number(),
    productId: z.number(),
    tech: z.array(
      z.object({
        cultivationTechnologyId: z.number(),
        area: z.string().or(z.number()),
        techCartId: z.number(),
      })
    ),
  })
);
const changeProductType = z.object({
  busId: z.number(),
  productIds: productIds,
});
const createBusProd = z.object({
  year: z.number(),
  productId: z.number(),
  cultivationTechnologyId: z.number(),
  techCartId: z.number(),
  area: z.number(),
  businessPlanId: z.number(),
});
export type CreateBusProd = z.infer<typeof createBusProd>;
const patchBusProd = createBusProd.extend({
  ownId: z.number(),
  price: z.number(),
});
export type PatchBusProd = z.infer<typeof patchBusProd>;
const createType = z.object({
  name: z.string(),
  topic: z.string(),
  initialAmount: z.number(),
  enterpriseId: z.number().nullish().optional(),
  dateStart: z.string(),
  realizationTime: z.number(),
});
export type CreateBusinessPlan = z.infer<typeof createType>;
const patchType = createType.extend({
  planId: z.number(),
});
export type PatchBusinessPlan = z.infer<typeof patchType>;
const deleteType = z.object({
  planId: z.number(),
});
export type DeleteBusinessPlan = z.infer<typeof deleteType>;
const setIsPublic = z.object({
  planId: z.number(),
  isPublic: z.boolean(),
  description: z.string().optional(),
});
export type SetIsPublicBusinessPlan = z.infer<typeof setIsPublic>;
const setIsAgree = z.object({
  planId: z.number(),
  isAgree: z.boolean(),
  description: z.string().optional(),
});
export type SetIsAgreeBusinessPlan = z.infer<typeof setIsAgree>;
export type ChangeProductType = z.infer<typeof changeProductType>;
const createFinancingForBusiness = createFinancing.extend({
  busId: z.number(),
});
export type CreateFinancingForBusiness = z.infer<
  typeof createFinancingForBusiness
>;
const patchFinancingForBusiness = createFinancingForBusiness.extend({
  financingId: z.number(),
});
export type PatchFinancingForBusiness = z.infer<
  typeof patchFinancingForBusiness
>;
const businessRouter = router({
  // getCategory: publicProcedure.query(async () => {
  //   const res = await BusinessService.getCategory();
  //   return res;
  // }),
  get: publicProcedure.query(async ({ ctx }) => {
    const res: resBusinessPlan[] = await BusinessService.get(ctx.user);

    return res;
  }),
  create: publicProcedure.input(createType).query(async ({ input, ctx }) => {
    const res: resBusinessPlan | undefined | null =
      await BusinessService.create(ctx.user, input);
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
    const res: number | undefined = await BusinessService.delete(
      ctx.user,
      input
    );
    return res;
  }),
  getPublic: publicProcedure.query(async () => {
    const res = await BusinessService.getPublic();
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
  addFinancing: publicProcedure
    .input(z.object({ businessId: z.number(), value: z.array(z.number()) }))
    .query(async ({ input, ctx }) => {
      let res = await BusinessService.addFinancing(input);
      return res;
    }),
  createBusProd: publicProcedure
    .input(createBusProd)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createBusProd(ctx.user, input);
      return res;
    }),
  patchBusProd: publicProcedure
    .input(patchBusProd)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.patchBusProd(ctx.user, input);
      return res;
    }),
  createFinancingForBusiness: publicProcedure
    .input(createFinancingForBusiness)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createFinancingForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  patchFinancingForBusiness: publicProcedure
    .input(patchFinancingForBusiness)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.patchFinancingForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  createBuyingMachineForBusiness: publicProcedure
    .input(createBuyingMachine)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createBuyingMachineForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  patchBuyingMachineForBusiness: publicProcedure
    .input(patchBuyingMachine)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.patchBuyingMachineForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  createBuildingForBusiness: publicProcedure
    .input(createBuilding)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createBuildingForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  patchBuildingForBusiness: publicProcedure
    .input(patchBuilding)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.patchBuildingForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  createOutcomeForBusiness: publicProcedure
    .input(createOutcome)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createOutcomeForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  patchOutcomeForBusiness: publicProcedure
    .input(patchOutcome)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.patchOutcomeForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
});
export default businessRouter;
