import { Principal } from "..";
import {
  culture,
  Iculture,
  IyieldCalculation,
  IyieldPlant,
  yieldCalculation,
  yieldPlant,
} from "../models/models";
import { createYieldCalcType } from "../routes/incomeRouter";
export interface resYieldPlant extends IyieldPlant {
  culture: Iculture;
  yieldCalculation: IyieldCalculation;
}
class incomeService {
  async getCultural() {
    const cultures: Iculture[] = await culture.findAll();
    return cultures;
  }

  async get(user: Principal | undefined) {
    if (!user) return;
    //@ts-ignore
    const res: resYieldPlant[] | undefined = await yieldPlant.findAll({
      where: { userId: user.sub },
      include: [{ model: culture }, { model: yieldCalculation }],
    });

    return res;
  }
  async create(
    data: { culturalId: number; comment: string },
    user: Principal | undefined
  ) {
    if (!user) return;
    const YieldPlant = await yieldPlant.create({
      userId: user.sub,
      comment: data.comment,
      plantingDensity: 0,
      yieldPerHectare: 0,
      yieldPerRoll: 0,
      timesDow: 0,
      cultureId: data.culturalId,
    });
    //@ts-ignore
    const res: resYieldPlant = await yieldPlant.findOne({
      where: { id: YieldPlant.id! },
      include: [{ model: culture }, { model: yieldCalculation }],
    });
    return res;
  }
  async createCalc(data: createYieldCalcType, user: Principal | undefined) {
    if (!user) return;
    const YieldCalc = await yieldCalculation.create({
      fruitWeight: data.fruitWeight,
      numberFlower: data.numberFlower,
      numberFruit: data.numberFruit,
      numberPlantsPerHectare: data.numberPlantsPerHectare,
      numberSocket: data.numberSocket,
      yieldPlantId: data.yieldPlantId,
    });
    return YieldCalc;
  }
  async updateCalc(data: createYieldCalcType, user: Principal | undefined) {
    if (!user) return;
    const YieldCalc = await yieldCalculation.update(
      {
        fruitWeight: data.fruitWeight,
        numberFlower: data.numberFlower,
        numberFruit: data.numberFruit,
        numberPlantsPerHectare: data.numberPlantsPerHectare,
        numberSocket: data.numberSocket,
      },
      { where: { yieldPlantId: data.yieldPlantId } }
    );
    const res = await yieldCalculation.findOne({
      where: { yieldPlantId: data.yieldPlantId },
    });
    return res;
  }
  async delete(data: { yieldPlantId: number }, user: Principal | undefined) {
    if (!user) return;
    await yieldCalculation.destroy({
      where: { yieldPlantId: data.yieldPlantId },
    });
    await yieldPlant.destroy({ where: { id: data.yieldPlantId } });
    return data.yieldPlantId;
  }
}
export default new incomeService();
