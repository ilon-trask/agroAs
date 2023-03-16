import { publicProcedure, router } from "../trpc";
import culturalService from "../controllers/culturalService";

export const culturalRouter = router({
  get: publicProcedure.query(async () => {
    const cultural = await culturalService.get();
    return cultural;
  }),
});
