import { router, publicProcedure } from "../trpc";
import z from "zod";
import { Itech_cart } from "../models/models";

import TechCartService, {
  resTechCartsWithOpers,
} from "../controllers/TechCartService";
const createCartProps = z.object({
  nameCart: z.string(),
  area: z.number(),
  salary: z.number(),
  isPublic: z.boolean().optional(),
  priceDiesel: z.number(),
  isComplex: z.boolean().optional(),
  sectionId: z.number().optional(),
  cultureId: z.number().optional(),
  cultivationTechnologyId: z.number().optional(),
  year: z.number().optional(),
});
export type CreateCartType = z.infer<typeof createCartProps>;
export const cartRouter = router({
  getCart: publicProcedure
    .input(z.object({ cartId: z.number() }))
    .query(async ({ input }) => {
      const carts = await TechCartService.getCart(input.cartId);

      return carts;
    }),
  getOnlyCart: publicProcedure.query(async ({ ctx }) => {
    const carts = await TechCartService.getOnlyCarts(ctx.user);
    return carts;
  }),
  create: publicProcedure
    .input(createCartProps)
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
        userId: z.string().optional().nullish(),
        isComplex: z.boolean().optional(),
        sectionId: z.number().optional().nullable(),
        cultureId: z.number().optional(),
        cultivationTechnologyId: z.number().optional(),
        year: z.number().optional(),
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
              id: z.number().optional().nullish(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //@ts-ignore
      const cart: resTechCartsWithOpers[] = await TechCartService.patchCart(
        //@ts-ignore
        input,
        ctx.user
      );
      return cart;
    }),
  setIsPublic: publicProcedure
    .input(
      z.object({
        id: z.number(),
        isPublic: z.boolean(),
        authorName: z.string().optional(),
        cultural: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cart = await TechCartService.setIsPublic(input, ctx.user);
      return cart;
    }),
  getCopyCarts: publicProcedure.query(async ({ ctx }) => {
    const cart: Itech_cart[] | undefined = await TechCartService.getCopyCarts(
      ctx.user
    );
    return cart;
  }),
  makeCopy: publicProcedure
    .input(z.object({ cartId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { cartId } = input;
      const res: resTechCartsWithOpers[] = await TechCartService.copyCarts(
        cartId,
        ctx.user
      );
      return res;
    }),
  getNoAgreeCarts: publicProcedure.query(async () => {
    const res: Itech_cart[] = await TechCartService.getIsAgreeCarts();
    return res;
  }),
  setIsAgreeCarts: publicProcedure
    .input(
      z.object({
        isAgree: z.boolean(),
        cartId: z.number(),
        authorName: z.string().optional(),
        cultural: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .query(
      async ({ input, ctx }) =>
        await TechCartService.setIsAgreeCarts(
          ctx.user,
          input.isAgree,
          input.cartId,
          input.authorName,
          input.cultural,
          input.description
        )
    ),
  getAgreeCarts: publicProcedure.query(async () => {
    const res = await TechCartService.getAgreeCarts();
    return res;
  }),
  downloaded: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        value: z.number(),
      })
    )
    .query(async ({ input }) => {
      const cart: resTechCartsWithOpers | null =
        await TechCartService.downloaded(input);
      return cart;
    }),
  copyComplex: publicProcedure
    .input(z.object({ complexId: z.number(), cartId: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await TechCartService.copyComplex(
        input.complexId,
        input.cartId,
        ctx.user
      );
      return res;
    }),
});
