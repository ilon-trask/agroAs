import { publicProcedure, router } from "../trpc";
import z from "zod";
import incomeService, { resYieldPlant } from "../controllers/incomeService";
import {
  Iculture,
  IyieldCalculation,
  IyieldPlant,
  yieldCalculation,
} from "../models/models";
const createYieldCalc = z.object({
  numberFruit: z.number(),
  fruitWeight: z.number(),
  numberFlower: z.number(),
  numberSocket: z.number(),
  numberPlantsPerHectare: z.number(),
  yieldPlantId: z.number(),
});
export type createYieldCalcType = z.infer<typeof createYieldCalc>;
const updateYieldPlant = z.object({
  yieldPlantId: z.number(),
  cultureId: z.number(),
  comment: z.string(),
});
export type updateYieldPlantType = z.infer<typeof updateYieldPlant>;
const createIncome = z.object({
  name: z.string(),
  date: z.string(),
  TypeId: z.number(),
  SubTypeId: z.number(),
});
export type CreateIncome = z.infer<typeof createIncome>;
export const incomeRouter = router({
  getCultural: publicProcedure.query(async () => {
    const cultures: Iculture[] | undefined = await incomeService.getCultural();
    return cultures;
  }),

  getYieldPlant: publicProcedure.query(async ({ ctx }) => {
    const res: resYieldPlant[] | undefined = await incomeService.getYieldPlant(
      ctx.user
    );
    return res;
  }),
  getOneYieldPlant: publicProcedure
    .input(z.object({ plantId: z.number() }))
    .query(async ({ input }) => {
      const res: resYieldPlant = await incomeService.getOneYieldPlant(
        input.plantId
      );
      return res;
    }),
  createYieldPlant: publicProcedure
    .input(
      z.object({
        cultureId: z.number(),
        comment: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const yieldPlant: resYieldPlant | undefined =
        await incomeService.createYieldPlant(input, ctx.user);
      return yieldPlant;
    }),
  createCalc: publicProcedure
    .input(createYieldCalc)
    .query(async ({ input, ctx }) => {
      const yieldCalc: resYieldPlant | undefined =
        await incomeService.createCalc(input, ctx.user);
      if (yieldCalc) return yieldCalc;
    }),
  updateCalc: publicProcedure
    .input(createYieldCalc)
    .query(async ({ input, ctx }) => {
      const res: resYieldPlant | null | undefined =
        await incomeService.updateCalc(input, ctx.user);
      return res;
    }),
  deleteYieldPlant: publicProcedure
    .input(z.object({ yieldPlantId: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await incomeService.deleteYieldPlant(input, ctx.user);
      return res;
    }),
  updateYieldPlant: publicProcedure
    .input(updateYieldPlant)
    .query(async ({ input, ctx }) => {
      const res: resYieldPlant | null | undefined =
        await incomeService.updateYieldPlant(input, ctx.user);
      return res;
    }),
  create: publicProcedure.input(createIncome).query(async ({ input, ctx }) => {
    const res = await incomeService.create(ctx.user, input);
    return res;
  }),
  getProduct: publicProcedure.query(async ({ ctx }) => {
    const res = incomeService.getProduct(ctx.user);
    return res;
  }),
});
