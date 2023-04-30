import { Principal } from "..";
import {
  culture,
  Iculture,
  Iincome,
  income,
  Iproduct,
  IyieldCalculation,
  IyieldPlant,
  product,
  yieldCalculation,
  yieldPlant,
} from "../models/models";
import {
  CreateIncome,
  createYieldCalcType,
  PatchIncome,
  setIsUsingIncomeType,
  updateYieldPlantType,
} from "../routes/incomeRouter";
export interface resYieldPlant extends IyieldPlant {
  culture: Iculture;
  yieldCalculation: IyieldCalculation;
}
const plantInclude = [{ model: culture }, { model: yieldCalculation }];
class incomeService {
  async getCultural() {
    const cultures: Iculture[] = await culture.findAll();
    return cultures;
  }

  async getYieldPlant(user: Principal | undefined) {
    if (!user) return;
    //@ts-ignore
    const res: resYieldPlant[] | undefined = await yieldPlant.findAll({
      where: { userId: user.sub },
      include: plantInclude,
    });

    return res;
  }
  async getOneYieldPlant(plantId: number) {
    //@ts-ignore
    const res: resYieldPlant = await yieldPlant.findOne({
      where: { cultureId: plantId },
      include: plantInclude,
    });
    return res;
  }
  async createYieldPlant(
    data: { cultureId: number; comment: string },
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
      cultureId: data.cultureId,
    });
    //@ts-ignore
    const res: resYieldPlant = await yieldPlant.findOne({
      where: { id: YieldPlant.id! },
      include: plantInclude,
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
    const yieldPerRoll =
      (data?.numberSocket! *
        data?.numberFlower! *
        data?.numberFruit! *
        data?.fruitWeight!) /
      1000;
    await yieldPlant.update(
      {
        plantingDensity: data.numberPlantsPerHectare,
        yieldPerRoll,
        yieldPerHectare: (yieldPerRoll * data.numberPlantsPerHectare) / 1000,
      },
      { where: { id: data.yieldPlantId } }
    );
    //@ts-ignore
    const res: resYieldPlant = await yieldPlant.findOne({
      where: { id: data.yieldPlantId! },
      include: plantInclude,
    });
    return res;
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
    const yieldPerRoll =
      (data?.numberSocket! *
        data?.numberFlower! *
        data?.numberFruit! *
        data?.fruitWeight!) /
      1000;
    await yieldPlant.update(
      {
        plantingDensity: data.numberPlantsPerHectare,
        yieldPerRoll,
        yieldPerHectare: (yieldPerRoll * data.numberPlantsPerHectare) / 1000,
      },
      { where: { id: data.yieldPlantId } }
    );
    //@ts-ignore
    const res: resYieldPlant = await yieldPlant.findOne({
      where: { id: data.yieldPlantId! },
      include: plantInclude,
    });
    return res;
  }
  async deleteYieldPlant(
    data: { yieldPlantId: number },
    user: Principal | undefined
  ) {
    if (!user) return;
    await yieldCalculation.destroy({
      where: { yieldPlantId: data.yieldPlantId },
    });
    await yieldPlant.destroy({ where: { id: data.yieldPlantId } });
    return data.yieldPlantId;
  }
  async updateYieldPlant(
    data: updateYieldPlantType,
    user: Principal | undefined
  ) {
    if (!user) return;

    const plants = await yieldPlant.update(
      {
        comment: data.comment,
        cultureId: data.cultureId,
      },
      { where: { id: data.yieldPlantId } }
    );
    //@ts-ignore
    const res: resYieldPlant | null = await yieldPlant.findOne({
      where: { id: data.yieldPlantId },
      include: plantInclude,
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateIncome) {
    if (!user) return;
    const res: Iincome | undefined = await income.create({
      group: data.group,
      isUsing: data.isUsing,
      type: data.type,
      saleId: data.saleId,
      UserId: user.sub,
    });
    return res;
  }
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Iincome[] | undefined = await income.findAll({
      where: { UserId: user.sub },
    });
    return res;
  }
  async setIsUsing(user: Principal | undefined, data: setIsUsingIncomeType) {
    if (!user) return;
    await income.update(
      { isUsing: data.value },
      { where: { id: data.incomeId } }
    );
    const res: Iincome | null = await income.findOne({
      where: { id: data.incomeId },
    });
    return res;
  }
  async getProduct(user: Principal | undefined) {
    if (!user) return;
    const res: Iproduct[] | null = await product.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchIncome) {
    if (!user) return;
    await income.update(
      {
        group: data.group,
        saleId: data.saleId,
        type: data.type,
      },
      { where: { id: data.incomeId } }
    );
    const res: Iincome | null = await income.findOne({
      where: { id: data.incomeId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { incomeId: number }) {
    if (!user) return;
    const res = await income.destroy({ where: { id: data.incomeId } });
    return res;
  }
}
export default new incomeService();
