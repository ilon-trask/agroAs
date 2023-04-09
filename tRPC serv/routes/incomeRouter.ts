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
export const incomeRouter = router({
  getCultural: publicProcedure.query(async () => {
    const cultures: Iculture[] | undefined = await incomeService.getCultural();
    return cultures;
  }),

  get: publicProcedure.query(async ({ ctx }) => {
    const res: resYieldPlant[] | undefined = await incomeService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(
      z.object({
        cultureId: z.number(),
        comment: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const yieldPlant: resYieldPlant | undefined = await incomeService.create(
        input,
        ctx.user
      );
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
  delete: publicProcedure
    .input(z.object({ yieldPlantId: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await incomeService.delete(input, ctx.user);
      return res;
    }),
  update: publicProcedure
    .input(updateYieldPlant)
    .query(async ({ input, ctx }) => {
      const res: resYieldPlant | null | undefined = await incomeService.update(
        input,
        ctx.user
      );
      return res;
    }),
});
