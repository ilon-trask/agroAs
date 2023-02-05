import { router, publicProcedure } from "../trpc";
import z, { number } from "zod";

import OperService from "../controllers/OperService";
import { Ioper } from "../controllers/OperService";
import { Itech_operation } from "../models/models";

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
              fuelConsumption: z.number(),
              workingSpeed: z.number(),
              idTractor: z.number(),
              idMachine: z.number(),
            }),
            section: z.number(),
          }),
        })
      )
      .query(async ({ input }) => OperService.createCostMechanical(input)),
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
              consumptionPerHectare: z.number(),
              price: z.number(),
              unitsOfConsumption: z.string(),
              unitsOfCost: z.string(),
            }),
          }),
        })
      )
      .query(async ({ input }) => await OperService.patchCostMaterials(input)),
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
              price: z.number(),
              unitsOfCost: z.string(),
            }),
          }),
        })
      )
      .query(async ({ input }) => await OperService.patchCostService(input)),
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
              fuelConsumption: z.number(),
              idMachine: z.number(),
              idTractor: z.number(),
              workingSpeed: z.number(),
            }),
          }),
        })
      )
      .query(async ({ input }) => await OperService.patchCostMechanical(input)),
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
              price: z.number(),
              unitsOfCost: z.string(),
            }),
          }),
        })
      )
      .query(async ({ input }) => await OperService.patchCostTransport(input)),
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
              gradeId: z.number(),
              type: z.number(),
              yieldСapacity: z.number(),
              productionRateAmount: z.number().optional(),
              productionRateTime: z.number().optional(),
              productionRateWeight: z.number().optional(),
              salaryPerShift: z.number().optional(),
              spending: z.number().optional(),
              unitOfMeasurement: z.string().optional(),
            }),
          }),
        })
      )
      .query(async ({ input }) => await OperService.patchCostHandWork(input)),
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
