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

const setIsPublicTEJ = z.object({
  TEJId: z.number(),
  isPublic: z.boolean(),
  authorName: z.string(),
  publicComment: z.string().optional(),
  isAgree: z.boolean().optional(),
});
export type setIsPublicTEJType = z.infer<typeof setIsPublicTEJ>;

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
  delete: publicProcedure
    .input(z.object({ TEJId: z.number() }))
    .query(async ({ input, ctx }) => {
      return await TEJService.delete(input, ctx.user);
    }),
  patch: publicProcedure
    .input(
      z.object({
        TEJId: z.number(),
        cartId: z.number(),
        comment: z.string(),
        area: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const res: resTechnologicalEconomicJustification | undefined =
        await TEJService.patch(input, ctx.user);
      return res;
    }),
  setIsPublic: publicProcedure
    .input(setIsPublicTEJ)
    .query(async ({ input, ctx }) => {
      const res: resTechnologicalEconomicJustification | undefined =
        await TEJService.setIsPublic(input, ctx.user);
      return res;
    }),
  getNoAgree: publicProcedure.query(async ({ ctx }) => {
    const res = await TEJService.getNoAgree(ctx.user);
    return res;
  }),
  setIsAgree: publicProcedure
    .input(setIsPublicTEJ)
    .query(async ({ input, ctx }) => {
      const res: resTechnologicalEconomicJustification | undefined =
        await TEJService.setIsAgree(input, ctx.user);
      return res;
    }),
  getAgreeTEJ: publicProcedure.query(async () => {
    const res = await TEJService.getAgree();
    return res;
  }),
  getTechnologies: publicProcedure.query(async () => {
    const res: IcultivationTechnologies[] = await TEJService.getTechnologies();
    return res;
  }),
});
