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
    }));
    return res;
  }
  async create(user: Principal | undefined, data: CreateVegetationType) {
    if (!user) return;
    await vegetationYears.destroy({
      where: { busProdId: data.busProdId },
    });
    const acc: IvegetationYears[] = [];
    for (let i = 0; i < data.data.length; i++) {
      const el = data.data[i];
      const cart = await tech_cart.findOne({
        where: {
          cultureId: data.cultureId,
          cultivationTechnologyId: data.cultivationTechnologyId,
          year: el.year,
        },
      });
      let res: IvegetationYears = await vegetationYears.create({
        cultureId: data.cultureId,
        cultivationTechnologyId: data.cultivationTechnologyId,
        seedlingsCoeff: el.seedlingsCoeff,
        technologyCoeff: el.technologyCoeff,
        vegetationCoeff: el.vegetationCoeff,
        year: el.year,
        techCartId: el.techCartId,
        yieldPlantId: data.yieldPlantId ? data.yieldPlantId : null,
        busProdId: data.busProdId,
      });
      res = JSON.parse(JSON.stringify(res));
      res.allCoeff = +(
        res.seedlingsCoeff *
        res.technologyCoeff *
        res.vegetationCoeff
      ).toFixed(2);
      acc.push(res);
    }
    return acc;
  }
}
export default new vegetationYearService();
