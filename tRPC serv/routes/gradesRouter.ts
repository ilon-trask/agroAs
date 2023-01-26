import { publicProcedure, router } from "../trpc";
import gradeService from "../controllers/gradeService";

export const gradesRouter = router({
  get: publicProcedure.query(async () => {
    const grades = await gradeService.get();
    return grades;
  }),
});
