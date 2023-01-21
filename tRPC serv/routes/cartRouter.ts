import { router, publicProcedure } from "../trpc";
import z from "zod";

import TechCartService = require("../controllers/TechCartService");

interface Idata {
  id: number;
  nameCart: string;
  area: number;
  salary: number;
  priceDiesel: number;
  price?: number;
}

export const cartRouter = router({
  get: publicProcedure.query(async () => {
    const cart: Array<Idata> = await TechCartService.getAll();
    console.log(123);

    cart.sort((a, b) => a.id - b.id);
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
