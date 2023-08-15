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
  creditParameter,
  IcreditParameter,
  amortization,
  Iamortization,
} from "../models/models";
import redis, { REDIS_DEFAULT_EX } from "../redis";
import {
  CreateBuildingType,
  PatchBuildingType,
} from "../routes/buildingRouter";
import {
  CreateBusinessPlan,
  CreateBusProd,
  CreateFinancingForBusiness,
  CreateUpdateAmortizationType,
  CreateUpdateCreditParameterType,
  DeleteBusinessPlan,
  DeleteBusProd,
  DeleteForBusiness,
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
import { changeVegetationYear } from "./vegetationYearsService";
import { changeWorkerRes } from "./workerService";

// const compareBusinessPlan = async (businessPlan: resBusinessPlan) => {
//   const redisBusinessPlan = await redis.get(businessPlan.id! + "");
//   if (redisBusinessPlan == JSON.stringify(businessPlan)) {
//     return JSON.parse(redisBusinessPlan);
//   }
//   await redis.setex(
//     businessPlan.id! + "",
//     REDIS_DEFAULT_EX,
//     JSON.stringify(businessPlan)
//   );
//   return businessPlan;
// };
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
  creditParameter: IcreditParameter | undefined;
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
  { model: financing, include: [{ model: creditParameter }] },
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
  // { model: buying_machine },
  // { model: building },
  // { model: worker },
  // { model: land },
];
// async function getRedisCart(cartId: number) {
//   const cart = await redis.get(cartId);
//   return cart ? JSON.parse(cart) : false;
// }
const ForBusProd = async (busProds: resBusProd[]) => {
  return await Promise.all(
    busProds.map(async (prod) => {
      const vegetation: IvegetationYears | null = JSON.parse(
        JSON.stringify(
          await vegetationYears.findOne({
            where: { busProdId: prod.id! },
          })
        )
      );
      const cart = async () => {
        //@ts-ignore
        const redisCart = await redis.get(prod.techCartId);
        if (redisCart) {
          return JSON.parse(redisCart) as resTechCartsWithOpers;
        }
        const cart = (await changeCarts([prod.tech_cart]))[0];
        return cart;
      };
      return {
        ...prod,
        tech_cart: await cart(),
        vegetationYear: vegetation
          ? changeVegetationYear(vegetation, prod.product!)
          : null,
      };
    })
  );
};
function changeAmortization(
  amortization: Iamortization,
  price: number,
  amount: number,
  businessPlanYear: number
): Iamortization {
  return {
    ...amortization,
    introductionDate: [
      businessPlanYear + amortization.year,
      ...amortization.introductionDate.split("-").slice(1),
    ].join("-"),
    depreciationPerMonth: +(
      (price * amount) /
      (amortization.depreciationPeriod * 12)
    ).toFixed(2),
  };
}
function changeBuyingMachines(
  buying_machines: Ibuying_machine[],
  businessYear: number
): Ibuying_machine[] {
  return buying_machines.map((el) => ({
    ...el,
    amortization: el.amortization
      ? changeAmortization(el.amortization, el.price, el.amount, businessYear)
      : null,
  }));
}
function changeBuildings(buildings: Ibuilding[], businessYear: number) {
  return buildings.map((el) => ({
    ...el,
    amortization: el.amortization
      ? changeAmortization(el.amortization, el.startPrice, 1, businessYear)
      : null,
  }));
}
async function getsForBusinessPlan(plans: resBusinessPlan[]) {
  return await Promise.all(
    plans.map(async (plan) => {
      // console.time("test" + plan.id);
      // console.log("test" + plan.id, new Date());
      [
        plan.buildings,
        plan.buying_machines,
        plan.workers,
        plan.outcomes,
        plan.lands,
        plan.busProds,
      ] = await Promise.all([
        building.findAll({
          where: { businessPlanId: plan.id },
          include: amortization,
        }),
        buying_machine.findAll({
          where: { businessPlanId: plan.id },
          include: amortization,
        }),
        worker.findAll({
          where: { businessPlanId: plan.id },
        }),
        outcome.findAll({
          where: { businessPlanId: plan.id! },
        }),
        land.findAll({ where: { businessPlanId: plan.id } }),
        ForBusProd(plan.busProds),
      ]);
      plan.outcomes = JSON.parse(JSON.stringify(plan.outcomes));
      plan.buildings = JSON.parse(JSON.stringify(plan.buildings));
      plan.buying_machines = JSON.parse(JSON.stringify(plan.buying_machines));
      // console.log("test" + plan.id, new Date());
      return plan;
    })
  );
}

