import { router, publicProcedure } from "../trpc";
import z from "zod";

import OperService from "../controllers/OperService";

export const operRouter = router({
  create: router({
    costMechanical: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              nameOper: z.string(),
              date: z.string().nullable(),
              fuelConsumption: z.number(),
              workingSpeed: z.number(),
              idTractor: z.number(),
              idMachine: z.number(),
            }),
            section: z.number(),
          }),
        })
      )
      .query(async ({ input }) => {
        console.log("input");
        console.log(input);

        return await OperService.createCostMechanical(input);
      }),
    costHandWork: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              nameOper: z.string(),
              date: z.string().nullable(),
              gradeId: z.number(),
              productionRateAmount: z.number().optional(),
              productionRateTime: z.number().optional(),
              productionRateWeight: z.number().optional(),
              salaryPerShift: z.number().optional(),
              spending: z.number().optional(),
              type: z.number(),
              unitOfMeasurement: z.string().optional(),
              yieldСapacity: z.number(),
            }),
            section: z.number(),
          }),
        })
      )
      .query(async ({ input }) => await OperService.createCostHandWork(input)),
    costMaterials: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              nameOper: z.string(),
              date: z.string().nullable(),
              consumptionPerHectare: z.number(),
              price: z.number(),
              unitsOfConsumption: z.string(),
              unitsOfCost: z.string(),
            }),
            section: z.number(),
          }),
        })
      )
      .query(async ({ input }) => await OperService.createCostMaterials(input)),
    costServices: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              nameOper: z.string(),
              date: z.string().nullable(),
              price: z.number(),
              unitsOfCost: z.string(),
            }),
            section: z.number(),
          }),
        })
      )
      .query(async ({ input }) => await OperService.createCostServices(input)),
    costTransport: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              nameOper: z.string(),
              date: z.string().nullable(),
              price: z.number(),
              unitsOfCost: z.string(),
            }),
            section: z.number(),
          }),
        })
      )
      .query(async ({ input }) => await OperService.createCostTransport(input)),
  }),

  patch: router({
    costMaterials: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              operId: z.number(),
              nameOper: z.string(),
              date: z.string().nullable(),
              consumptionPerHectare: z.number(),
              price: z.number(),
              unitsOfConsumption: z.string(),
              unitsOfCost: z.string(),
            }),
          }),
        })
      )
      .query(
        async ({ input, ctx }) =>
          await OperService.patchCostMaterials(input, ctx.user)
      ),
    costServices: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              operId: z.number(),
              nameOper: z.string(),
              date: z.string().nullable(),
              price: z.number(),
              unitsOfCost: z.string(),
            }),
          }),
        })
      )
      .query(
        async ({ input, ctx }) =>
          await OperService.patchCostService(input, ctx.user)
      ),
    costMechanical: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              operId: z.number(),
              nameOper: z.string(),
              date: z.string().nullable(),
              fuelConsumption: z.number(),
              idMachine: z.number(),
              idTractor: z.number(),
              workingSpeed: z.number(),
              salary: z.number().optional(),
              priceDiesel: z.number().optional(),
            }),
          }),
        })
      )
      .query(
        async ({ input, ctx }) =>
          await OperService.patchCostMechanical(input, ctx.user)
      ),
    costTransport: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              operId: z.number(),
              nameOper: z.string(),
              date: z.string().nullable(),
              price: z.number(),
              unitsOfCost: z.string(),
            }),
          }),
        })
      )
      .query(
        async ({ input, ctx }) =>
          await OperService.patchCostTransport(input, ctx.user)
      ),
    costHandWork: publicProcedure
      .input(
        z.object({
          cartId: z.number(),
          arr: z.object({
            cell: z.enum([
              "costMaterials",
              "costServices",
              "costMechanical",
              "costTransport",
              "costHandWork",
            ]),
            res: z.object({
              operId: z.number(),
              nameOper: z.string(),
              date: z.string().nullable(),
              gradeId: z.number(),
              type: z.number(),
              yieldСapacity: z.number(),
              productionRateAmount: z.number().optional(),
              productionRateTime: z.number().optional(),
              productionRateWeight: z.number().optional(),
              salaryPerShift: z.number().optional(),
              spending: z.number().optional(),
              unitOfMeasurement: z.string().optional(),
              salary: z.number().optional(),
            }),
          }),
        })
      )
      .query(
        async ({ input, ctx }) =>
          await OperService.patchCostHandWork(input, ctx.user)
      ),
  }),

  delete: publicProcedure
    .input(z.object({ cartId: z.number(), operId: z.number() }))
    .query(async ({ input }) => {
      const oper = await OperService.deleteOper(input);

      return oper;
    }),
  getProps: publicProcedure
    .input(
      z.object({
        operId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const oper = await OperService.getProps(input);
      return oper;
    }),
});
