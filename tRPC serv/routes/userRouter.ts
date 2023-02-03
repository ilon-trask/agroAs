import { publicProcedure, router } from "../trpc";
import z from "zod";
import userService from "../controllers/userService";
export const userRouter = router({
  registration: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        role: z.number().nullable(),
      })
    )
    .query(async ({ input }) => {
      const { email, password, role } = input;
      const user = await userService.registration(email, password, role);
      return user;
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(({ input }) => {
      const { email, password } = input;
      const user = userService.login(email, password);
      return user;
    }),
  //   check: publicProcedure,
});