function changeOutcomes(outcomes: Ioutcome[], businessMonths: number) {
  return outcomes.map((el) => ({
    ...el,
    costYear: (el.costMonth || 0) * (el.year == 1 ? 13 - businessMonths : 12),
  }));
}

async function changeBusiness(plans: resBusinessPlan[]) {
  plans = JSON.parse(JSON.stringify(plans));
  plans = await Promise.all(
    plans.map(async (plan) => {
      // console.time("test" + plan.id);
      // console.log("test" + plan.id, new Date());
      [
        plan.buildings,
        plan.buying_machines,
        plan.workers,
        plan.outcomes,
        plan.lands,
        plan.busProds,
      ] = await Promise.all([
        building.findAll({
          where: { businessPlanId: plan.id },
          include: amortization,
        }),
        buying_machine.findAll({
          where: { businessPlanId: plan.id },
          include: amortization,
        }),
        worker.findAll({
          where: { businessPlanId: plan.id },
        }),
        outcome.findAll({
          where: { businessPlanId: plan.id! },
        }),
        land.findAll({ where: { businessPlanId: plan.id } }),
        ForBusProd(plan.busProds),
      ]);
      plan.outcomes = JSON.parse(JSON.stringify(plan.outcomes));
      plan.buildings = JSON.parse(JSON.stringify(plan.buildings));
      plan.buying_machines = JSON.parse(JSON.stringify(plan.buying_machines));
      // console.log("test" + plan.id, new Date());
      return plan;
    })
  );
  // plans = await Promise.all(
  //   plans.map(async (el) => await compareBusinessPlan(el))
  // );
  plans = plans.map((plan) => {
    plan.buying_machines = changeBuyingMachines(
      plan.buying_machines,
      +plan.dateStart.split("-")[0]
    );
    plan.MSHP = plan.buying_machines.filter((el) => el.purpose == "МШП") || [];
    plan.buying_machines = plan.buying_machines.filter(
      (el) => el.purpose != "МШП"
    );
    plan.buildings = changeBuildings(
      plan.buildings,
      +plan.dateStart.split("-")[0]
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
        year: 0,
        month: null,
        typeName: "Інвестиції",
        creditParameter: undefined,
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
    const { creditBody, creditProc } = (() => {
      const creds = plan.financings.filter(
        (el) => el.type == "credit" && el.creditParameter
      );
      const creditBody: Record<number, number> = {};
      const creditProc: Record<number, number> = {};
      for (let i = 0; i < creds.length; i++) {
        const el = creds[i];
        const par = el.creditParameter;
        if (!par) throw new Error("нема par");

        const amount = +((el.costBP || 0) / par.creditTerm).toFixed(2);
        let remainder = el.costBP || 0;
        for (let y = start + el.year; y <= end; y++) {
          if (par.paymentsFrequency == "Кожен рік") {
            if (par.repaymentMethod == "Класична схема") {
              creditBody[y]
                ? (creditBody[y] += amount)
                : (creditBody[y] = amount);
              const procent = +(remainder * (par.procent / 100)).toFixed(2);
              creditProc[y]
                ? (creditProc[y] += procent)
                : (creditProc[y] = procent);
              remainder -= amount;
            }
          }
        }
      }
      return { creditBody, creditProc };
    })();

    plan.outcomes = (() => {
      const outcomes: Ioutcome[] = [];
      for (let i = start; i <= end; i++) {
        const fin = plan.financings.filter(
          (el) => el.year == i - start && el.type == "credit"
        );
        plan.outcomes
          .filter((el) => +el.year == i - start)
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
          name: "Тіло кредиту",
          group: "Постійні",
          date: i + "-01-01",
          year: i - start,
          costYear: creditBody[i] || 0,
          isDefault: true,
        });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "% кредиту",
          group: "Постійні",
          date: i + "-01-01",
          year: i - start,
          costYear: creditProc[i] || 0,
          isDefault: true,
        });
        const amorts: Iamortization[] = [];
        plan.buildings.forEach((el) => {
          if (el.amortization) amorts.push(el.amortization);
        });
        plan.buying_machines.forEach((el) => {
          if (el.amortization) amorts.push(el.amortization);
        });
        plan.MSHP.forEach((el) => {
          if (el.amortization) amorts.push(el.amortization);
        });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Амортизація",
          group: "Постійні",
          date: i + "-01-01",
          year: i - start,
          costYear: amorts
            .filter(
              (el) =>
                el.year <= i - start &&
                el.year + el.depreciationPeriod >= i - start
            )
            .reduce((p, c) => {
              let months = 12;
              if (i - start == c.year) {
                months = 13 - +c.introductionDate.split("-")[1];
              } else if (i - start == c.year + c.depreciationPeriod) {
                months = +c.introductionDate.split("-")[1];
              }
              return p + (c.depreciationPerMonth || 0) * months;
            }, 0),
          isDefault: true,
        });
        outcomes.push({
          costMonth: null,
          type: "Операційні",
          userId: "",
          name: "Оплата праці АП",
          group: "Постійні",
          date: i + "-01-01",
          year: i - start,
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
          year: i - start,
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
          year: i - start,
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
          year: i - start,
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
          year: i - start,
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
          year: i - start,
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
  let res: resBusinessPlan | null = await businessPlan.findOne({
    where: { id: businessPlanId },
    //@ts-ignore
    include: includes,
  });
  res = (await changeBusiness([res!]))[0];
  return res;
}
class BusinessService {
  // async getCategory() {
  //   const category = await businessCategory.findAll();
  //   return category;
  // }
  async get(user: Principal | undefined) {
    if (user) {
      console.time("include");
      //@ts-ignore
      let plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { userId: user.sub }, //@ts-ignore
        include: includes,
      });
      console.timeEnd("include");

      console.time("func");
      plans = await changeBusiness(plans);
      console.timeEnd("func");
      return plans;
    } else {
      console.time("include2");
      //@ts-ignore
      let plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { isPublic: true, isAgree: true }, //@ts-ignore
        include: includes,
      });
      console.timeEnd("include2");
      return await changeBusiness(plans);
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
      { ...data, userId: user.sub },
      //@ts-ignore
      { include: includes }
    );
    return await getBusinessPlan(plan.id!);
  }
  async patch(user: Principal | undefined, data: PatchBusinessPlan) {
    if (!user) return;

    const ind = await businessPlan.update(
      { ...data },
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
    console.time("запит");
    //@ts-ignore
    const res: resBusinessPlan[] = await businessPlan.findAll({
      where: { isPublic: true },
      //@ts-ignore
      include: includes,
    });
    console.timeEnd("запит");
    console.time("функ");
    const akk = await changeBusiness(res);
    console.timeEnd("функ");
    return akk;
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
    return data;
  }

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
      year: data.year,
      month: data.month,
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
        month: data.month,
      },
      { where: { id: data.financingId } }
    );
    let res: Ifinancing | null = await financing.findOne({
      where: { id: data.financingId },
    });
    return await getBusinessPlan(data.busId);
  }
  async deleteFinancingForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await financing.destroy({ where: { id: data.id } });
    return data;
  }
  async createBuyingMachineForBusiness(
    user: Principal | undefined,
    data: CreateBuyingMachine
  ) {
    if (!user) return;
    const res: Ibuying_machine = await buying_machine.create({
      amount: data.amount,
      brand: data.brand,
      price: data.price,
      date: data.date,
      year: data.year,
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
        price: data.price,
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
      date: data.date,
      year: data.year,
      description: data.description,
      startPrice: data.startPrice,
      businessPlanId: data.businessPlanId,
      enterpriseId: data.enterpriseId,
      userId: user.sub,
    });
    return res;
  }
  async patchBuildingForBusiness(
    user: Principal | undefined,
    data: PatchBuildingType
  ) {
    if (!user) return;
    await building.update(
      {
        name: data.name,
        startPrice: data.startPrice,
        date: data.date,
        description: data.description,
        businessPlanId: data.businessPlanId,
        enterpriseId: data.enterpriseId,
      },
      { where: { id: data.buildId } }
    );
    const res: Ibuilding | null = await building.findOne({
      where: { id: data.buildId },
    });
    if (!res) return;
    const business: IbusinessPlan = JSON.parse(
      JSON.stringify(
        await businessPlan.findOne({ where: { id: res.businessPlanId! } })
      )
    );
    return changeBuildings(
      [JSON.parse(JSON.stringify(res))],
      +business.dateStart.split("-")[0]
    )[0];
  }
  async deleteBuildingForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await building.destroy({ where: { id: data.id } });
    return data;
  }
  async createOutcomeForBusiness(
    user: Principal | undefined,
    data: createOutcomeType
  ) {
    if (!user) return;
    let res: Ioutcome = JSON.parse(
      JSON.stringify(
        await outcome.create({
          name: data.name,
          costMonth: data.costMonth,
          date: data.date,
          group: data.group,
          userId: user.sub,
          businessPlanId: data.businessPlanId!,
          year: data.year,
          type: data.type,
        })
      )
    );
    const business: IbusinessPlan = JSON.parse(
      JSON.stringify(
        await businessPlan.findOne({
          where: { id: data.businessPlanId },
        })
      )
    );
    res = changeOutcomes([res], +business.dateStart.split("-")[1])[0];
    return res;
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
    let res: Ioutcome | null = JSON.parse(
      JSON.stringify(
        await outcome.findOne({
          where: { id: data.outcomeId },
        })
      )
    );
    if (!res) return;
    const business: IbusinessPlan = JSON.parse(
      JSON.stringify(
        await businessPlan.findOne({
          where: { id: data.businessPlanId },
        })
      )
    );
    res = changeOutcomes([res], +business.dateStart.split("-")[1])[0];
    return res;
  }
  async deleteOutcomeForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await outcome.destroy({ where: { id: data.id } });
    return data;
  }
  async createLandForBusiness(
    user: Principal | undefined,
    data: CreateLandType
  ) {
    if (!user) return;
    const res: Iland = await land.create({
      name: data.name,
      area: data.area,
      year: data.year,
      cadastreNumber: data.cadastreNumber,
      businessPlanId: data.businessPlanId,
      enterpriseId: data.enterpriseId,
      date: data.date,
      rightOfUse: data.rightOfUse,
      ownership: data.ownership,
      rate: data.rate,
      userId: user.sub,
    });
    return res;
  }
  async patchLandForBusiness(user: Principal | undefined, data: PatchLandType) {
    if (!user) return;
    await land.update({ ...data }, { where: { id: data.landId } });
    const res: Iland | null = await land.findOne({
      where: { id: data.landId },
    });
    return res;
  }
  async deleteLandForBusiness(
    user: Principal | undefined,
    data: DeleteForBusiness
  ) {
    if (!user) return;
    await land.destroy({ where: { id: data.id } });
    return data;
  }
  async createUpdateCreditParameter(data: CreateUpdateCreditParameterType) {
    const isParameter = await creditParameter.findOne({
      where: { financingId: data.financingId },
    });
    if (isParameter) {
      await creditParameter.update(
        { ...data },
        { where: { financingId: data.financingId } }
      );
    } else {
      await creditParameter.create({
        ...data,
        termType: data.termType || "на бізнес-план",
      });
    }
    return await getBusinessPlan(data.busId);
  }
  async createUpdateAmortization(data: CreateUpdateAmortizationType) {
    if (data.id) {
      await amortization.update({ ...data }, { where: { id: data.id } });
    } else {
      await amortization.create({ ...data });
    }
    return await getBusinessPlan(data.busId);
  }
}
export default new BusinessService();
