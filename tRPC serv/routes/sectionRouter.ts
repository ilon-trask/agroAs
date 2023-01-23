import { router, publicProcedure } from "../trpc";
import z from "zod";

import SectionService from "../controllers/SectionService";
import { Isection } from "../models/models";

export const sectionRouter = router({
  get: publicProcedure.query(async () => {
    const data = await SectionService.getAll();
    return data;
  }),
});
