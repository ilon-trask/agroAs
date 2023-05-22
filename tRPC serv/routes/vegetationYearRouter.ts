import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import JobService from "../controllers/JobService";
import vegetationYearsService from "../controllers/vegetationYearsService";

const createVegetation = z.object({
  cultivationTechnologyId: z.number(),
  cultureId: z.number(),
  techCartId: z.number().optional(),
  yieldPlantId: z.number().optional(),
  data: z.array(
    z.object({
      year: z.enum([
        "0рік весна",
        "0рік осінь",
        "1рік",
        "2рік ",
        "3рік",
        "4рік",
        "5рік",
        "6рік",
        "7рік",
        "8рік",
        "Наступні",
      ]),
      vegetationCoeff: z.number(),
      technologyCoeff: z.number(),
      seedlingsCoeff: z.number(),
    })
  ),
});
export type CreateVegetationType = z.infer<typeof createVegetation>;
export const vegetationRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await vegetationYearsService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(createVegetation)
    .query(async ({ ctx, input }) => {
      const res = await vegetationYearsService.create(ctx.user, input);
      return res;
    }),
});
