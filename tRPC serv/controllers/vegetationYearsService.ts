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
      allCoeff:
        Math.round(
          el.seedlingsCoeff * el.technologyCoeff * el.vegetationCoeff * 100
        ) / 100,
    }));
    return res;
  }
  async create(user: Principal | undefined, data: CreateVegetationType) {
    if (!user) return;
    await vegetationYears.destroy({
      where: { yieldPlantId: data.yieldPlantId! },
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
        techCartId: cart?.id ? cart.id : null,
        yieldPlantId: data.yieldPlantId ? data.yieldPlantId : null,
      });
      res = JSON.parse(JSON.stringify(res));
      res.allCoeff =
        Math.round(
          res.seedlingsCoeff * res.technologyCoeff * res.vegetationCoeff * 100
        ) / 100;
      acc.push(res);
    }
    return acc;
  }
}
export default new vegetationYearService();
