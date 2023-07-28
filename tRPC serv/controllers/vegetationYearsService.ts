import { Principal } from "..";
import { IvegetationYears, tech_cart, vegetationYears } from "../models/models";
import { CreateVegetationType } from "../routes/vegetationYearRouter";

class vegetationYearService {
  async get(user: Principal | undefined) {
    if (!user) return;
    let res: IvegetationYears[] | null | undefined =
      await vegetationYears.findAll();
    res = JSON.parse(JSON.stringify(res));
    res = res?.map((el) => ({
      ...el,
      allCoeff: +(
        el.seedlingsCoeff *
        el.technologyCoeff *
        el.vegetationCoeff
      ).toFixed(2),
      potentialYieldPerHectare:
        (el.numberPerRoll * el.numberPlantsPerHectare) / 1000,
    }));
    return res;
  }
  async create(user: Principal | undefined, data: CreateVegetationType) {
    if (!user) return;
    await vegetationYears.destroy({
      where: { busProdId: data.busProdId },
    });

    let res: IvegetationYears = await vegetationYears.create({
      ...data,
      cultureId: data.cultureId,
      cultivationTechnologyId: data.cultivationTechnologyId,
      busProdId: data.busProdId,
    });
    res = JSON.parse(JSON.stringify(res));
    res.allCoeff = +(
      res.seedlingsCoeff *
      res.technologyCoeff *
      res.vegetationCoeff
    ).toFixed(2);
    res.potentialYieldPerHectare =
      (res.numberPerRoll * res.numberPlantsPerHectare) / 1000;

    return res;
  }
}
export default new vegetationYearService();
