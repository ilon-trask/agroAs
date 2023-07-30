import { Principal } from "..";
import {
  busProd,
  IbusProd,
  Iproduct,
  IvegetationYears,
  product,
  vegetationYears,
} from "../models/models";
import { CreateVegetationType } from "../routes/vegetationYearRouter";
interface BusProdInclude extends IbusProd {
  product: Iproduct;
}
interface vegetationInclude extends IvegetationYears {
  busProd: BusProdInclude;
}
export function changeVegetationYear(
  vegetationYear: IvegetationYears,
  product: Iproduct
) {
  vegetationYear = JSON.parse(JSON.stringify(vegetationYear));
  product = JSON.parse(JSON.stringify(product));
  return {
    ...vegetationYear,
    allCoeff: +(
      vegetationYear?.seedlingsCoeff *
      vegetationYear?.technologyCoeff *
      vegetationYear?.vegetationCoeff
    ).toFixed(2),
    potentialYieldPerHectare:
      product?.unitMeasure == "шт"
        ? vegetationYear.numberPerRoll * vegetationYear.numberPlantsPerHectare
        : (vegetationYear?.numberPerRoll *
            vegetationYear?.numberPlantsPerHectare) /
          1000,
  };
}
const include = { model: busProd, include: [{ model: product }] };

class vegetationYearService {
  async get(user: Principal | undefined) {
    if (!user) return;
    //@ts-ignore
    let res: vegetationInclude[] | null | undefined =
      await vegetationYears.findAll({
        include: include,
      });

    res = JSON.parse(JSON.stringify(res));
    const akk = res?.map((el) => changeVegetationYear(el, el.busProd.product!));
    return akk;
  }
  async create(user: Principal | undefined, data: CreateVegetationType) {
    if (!user) return;
    await vegetationYears.destroy({
      where: { busProdId: data.busProdId },
    });

    let acc: IvegetationYears = await vegetationYears.create({
      ...data,
      cultureId: data.cultureId,
      cultivationTechnologyId: data.cultivationTechnologyId,
      busProdId: data.busProdId,
    });
    //@ts-ignore
    let res: vegetationInclude = await vegetationYears.findOne({
      where: { id: acc.id },
      include: include,
    });

    if (!res) return;
    return changeVegetationYear(res, res.busProd.product!) || res;
  }
}
export default new vegetationYearService();
