import { Principal } from "..";
import {
  cultivationTechnologies,
  culture,
  IcultivationTechnologies,
  Iculture,
  Iproduct,
  product,
} from "../models/models";
import {
  CreateProductType,
  createYieldCalcType,
  CreateYieldPlantType,
  UpdateYieldPlantType,
} from "../routes/incomeRouter";
// export interface resYieldPlant extends IyieldPlant {
//   culture: Iculture;
//   yieldCalculation: IyieldCalculation;
//   cultivationTechnology: IcultivationTechnologies;
// }
const plantInclude = [
  { model: culture },
  // { model: yieldCalculation },
  { model: cultivationTechnologies },
];
class incomeService {
  async getCultural() {
    const cultures: Iculture[] = await culture.findAll();
    return cultures;
  }
  // async getYieldPlant(user: Principal | undefined) {
  //   if (!user) return;
  //   //@ts-ignore
  //   const res: resYieldPlant[] | undefined = await yieldPlant.findAll({
  //     where: { userId: user.sub },
  //     include: plantInclude,
  //   });

  //   return res;
  // }
  // async getOneYieldPlant(plantId: number) {
  //   //@ts-ignore
  //   const res: resYieldPlant = await yieldPlant.findOne({
  //     where: { cultureId: plantId },
  //     include: plantInclude,
  //   });
  //   return res;
  // }
  // async createYieldPlant(
  //   data: CreateYieldPlantType,
  //   user: Principal | undefined
  // ) {
  //   if (!user) return;
  //   const YieldPlant = await yieldPlant.create({
  //     userId: user.sub,
  //     cultivationTechnologyId: data.cultivationTechnologyId,
  //     plantingDensity: 0,
  //     yieldPerHectare: 0,
  //     yieldPerRoll: 0,
  //     timesDow: 0,
  //     cultureId: data.cultureId,
  //     landingPeriod: data.landingPeriod,
  //   });
  //   //@ts-ignore
  //   const res: resYieldPlant = await yieldPlant.findOne({
  //     where: { id: YieldPlant.id! },
  //     include: plantInclude,
  //   });
  //   return res;
  // }
  // async createCalc(data: createYieldCalcType, user: Principal | undefined) {
  //   if (!user) return;
  //   const YieldCalc = await yieldCalculation.create({
  //     fruitWeight: data.fruitWeight,
  //     numberFlower: data.numberFlower,
  //     numberFruit: data.numberFruit,
  //     numberSocket: data.numberSocket,
  //     yieldRoll:
  //       (data?.numberSocket! *
  //         data?.numberFlower! *
  //         data?.numberFruit! *
  //         data?.fruitWeight!) /
  //       1000,
  //   });
  //   culture;
  //   //@ts-ignore
  //   const res: resYieldPlant = await yieldPlant.findOne({
  //     where: { id: data.yieldPlantId! },
  //     include: plantInclude,
  //   });
  //   return res;
  // }
  // async updateCalc(data: createYieldCalcType, user: Principal | undefined) {
  //   if (!user) return;
  //   const YieldCalc = await yieldCalculation.update(
  //     {
  //       fruitWeight: data.fruitWeight,
  //       numberFlower: data.numberFlower,
  //       numberFruit: data.numberFruit,

  //       numberSocket: data.numberSocket,
  //     },
  //     { where: { yieldPlantId: data.yieldPlantId } }
  //   );
  //   const yieldPerRoll =
  //     (data?.numberSocket! *
  //       data?.numberFlower! *
  //       data?.numberFruit! *
  //       data?.fruitWeight!) /
  //     1000;
  //   await yieldPlant.update(
  //     {
  //       plantingDensity: data.numberPlantsPerHectare,
  //       yieldPerRoll,
  //       yieldPerHectare: (yieldPerRoll * data.numberPlantsPerHectare) / 1000,
  //     },
  //     { where: { id: data.yieldPlantId } }
  //   );
  //   //@ts-ignore
  //   const res: resYieldPlant = await yieldPlant.findOne({
  //     where: { id: data.yieldPlantId! },
  //     include: plantInclude,
  //   });
  //   return res;
  // }
  // async deleteYieldPlant(
  //   data: { yieldPlantId: number },
  //   user: Principal | undefined
  // ) {
  //   if (!user) return;
  //   await yieldCalculation.destroy({
  //     where: { yieldPlantId: data.yieldPlantId },
  //   });
  //   await yieldPlant.destroy({ where: { id: data.yieldPlantId } });
  //   return data.yieldPlantId;
  // }
  // async updateYieldPlant(
  //   data: UpdateYieldPlantType,
  //   user: Principal | undefined
  // ) {
  //   if (!user) return;

  //   const plants = await yieldPlant.update(
  //     {
  //       cultivationTechnologyId: data.cultivationTechnologyId,
  //       cultureId: data.cultureId,
  //       landingPeriod: data.landingPeriod,
  //     },
  //     { where: { id: data.yieldPlantId } }
  //   );
  //   //@ts-ignore
  //   const res: resYieldPlant | null = await yieldPlant.findOne({
  //     where: { id: data.yieldPlantId },
  //     include: plantInclude,
  //   });
  //   return res;
  // }

  async getProduct(user: Principal | undefined) {
    if (!user) return;
    const res: Iproduct[] | null = await product.findAll();
    return res;
  }

  async createProduct(user: Principal | undefined, data: CreateProductType) {
    if (!user) return;
    const res: Iproduct = await product.create({
      name: data.name,
      cultureId: data.cultureId,
      userId: user.sub,
      //@ts-ignore
      cost: null,
      //@ts-ignore
      price: null,
      //@ts-ignore
      unitMeasure: null,
    });
    return res;
  }
}
export default new incomeService();
