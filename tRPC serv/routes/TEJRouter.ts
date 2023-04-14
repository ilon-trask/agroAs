import TEJService, {
  resTechnologicalEconomicJustification,
} from "../controllers/TEJService";
import {
  IcultivationTechnologies,
  ItechnologicalEconomicJustification,
} from "../models/models";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

const createTEJ = z.object({
  cartId: z.number(),
  comment: z.string(),
});
export type createTEJType = z.infer<typeof createTEJ>;

export const TEJRouter = router({
  getCultivationTechnologies: publicProcedure.query(async () => {
    const cultivation: IcultivationTechnologies[] | undefined =
      await TEJService.getCultivationTechnologies();
    return cultivation;
  }),
  create: publicProcedure.input(createTEJ).query(async ({ input, ctx }) => {
    const res: resTechnologicalEconomicJustification | undefined =
      await TEJService.create(input, ctx.user);
    return res;
  }),
  get: publicProcedure.query(async ({ ctx }) => {
    const res: resTechnologicalEconomicJustification[] | undefined =
      await TEJService.get(ctx.user);
    return res;
  }),
});
