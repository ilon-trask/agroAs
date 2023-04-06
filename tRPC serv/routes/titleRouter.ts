import { router, publicProcedure } from "../trpc";
import z from "zod";
import { ItitlePage } from "../models/models";
import titleService from "../controllers/titleService";
const patchProps = z.object({
  businessId: z.number(),
  title: z.string(),
});
export type PatchProps = z.infer<typeof patchProps>;
export const titleRouter = router({
  patch: publicProcedure.input(patchProps).mutation(async ({ input }) => {
    const title: ItitlePage | null | undefined = await titleService.patch(
      input
    );
    return title;
  }),
});
