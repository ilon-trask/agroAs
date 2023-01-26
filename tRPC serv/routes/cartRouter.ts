import { router, publicProcedure } from "../trpc";
import z from "zod";
import { tech_cart } from "../models/models";

import TechCartService from "../controllers/TechCartService";

import { Idata } from "../controllers/TechCartService";

export const cartRouter = router({
  get: publicProcedure.query(async () => {
    const cart: Array<Idata> = await TechCartService.getAll();

    cart.sort((a, b) => a.id! - b.id!);
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
    .query(({ input }) => {
      const { id } = input;
      TechCartService.delete(id);
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