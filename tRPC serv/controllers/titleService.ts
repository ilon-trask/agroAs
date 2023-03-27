import { ItitlePage, titlePage } from "../models/models";
import { PatchProps } from "../routes/titleRouter";

class titleService {
  async patch(req: PatchProps) {
    const Title = await titlePage.findOne({
      where: { businessPlanId: req.businessId },
    });
    if (Title) {
      console.log(req.businessId);
      const titles = await titlePage.update(
        { title: req.title },
        { where: { businessPlanId: req.businessId } }
      );
      let res: ItitlePage | undefined | null = undefined;
      if (titles[0]) {
        res = await titlePage.findOne({
          where: { businessPlanId: req.businessId },
        });
      }
      return res;
    } else {
      const title: ItitlePage = await titlePage.create({
        title: req.title,
        businessPlanId: req.businessId,
      });
      return title;
    }
  }
}
export default new titleService();
