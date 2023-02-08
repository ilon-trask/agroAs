import { router, publicProcedure } from "../trpc";
import z from "zod";
import { tech_cart } from "../models/models";

import TechCartService from "../controllers/TechCartService";

import { Idata } from "../controllers/TechCartService";

export const cartRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    console.log(ctx.user);

    const cart = await TechCartService.getAll();

    return cart;
  }),

  create: publicProcedure
    .input(
      z.object({
        nameCart: z.string(),
        area: z.number(),
        salary: z.number(),
        priceDiesel: z.number(),
      })
    )
    .query(async ({ input }) => {
      const cart = await TechCartService.create(input);
      return cart;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      let data = await TechCartService.delete(id);
      return data;
    }),
  patch: publicProcedure
    .input(
      z.object({
        id: z.number(),
        nameCart: z.string(),
        area: z.number(),
        salary: z.number(),
        priceDiesel: z.number(),
      })
    )
    .query(async ({ input }) => {
      const cart = await TechCartService.patchCart(input);
      return cart;
    }),
});
