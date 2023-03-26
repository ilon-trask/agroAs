import { router, publicProcedure } from "../trpc";
import z from "zod";
import ResumeService from "../controllers/ResumeService";
import { Iresume } from "../models/models";
const patchProps = z.object({
  businessId: z.number(),
  data: z.object({
    aboutProject: z.string().nullable().optional(),
    investment: z.string().nullable().optional(),
    finIndicators: z.string().nullable().optional(),
    deduction: z.string().nullable().optional(),
  }),
});
export type PatchProps = z.infer<typeof patchProps>;
const setId_tableInvestment = z.object({
  businessPlanId: z.number(),
  cartId: z.number(),
});
export type SetId_tableInvestment = z.infer<typeof setId_tableInvestment>;
export const resumeRouter = router({
  patch: publicProcedure.input(patchProps).query(async ({ input }) => {
    const resumes: Iresume | null | undefined = await ResumeService.patch(
      input
    );
    return resumes;
  }),
  setId_tableInvestment: publicProcedure
    .input(setId_tableInvestment)
    .query(async ({ input, ctx }) => {
      const res: Iresume | undefined | null =
        await ResumeService.setId_tableInvestment(input);
      return res;
    }),
});
