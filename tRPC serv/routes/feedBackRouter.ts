import { router, publicProcedure } from "../trpc";
import z from "zod";
import nodeMailer from "nodemailer";
const get = z.object({
  email: z.string().email(),
  tel: z.string().optional(),
  message: z.string(),
});

const transporter = nodeMailer.createTransport({
  service: "gmail",
  //   port: 465,
  //   secure: true,
  auth: {
    user: "agrodibi@gmail.com",
    pass: "ikyaoogxxrssmfvd",
  },
});

export type getFeedBackType = z.infer<typeof get>;
const feedBackRouter = router({
  get: publicProcedure.input(get).query(async ({ input, ctx }) => {
    const info = await transporter.sendMail({
      from: "agrodibi@gmail.com",
      to: "mz1@ukr.net",
      subject: "test",
      html: `<h1>пошта:${input.email}</h1>
      <h2>телефон:${input.tel}</h2>
      <br>
      <h3>${input.message}</h3>
      <h6>${ctx.user?.email}</h6>`,
    });

    console.log(info);
    console.log(info.messageId);

    return info;
  }),
});
export default feedBackRouter;
