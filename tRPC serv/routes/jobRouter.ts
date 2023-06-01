import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import FinancingService from "../controllers/FinancingService";
import JobService from "../controllers/JobService";

const createJob = z.object({
  name: z.string(),
  isFOP: z.boolean(),
  isFOPWith: z.boolean(),
  isQO: z.boolean(),
});
export type CreateJobType = z.infer<typeof createJob>;
const patchJob = createJob.extend({ jobId: z.number() });
export type PatchJobType = z.infer<typeof patchJob>;
export const jobRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await JobService.get(ctx.user);
    return res;
  }),
  create: publicProcedure.input(createJob).query(async ({ ctx, input }) => {
    const res = await JobService.create(ctx.user, input);
    return res;
  }),
  patch: publicProcedure.input(patchJob).query(async ({ ctx, input }) => {
    const res = await JobService.patch(ctx.user, input);
    return res;
  }),
  delete: publicProcedure
    .input(z.object({ jobId: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await JobService.delete(ctx.user, input);
      return res;
    }),
});
