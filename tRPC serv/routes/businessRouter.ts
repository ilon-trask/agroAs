import { router, publicProcedure } from "../trpc";
import z from "zod";
import BusinessService, {
  resBusinessPlan,
} from "../controllers/BusinessService";
import { createFinancing } from "./financingRouter";
import { createBuyingMachine, patchBuyingMachine } from "./buyingMachineRouter";
import { createBuilding, patchBuilding } from "./buildingRouter";
import { createOutcome, patchOutcome } from "./outcomeRouter";
import { createLand, patchLand } from "./landRouter";
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
  price: z.number().nullish().optional(),
});
export type PatchBusProd = z.infer<typeof patchBusProd>;
const deleteBusProd = z.object({ id: z.number(), busId: z.number() });
export type DeleteBusProd = z.infer<typeof deleteBusProd>;
const createType = z.object({
  name: z.string(),
  topic: z.string(),
  initialAmount: z.number(),
  enterpriseId: z.number().nullish().optional(),
  dateStart: z.string(),
  realizationTime: z.number(),
  goal: z.string().nullish(),
  responsiblePerson: z.string().nullish(),
  city: z.string().nullish(),
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
const deleteForBusiness = z.object({
  id: z.number(),
  busId: z.number(),
});
export type DeleteForBusiness = z.infer<typeof deleteForBusiness>;
const getOnePlan = z.object({ busId: z.number() });
export type GetOnePlan = z.infer<typeof getOnePlan>;
const createUpdateCreditParameter = z.object({
  financingId: z.number(),
  procent: z.number(),
  startDatePayments: z.string().nullish(),
  monthlyСommission: z.number(),
  repaymentMethod: z.enum(["Ануїтет", "Класична схема"]),
  paymentsFrequency: z.enum(["Кожний місяць", "Кожен рік"]),
  termType: z.enum(["на бізнес-план", "на роки"]).nullish(),
  creditTerm: z.number(),
  commissionForCredit: z.number(),
  busId: z.number(),
});
export type CreateUpdateCreditParameterType = z.infer<
  typeof createUpdateCreditParameter
>;
const createUpdateAmortization = z.object({
  id: z.number().nullish(),
  introductionDate: z.string(),
  year: z.number(),
  depreciationPeriod: z.number(),
  amount: z.number(),
  buildingId: z.number().nullish(),
  buyingMachineId: z.number().nullish(),
  busId: z.number(),
});
export type CreateUpdateAmortizationType = z.infer<
  typeof createUpdateAmortization
>;

const businessRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res: resBusinessPlan[] = await BusinessService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createType).mutation(async ({ input, ctx }) => {
    const res = await BusinessService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchType).mutation(async ({ input, ctx }) => {
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
  deleteBusProd: publicProcedure
    .input(deleteBusProd)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.deleteBusProd(ctx.user, input);
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
  deleteFinancingForBusiness: publicProcedure
    .input(deleteForBusiness)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.deleteFinancingForBusiness(
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
  deleteBuyingMachineForBusiness: publicProcedure
    .input(deleteForBusiness)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.deleteBuyingMachineForBusiness(
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
  deleteBuildingForBusiness: publicProcedure
    .input(deleteForBusiness)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.deleteBuildingForBusiness(
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
  deleteOutcomeForBusiness: publicProcedure
    .input(deleteForBusiness)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.deleteOutcomeForBusiness(
        ctx.user,
        input
      );
      return res;
    }),
  createLandForBusiness: publicProcedure
    .input(createLand)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createLandForBusiness(ctx.user, input);
      return res;
    }),
  patchLandForBusiness: publicProcedure
    .input(patchLand)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.patchLandForBusiness(ctx.user, input);
      return res;
    }),
  deleteLandForBusiness: publicProcedure
    .input(deleteForBusiness)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.deleteLandForBusiness(ctx.user, input);
      return res;
    }),
  createUpdateCreditParameter: publicProcedure
    .input(createUpdateCreditParameter)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createUpdateCreditParameter(input);
      return res;
    }),
  createUpdateAmortization: publicProcedure
    .input(createUpdateAmortization)
    .query(async ({ ctx, input }) => {
      const res = await BusinessService.createUpdateAmortization(input);
      return res;
    }),
});
export default businessRouter;
