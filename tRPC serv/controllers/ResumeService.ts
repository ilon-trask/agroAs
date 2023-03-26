import { Iresume, resume } from "../models/models";
import { PatchProps, SetId_tableInvestment } from "../routes/resumeRouter";

class resumeService {
  async patch(req: PatchProps) {
    const Resume = await resume.findOne({
      where: { businessPlanId: req.businessId },
    });
    if (Resume) {
      console.log(req.businessId);
      const resumes = await resume.update(
        {
          aboutProject: req.data.aboutProject,
          deduction: req.data.deduction,
          finIndicators: req.data.finIndicators,
          investment: req.data.investment,
          businessPlanId: req.businessId,
        },
        { where: { businessPlanId: req.businessId } }
      );
      let res: Iresume | undefined | null = undefined;
      if (resumes[0]) {
        res = await resume.findOne({
          where: { businessPlanId: req.businessId },
        });
      }
      return res;
    } else {
      const resumes: Iresume = await resume.create({
        aboutProject: req.data.aboutProject,
        deduction: req.data.deduction,
        finIndicators: req.data.finIndicators,
        investment: req.data.investment,
        businessPlanId: req.businessId!,
      });
      return resumes;
    }
  }
  async setId_tableInvestment(data: SetId_tableInvestment) {
    const res = await resume.update(
      { id_tableInvestment: data.cartId },
      { where: { businessPlanId: data.businessPlanId } }
    );
    if (res[0] == 1)
      return await resume.findOne({
        where: { businessPlanId: data.businessPlanId },
      });
  }
}
export default new resumeService();
