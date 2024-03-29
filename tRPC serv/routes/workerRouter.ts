import { publicProcedure, router } from "../trpc";
import * as z from "zod";
import workerService from "../controllers/workerService";

const createWorker = z.object({
  amount: z.number(),
  dateFrom: z.string().optional().nullable().optional(),
  dateTo: z.string().optional().nullable().optional(),
  year: z.number(),
  isConst: z.boolean(),
  salary: z.number(),
  enterpriseId: z.number(),
  class: z.enum(["Адміністративний", "Виробничий", "Інженерно технічний"]),
  form: z.enum([
    "ФОП",
    "ФОП + 1",
    "ФОП + 2",
    "ФОП + 3",
    "ФОП + 4",
    "Юридична особа ФГ",
  ]),
  jobId: z.number(),
  businessPlanId: z.number(),
});
export type CreateWorkerType = z.infer<typeof createWorker>;
const patchWorker = createWorker.extend({ workerId: z.number() });
export type PatchWorkerType = z.infer<typeof patchWorker>;
export const workerRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await workerService.get(ctx.user);
    return res;
  }),
  create: publicProcedure
    .input(createWorker)
    .mutation(async ({ ctx, input }) => {
      const res = await workerService.create(ctx.user, input);
      return res;
    }),
  patch: publicProcedure.input(patchWorker).mutation(async ({ ctx, input }) => {
    const res = await workerService.patch(ctx.user, input);
    return res;
  }),

  delete: publicProcedure
    .input(z.object({ workerId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const res = await workerService.delete(ctx.user, input);
      return res;
    }),
});
