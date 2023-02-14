import { router, publicProcedure } from "../trpc";
import z, { optional } from "zod";
import { tech_cart } from "../models/models";

import TechCartService from "../controllers/TechCartService";

import { Idata } from "../controllers/TechCartService";

export const cartRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const cart = await TechCartService.getAll(ctx.user);

    return cart;
  }),

  create: publicProcedure
    .input(
      z.object({
        nameCart: z.string(),
        area: z.number(),
        salary: z.number(),
        isPublic: z.boolean().optional(),
        priceDiesel: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cart = await TechCartService.create(input, ctx.user);
      return cart;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id } = input;
      let data = await TechCartService.delete(id, ctx.user);
      return data;
    }),
  patch: publicProcedure
    .input(
      z.object({
        id: z.number(),
        nameCart: z.string(),
        area: z.number(),
        salary: z.number(),
        isPublic: z.boolean().optional().nullable(),
        priceDiesel: z.number(),
        tech_operations: z
          .array(
            z.object({
              aggregate: z
                .object({
                  agriculturalMachineId: z.number(),
                  fuelConsumption: z.number(),
                  id: z.number(),
                  techOperationId: z.number(),
                  tractorId: z.number(),
                  workingSpeed: z.number(),
                })
                .nullable(),
              cell: z.enum([
                "costMaterials",
                "costServices",
                "costMechanical",
                "costTransport",
                "costHandWork",
              ]),
              costCars: z.number().nullable().optional(),
              costFuel: z.number().nullable().optional(),
              costHandWork: z.number().nullable().optional(),
              costMachineWork: z.number().nullable().optional(),
              cost_hand_work: z
                .object({
                  gradeId: z.number(),
                  id: z.number(),
                  nameOper: z.string(),
                  pricePerHourPersonnel: z.number().nullish(),
                  productionPerShift: z.number().nullish(),
                  productionRateAmount: z.number().nullish(),
                  productionRateTime: z.number().nullish(),
                  productionRateWeight: z.number().nullish(),
                  salaryPerShift: z.number().nullish(),
                  spending: z.number().nullish(),
                  techOperationId: z.number(),
                  type: z.number(),
                  unitOfMeasurement: z.string().nullish(),
                  yieldСapacity: z.number().nullish(),
                })
                .nullable(),
              cost_material: z
                .object({
                  consumptionPerHectare: z.number(),
                  id: z.number(),
                  nameMaterials: z.string(),
                  price: z.number(),
                  techOperationId: z.number(),
                  unitsOfConsumption: z.string(),
                  unitsOfCost: z.string(),
                })
                .nullable(),
              cost_service: z
                .object({
                  id: z.number(),
                  nameService: z.string(),
                  price: z.number(),
                  techOperationId: z.number(),
                  unitsOfCost: z.string(),
                })
                .nullable(),
              cost_transport: z
                .object({
                  id: z.number(),
                  nameTransport: z.string(),
                  price: z.number(),
                  unitsOfCost: z.string(),
                  techOperationId: z.number(),
                })
                .nullable(),
              nameOperation: z.string(),
              sectionId: z.number(),
              techCartId: z.number(),
              id: z.number(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //@ts-ignore
      const cart = await TechCartService.patchCart(input, ctx.user);
      return cart;
    }),
  setIsPublic: publicProcedure
    .input(z.object({ id: z.number(), isPublic: z.boolean() }))
    .query(async ({ input, ctx }) => {
      const cart = await TechCartService.setIsPublic(input, ctx.user);
      return cart;
    }),
});
