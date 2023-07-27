import { publicProcedure, router } from "../trpc";
import z from "zod";
import incomeService, { resYieldPlant } from "../controllers/incomeService";
import { Iculture } from "../models/models";
const createYieldCalc = z.object({
  numberFruit: z.number(),
  fruitWeight: z.number(),
  numberFlower: z.number(),
  numberSocket: z.number(),
  numberPlantsPerHectare: z.number(),
  yieldPlantId: z.number(),
});
export type createYieldCalcType = z.infer<typeof createYieldCalc>;
const createYieldPlant = z.object({
  cultureId: z.number(),
  cultivationTechnologyId: z.number(),
  landingPeriod: z.enum(["Весна", "Осінь"]),
});
export type CreateYieldPlantType = z.infer<typeof createYieldPlant>;
const updateYieldPlant = createYieldPlant.extend({
  yieldPlantId: z.number(),
});
export type UpdateYieldPlantType = z.infer<typeof updateYieldPlant>;
const createIncome = z.object({
  type: z.enum([
    "Основне виробництво",
    "Допоміжне виробництво",
    "Кредит",
    "Інвестиції",
    "Державна підтримка",
    "Грант",
    "Не визначино",
  ]),
  group: z.enum([
    "Виручка від основного виробництва",
    "Виручка від допоміжного виробництва",
    "Кредит оботній",
    "Кредит інвестиційний",
    "Інвестиції власні",
    "Інвестиції інвесторські",
    "Інвестиції залучені від інвесторів",
    "Субсидії",
    "Дотації",
    "Поворотня фінансова допомога",
    "Грантові кошти",
    "Не визначино",
  ]),
  isUsing: z.boolean(),
  propId: z.number(),
});
export type CreateIncome = z.infer<typeof createIncome>;
const patchIncome = createIncome.extend({ incomeId: z.number() });
export type PatchIncome = z.infer<typeof patchIncome>;
const setIsUsingIncome = z.object({
  incomeId: z.number(),
  value: z.boolean(),
});
export type setIsUsingIncomeType = z.infer<typeof setIsUsingIncome>;
const createProduct = z.object({
  name: z.string(),
  cultureId: z.number(),
});
export type CreateProductType = z.infer<typeof createProduct>;
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
  getYieldCalculation: publicProcedure.query(async ({ ctx }) => {
    const res = await incomeService.getCalculation();
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
    .input(createYieldPlant)
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

  createProduct: publicProcedure
    .input(createProduct)
    .query(({ ctx, input }) => {
      const res = incomeService.createProduct(ctx.user, input);
      return res;
    }),
});
