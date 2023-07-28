import { Principal } from "..";
import {
  busProd,
  businessPlan,
  cultivationTechnologies,
  culture,
  enterprise,
  financing,
  IbusinessPlan,
  IcultivationTechnologies,
  Iculture,
  Ienterprise,
  Ifinancing,
  Iresume,
  ItitlePage,
  resume,
  titlePage,
  Iproduct,
  product,
  tech_cart,
  financBus,
  buying_machine,
  Ibuying_machine,
  building,
  Ibuilding,
  Ioutcome,
  outcome,
  worker,
  Iworker,
  land,
  Iland,
  vegetationYears,
  IvegetationYears,
} from "../models/models";
import {
  CreateBuildingType,
  PatchBuildingType,
} from "../routes/buildingRouter";
import {
  CreateBusinessPlan,
  CreateBusProd,
  CreateFinancingForBusiness,
  DeleteBusinessPlan,
  DeleteBusProd,
  DeleteForBusiness,
  GetOnePlan,
  PatchBusinessPlan,
  PatchBusProd,
  PatchFinancingForBusiness,
  SetIsAgreeBusinessPlan,
  SetIsPublicBusinessPlan,
} from "../routes/businessRouter";
import {
  CreateBuyingMachine,
  PatchBuyingMachine,
} from "../routes/buyingMachineRouter";
import { CreateLandType, PatchLandType } from "../routes/landRouter";
import { createOutcomeType, patchOutcomeType } from "../routes/outcomeRouter";
import {
  cartsIncludes,
  changeCarts,
  resTechCartsWithOpers,
} from "./TechCartService";
import { changeWorkerRes } from "./workerService";
export interface includeProduct extends Iproduct {
  culture: Iculture | undefined;
}
export interface resBusProd {
  businessPlanId: number;
  cultivationTechnologyId: number;
  techCartId: number | null;
  productId: number;
  product: includeProduct | undefined;
  id: number;
  cultivationTechnology: IcultivationTechnologies | undefined;
  area: number;
  year: number | null;
  price: number | null;
  tech_cart: resTechCartsWithOpers | null;
  vegetationYear: IvegetationYears | null;
}
export interface resFinancing extends Ifinancing {
  costBP?: number;
  costHectare?: number;
}
export interface resBusinessPlan extends IbusinessPlan {
  resume: Iresume;
  titlePage: ItitlePage;
  enterprise: Ienterprise | undefined;
  financings: resFinancing[];
  busProds: resBusProd[];
  buying_machines: Ibuying_machine[];
  buildings: Ibuilding[];
  MSHP: Ibuying_machine[];
  outcomes: Ioutcome[];
  workers: Iworker[];
  lands: Iland[];
  // vegetationYears: IvegetationYears[];
}
const includes = [
  { model: resume },
  { model: titlePage },
  { model: financing },
  { model: enterprise },
  {
    model: busProd,
    include: [
      { model: tech_cart, include: cartsIncludes },
      {
        model: product,
        include: {
          model: culture,
          //  include: { model: yieldPlant, where: {} }
        },
      },
      { model: cultivationTechnologies },
      // { model: vegetationYears },
    ],
  },
  { model: buying_machine },
  { model: building },
  { model: worker },
  { model: land },
];
async function changeFinancing(plans: resBusinessPlan[]) {
  plans = JSON.parse(JSON.stringify(plans));
  plans = await Promise.all(
    plans.map(async (plan) => {
      plan.busProds = await Promise.all(
        plan.busProds.map(async (prod) => {
          const vegetation: IvegetationYears | null = JSON.parse(
            JSON.stringify(
              await vegetationYears.findOne({
                where: { busProdId: prod.id! },
              })
            )
          );
          return {
            ...prod,
            tech_cart: (await changeCarts([prod.tech_cart]))[0],
            vegetationYear: vegetation
              ? {
                  ...vegetation,
                  allCoeff: +(
                    vegetation?.seedlingsCoeff *
                    vegetation?.technologyCoeff *
                    vegetation?.vegetationCoeff
                  ).toFixed(2),
                  potentialYieldPerHectare:
                    prod.product?.unitMeasure == "шт"
                      ? vegetation.numberPerRoll *
                        vegetation.numberPlantsPerHectare
                      : (vegetation?.numberPerRoll *
                          vegetation?.numberPlantsPerHectare) /
                        1000,
                }
              : null,
          };
        })
      );
      plan.outcomes = JSON.parse(
        JSON.stringify(
          await outcome.findAll({
            where: { businessPlanId: plan.id! },
          })
        )
      );
      // let vegeAcc = JSON.parse(
      //   JSON.stringify(
      //     await vegetationYears.findAll({
      //       where: { businessPlanId: plan.id! },
      //     })
      //   )
      // );
      // plan.vegetationYears = (() => {
      //   return vegeAcc.map((el: IvegetationYears) => ({
      //     ...el,
      //     allCoeff: +(
      //       el.seedlingsCoeff *
      //       el.technologyCoeff *
      //       el.vegetationCoeff
      //     ).toFixed(2),
      //     potentialYieldPerHectare:
      //       (el.numberPerRoll * el.numberPlantsPerHectare) / 1000,
      //   }));
      // })();
      return plan;
    })
  );
  plans = plans.map((plan) => {
    plan.MSHP = plan.buying_machines.filter((el) => el.purpose == "МШП");
    if (!plan.MSHP) plan.MSHP = [];
    plan.buying_machines = plan.buying_machines.filter(
      (el) => el.purpose != "МШП"
    );
    plan.workers = changeWorkerRes(plan.workers);

    plan.financings = [
      ...plan.financings.map((el) => {
        let area = 1;
        if (el.cultureId) {
          area = plan.busProds
            .filter((e) => e.product?.cultureId == el.cultureId)
            .reduce((p, c) => p + c.area, 0);
        } else {
          area =
            plan.busProds.length > 0
              ? plan.busProds.reduce((p, c) => p + c.area, 0)
              : 0;
        }
        if (el.calculationMethod == "На гектар") {
          el.costBP = el.cost * area;
          el.costHectare = el.cost;
        } else if (el.calculationMethod == "На бізнес-план") {
          el.costBP = el.cost;
          el.costHectare = el.cost / area;
        }
        el.typeName =
          el.type == "credit"
            ? "Кредит"
            : el.type == "derj_support"
            ? "Державна підтримка"
            : el.type == "grant"
            ? "Грант"
            : el.type == "investment"
            ? "Інвестиції"
            : null;

        return el;
      }),
      {
        date: plan?.dateStart!,
        typeName: "Інвестиції",
        calculationMethod: "На бізнес-план",
        calculationType: "Індивідуальний",
        costBP: plan?.initialAmount!,
        cost: plan.initialAmount,
        costHectare:
          plan.initialAmount / plan.busProds.reduce((p, c) => p + c.area, 0),
        isUseCost: false,
        name: "Початкові інвестиції",
        purpose: "Власні",
        type: "investment",
        id: 0,
      },
    ];

    const start = +plan?.dateStart?.split("-")[0]!;
    const end = +start + +plan?.realizationTime!;
    plan.outcomes = (() => {
      const outcomes: Ioutcome[] = [];
      for (let i = start; i <= end; i++) {
        plan.outcomes
          .filter((el) => +el.date.split("-")[0] == i)
          .forEach((el) => {
            outcomes.push({
              ...el,
              costYear:
                (el.costMonth || 0) *
                (i == start ? 13 - +plan.dateStart.split("-")[1] : 12),
            });
          });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Оплата праці АП",
          group: "Постійні",
          date: i + "-01-01",
          costYear: plan.workers
            .filter(
              (el) => el.year == i - start && el.class == "Адміністративний"
            )
            .reduce((p, c) => {
              const yearSalary: number =
                c.salary *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount;
              return p + yearSalary;
            }, 0),
          isDefault: true,
        });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Нарахування (ЄСВ+ВЗ)",
          group: "Постійні",
          date: i + "-01-01",
          costYear: plan.workers
            .filter(
              (el) => el.year == i - start && el.class == "Адміністративний"
            )
            .reduce((p, c) => {
              const yearSalary =
                c.salary *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount;
              return p + (yearSalary * 0.015 + yearSalary * 0.22);
            }, 0),
          isDefault: true,
        });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Оплата праці ІТР",
          group: "Загально виробничі",
          date: i + "-01-01",
          costYear: plan.workers
            .filter(
              (el) => el.year == i - start && el.class == "Інженерно технічний"
            )
            .reduce((p, c) => {
              const yearSalary =
                c.salary *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount;
              return p + yearSalary;
            }, 0),
          isDefault: true,
        });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Нарахування (ЄСВ+ВЗ)",
          group: "Загально виробничі",
          date: i + "-01-01",
          costYear: plan.workers
            .filter(
              (el) => el.year == i - start && el.class == "Інженерно технічний"
            )
            .reduce((p, c) => {
              const yearSalary =
                c.salary *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount;
              return p + (yearSalary * 0.015 + yearSalary * 0.22);
            }, 0),
          isDefault: true,
        });
        const lands = plan.lands.filter((el) => +el.date.split("-")[0] == i);
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Оренда землі",
          group: "Постійні",
          date: i + "-01-01",
          costYear: lands
            .filter((el) => el.rightOfUse == "Оренда")
            .reduce((p, c) => p + c.area * c.rate, 0),
          isDefault: true,
        });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Земельний податок",
          group: "Постійні",
          date: i + "-01-01",
          costYear: lands
            .filter((el) => el.rightOfUse == "Власна")
            .reduce((p, c) => p + c.area * c.rate, 0),
          isDefault: true,
        });
      }
      return outcomes;
    })();
    return plan;
  });

  return plans;
}
export async function getBusinessPlan(businessPlanId: number) {
  //@ts-ignore
  let res: resBusinessPlan | undefined | null = await businessPlan.findOne({
    where: { id: businessPlanId },
    //@ts-ignore
    include: includes,
  });
  res = (await changeFinancing([res!]))[0];
  return res;
}
class BusinessService {
  // async getCategory() {
  //   const category = await businessCategory.findAll();
  //   return category;
  // }
  async get(user: Principal | undefined) {
    if (user) {
      //@ts-ignore
      let plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { userId: user.sub }, //@ts-ignore
        include: includes,
      });
      return await changeFinancing(plans);
      return plans;
    } else {
      //@ts-ignore
      let plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { isPublic: true, isAgree: true },
      });
      return await changeFinancing(plans);
      return plans;
    }
  }
  // async getOnePlan(user: Principal | undefined, data: GetOnePlan) {
  //   return await getBusinessPlan(data.busId);
  // }
  async create(user: Principal | undefined, data: CreateBusinessPlan) {
    if (!user) return;

    //@ts-ignore
    const plan: resBusinessPlan = await businessPlan.create(
      {
        name: data.name,
        topic: data.topic,
        initialAmount: data.initialAmount,
        dateStart: data.dateStart,
        enterpriseId: data.enterpriseId,
        realizationTime: data.realizationTime,
        userId: user.sub,
      },
      //@ts-ignore
      { include: includes }
    );
    return await getBusinessPlan(plan.id!);
  }
  async patch(user: Principal | undefined, data: PatchBusinessPlan) {
    if (!user) return;

    const ind = await businessPlan.update(
      {
        dateStart: data.dateStart,
        initialAmount: data.initialAmount,
        enterpriseId: data.enterpriseId,
        realizationTime: data.realizationTime,
        topic: data.topic,
        name: data.name,
      },
      { where: { id: data.planId } }
    );
    return await getBusinessPlan(data.planId);
  }
  async delete(user: Principal | undefined, data: DeleteBusinessPlan) {
    if (!user) return;
    const plans = await businessPlan.destroy({
      where: { userId: user.sub, id: data.planId },
    });
    return plans;
  }
  async setIsPublic(
    user: Principal | undefined,
    data: SetIsPublicBusinessPlan
  ) {
    if (!user) return;
    const ind = await businessPlan.update(
      {
        isPublic: data.isPublic,
        isAgree: data.isPublic,
        description: data.description,
      },
      { where: { id: data.planId } }
    );
    let res: resBusinessPlan | null | undefined = undefined;
    if (ind[0] == 1) {
      //@ts-ignore
      res = await businessPlan.findOne({
        where: { id: data.planId },
        //@ts-ignore
        include: includes,
      });
    }
    return res;
  }
  async getNoAgree() {
    //@ts-ignore
    const res: resBusinessPlan[] = await businessPlan.findAll({
      where: { isPublic: true, isAgree: false },
      //@ts-ignore
      include: includes,
    });
    return res;
  }
  async getPublic() {
    //@ts-ignore
    const res: resBusinessPlan[] = await businessPlan.findAll({
      where: { isPublic: true },
      //@ts-ignore
      include: includes,
    });
    return await changeFinancing(res);
  }
  async setIsAgree(user: Principal | undefined, data: SetIsAgreeBusinessPlan) {
    if (!user) return;

    if (user.role == "ADMIN" || user.role == "service_role") {
      const ind = await businessPlan.update(
        { isAgree: data.isAgree, description: data.description },
        { where: { id: data.planId } }
      );

      return ind;
    }
  }
  async addFinancing(data: { businessId: number; value: number[] }) {
    const business = await businessPlan.findOne({
      where: { id: data.businessId },
    });
    //@ts-ignore
    await business.setFinancings(null);
    for (let i = 0; i < data.value.length; i++) {
      const el = data.value[i];
      //@ts-ignore
      await business.addFinancing(el);
    }
    return await getBusinessPlan(data.businessId);
  }
  async createBusProd(user: Principal | undefined, data: CreateBusProd) {
    if (!user) return;
    const last = await busProd.findOne({
      order: [["id", "DESC"]],
    });
    await busProd.create({
      id: last?.id! + 1,
      area: data.area,
      year: data.year,
      businessPlanId: data.businessPlanId,
      cultivationTechnologyId: data.cultivationTechnologyId,
      productId: data.productId,
      techCartId: data.techCartId,
    });
    return await getBusinessPlan(data.businessPlanId);
  }
  async patchBusProd(user: Principal | undefined, data: PatchBusProd) {
    if (!user) return;
    await busProd.update(
      {
        area: data.area,
        businessPlanId: data.businessPlanId,
        cultivationTechnologyId: data.cultivationTechnologyId,
        productId: data.productId,
        techCartId: data.techCartId,
        year: data.year,
        price: data.price,
      },
      { where: { id: data.ownId } }
    );
    return await getBusinessPlan(data.businessPlanId);
  }
  async deleteBusProd(user: Principal | undefined, data: DeleteBusProd) {
    if (!user) return;
    await busProd.destroy({ where: { id: data.id } });
    return await getBusinessPlan(data.busId);
  }
  //   async changeProducts(user: Principal | undefined, data: ChangeProductType) {
  //     if (!user) return;
  //     await busProd.destroy({ where: { businessPlanId: data.busId } });
  //     for (let i = 0; i < data.productIds.length; i++) {
  //       const el = data.productIds[i];
  //       //@ts-ignore
  //       for (let j = 0; j < el.tech.length; j++) {
  //         const e = el.tech[j];
  //         const last = await busProd.findOne({
  //           order: [["id", "DESC"]],
  //         });
  //         await busProd.create({
  //           id: last?.id! + 1,
  //           businessPlanId: data?.busId,
  //           productId: el.productId,
  //           cultivationTechnologyId: e.cultivationTechnologyId,
  //           area: +e.area,
  //           year: el.year,
  //         });
  //       }
  //     }
  //     //@ts-ignore
  //     let res: resBusinessPlan = await businessPlan.findOne({
  //       where: { id: data.busId },
  //       //@ts-ignore
  //       include: includes,
  //     });
  //     res = changeFinancing([res])[0];
  //     return res;
  //   }
  async createFinancingForBusiness(
    user: Principal | undefined,
    data: CreateFinancingForBusiness
  ) {
    if (!user) return;
    let res: Ifinancing = await financing.create({
      cost: data.cost,
      date: data.date,
      type: data.type,
      name: data.name,
      purpose: data.purpose,
      calculationMethod: data.calculationMethod,
      calculationType: null,
      isUseCost: data.isUseCost,
      cultureId: data.cultureId,
      userId: user.sub,
    });

    await financBus.create({
      businessPlanId: data.busId,
      financingId: res.id,
    });
    return await getBusinessPlan(data.busId);
  }
  async patchFinancingForBusiness(
    user: Principal | undefined,
    data: PatchFinancingForBusiness
  ) {
    if (!user) return;
    await financing.update(
      {
        cost: data.cost,
        date: data.date,
        name: data.name,
        type: data.type,
        isUseCost: data.isUseCost,
        purpose: data.purpose,
        calculationMethod: data.calculationMethod,
        cultureId: data.cultureId,
      },
      { where: { id: data.financingId } }
    );
    return await getBusinessPlan(data.busId);
  }
  async deleteFinancingForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await financing.destroy({ where: { id: data.id } });
    return await getBusinessPlan(data.busId);
  }
  async createBuyingMachineForBusiness(
    user: Principal | undefined,
    data: CreateBuyingMachine
  ) {
    if (!user) return;
    const res: Ibuying_machine = await buying_machine.create({
      amount: data.amount,
      brand: data.brand,
      cost: data.cost,
      date: data.date,
      name: data.name,
      purpose: data.purpose,
      userId: user.sub,
      businessPlanId: data.businessPlanId,
      enterpriseId: data.enterpriseId,
    });
    return await getBusinessPlan(data.businessPlanId);
  }
  async patchBuyingMachineForBusiness(
    user: Principal | undefined,
    data: PatchBuyingMachine
  ) {
    if (!user) return;
    await buying_machine.update(
      {
        amount: data.amount,
        brand: data.brand,
        cost: data.cost,
        date: data.date,
        name: data.name,
        purpose: data.purpose,
        businessPlanId: data.businessPlanId,
        enterpriseId: data.enterpriseId,
      },
      { where: { id: data.buyingId } }
    );
    return await getBusinessPlan(data.businessPlanId);
  }
  async deleteBuyingMachineForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await buying_machine.destroy({ where: { id: data.id } });
    return await getBusinessPlan(data.busId);
  }
  async createBuildingForBusiness(
    user: Principal | undefined,
    data: CreateBuildingType
  ) {
    if (!user) return;
    const res: Ibuilding = await building.create({
      name: data.name,
      depreciationPeriod: data.depreciationPeriod,
      date: data.date,
      description: data.description,
      startPrice: data.startPrice,
      businessPlanId: data.businessPlanId,
      enterpriseId: data.enterpriseId,
      userId: user.sub,
    });
    return await getBusinessPlan(data.businessPlanId);
  }
  async patchBuildingForBusiness(
    user: Principal | undefined,
    data: PatchBuildingType
  ) {
    if (!user) return;
    await building.update(
      {
        name: data.name,
        depreciationPeriod: data.depreciationPeriod,
        startPrice: data.startPrice,
        date: data.date,
        description: data.description,
        businessPlanId: data.businessPlanId,
        enterpriseId: data.enterpriseId,
      },
      { where: { id: data.buildId } }
    );
    return await getBusinessPlan(data.businessPlanId);
  }
  async deleteBuildingForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await building.destroy({ where: { id: data.id } });
    return await getBusinessPlan(data.busId);
  }
  async createOutcomeForBusiness(
    user: Principal | undefined,
    data: createOutcomeType
  ) {
    if (!user) return;
    await outcome.create({
      name: data.name,
      costMonth: data.costMonth,
      date: data.date,
      group: data.group,
      userId: user.sub,
      businessPlanId: data.businessPlanId!,
      type: data.type,
    });
    return await getBusinessPlan(data.businessPlanId);
  }
  async patchOutcomeForBusiness(
    user: Principal | undefined,
    data: patchOutcomeType
  ) {
    if (!user) return;
    await outcome.update(
      {
        costMonth: data.costMonth,
        date: data.date,
        group: data.group,
        name: data.name,
        type: data.type,
      },
      { where: { id: data.outcomeId } }
    );
    return await getBusinessPlan(data.businessPlanId);
  }
  async deleteOutcomeForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await outcome.destroy({ where: { id: data.id } });
    return await getBusinessPlan(data.busId);
  }
  async createLandForBusiness(
    user: Principal | undefined,
    data: CreateLandType
  ) {
    if (!user) return;
    await land.create({
      name: data.name,
      area: data.area,
      cadastreNumber: data.cadastreNumber,
      businessPlanId: data.businessPlanId,
      enterpriseId: data.enterpriseId,
      date: data.date,
      rightOfUse: data.rightOfUse,
      ownership: data.ownership,
      rate: data.rate,
      userId: user.sub,
    });
    return await getBusinessPlan(data.businessPlanId!);
  }
  async patchLandForBusiness(user: Principal | undefined, data: PatchLandType) {
    if (!user) return;
    await land.update(
      {
        ...data,
      },
      {
        where: { id: data.landId },
      }
    );
    return await getBusinessPlan(data.businessPlanId!);
  }
  async deleteLandForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await land.destroy({ where: { id: data.id } });
    return await getBusinessPlan(data.busId!);
  }
}
export default new BusinessService();
