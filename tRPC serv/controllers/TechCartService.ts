import { Op } from "sequelize";
import { Principal } from "..";
import {
  aggregate,
  agricultural_machine,
  cost_hand_work,
  cost_material,
  cost_service,
  cost_transport,
  grade,
  Iaggregate,
  Icost_hand_work,
  Icost_material,
  Icost_service,
  Icost_transport,
  Imachine,
  Ipurpose_material,
  Itech_cart,
  Itech_operation,
  Itractor,
  purpose_material,
  tech_cart,
  tech_operation,
  tractor,
  vegetationYears,
} from "../models/models";
import {
  changeOper,
  guestAggregate,
  guest_cost_hand_work,
  Icell,
  opeInclude,
} from "./OperService";
import { CreateCartType, setIsBasicCartType } from "../routes/cartRouter";
export interface resMater extends Icost_material {
  purpose_material: Ipurpose_material;
}
interface resTechOperationAggreagte extends Iaggregate {
  tractor: Itractor;
  agricultural_machine: Imachine;
}
export interface resTechOperation extends Itech_operation {
  aggregate?: resTechOperationAggreagte | null;
  cost_hand_work?: Icost_hand_work | null;
  cost_material?: resMater | null;
  cost_service?: Icost_service | null;
  cost_transport?: Icost_transport | null;
}
export interface resTechCartsWithOpers extends Itech_cart {
  tech_operations?: resTechOperation[];
}
let cellNames: {
  costHandWork: "cost_hand_work";
  costMaterials: "cost_material";
  costMechanical: "aggregate";
  costServices: "cost_service";
  costTransport: "cost_transport";
} = {
  costHandWork: "cost_hand_work",
  costMaterials: "cost_material",
  costMechanical: "aggregate",
  costServices: "cost_service",
  costTransport: "cost_transport",
};
export const cartsIncludes = [
  {
    model: tech_operation,
    // include: [
    // { model: cost_material, include: [purpose_material] },
    // cost_service,
    // cost_transport,
    // cost_hand_work,
    // { model: aggregate, include: [tractor, agricultural_machine] },
    // ],
  },
];

export async function changeCarts(Scarts: (resTechCartsWithOpers | null)[]) {
  Scarts.sort((a, b) => (a && b ? a.id! - b.id! : 0));
  let carts: (resTechCartsWithOpers | null)[] = JSON.parse(
    JSON.stringify(Scarts)
  );
  //@ts-ignore
  carts = await Promise.all(
    carts.map(async (cart) => {
      const tech_operations = await Promise.all(
        //@ts-ignore
        cart?.tech_operations?.map(async (oper) => {
          const [
            cost_materials,
            cost_services,
            cost_transports,
            cost_hand_works,
            aggregates,
          ] = await Promise.all([
            cost_material.findOne({
              where: { techOperationId: oper.id },
              include: purpose_material,
            }),
            cost_service.findOne({
              where: { techOperationId: oper.id },
            }),
            cost_transport.findOne({
              where: { techOperationId: oper.id },
            }),
            cost_hand_work.findOne({
              where: { techOperationId: oper.id },
            }),
            aggregate.findOne({
              where: { techOperationId: oper.id },
              include: [tractor, agricultural_machine],
            }),
          ]);

          return {
            ...oper,
            cost_material: cost_materials,
            cost_service: cost_services,
            cost_transport: cost_transports,
            cost_hand_work: cost_hand_works,
            aggregate: aggregates,
          };
        })
      );

      return {
        ...cart,
        tech_operations,
      };
    })
  );

  let promises: (Promise<resTechCartsWithOpers | resTechOperation> | null)[] =
    [];
  for (let i = 0; i < carts.length; i++) {
    let cart = carts[i];
    let costHectare = 0,
      costMachineWork = 0,
      costCars = 0,
      costFuel = 0,
      costHandWork = 0;
    if (!cart) {
      promises.push(cart);
      continue;
    }

    if (!cart.tech_operations) throw new Error("");
    for (let j = 0; j < cart.tech_operations.length; j++) {
      let oper: resTechOperation = cart.tech_operations[j];
      let promise = changeOper(oper, oper.techCartId!);
      promises.push(promise);

      promise.then((el) => {
        if (!cart) throw new Error("");
        if (!cart.tech_operations) throw new Error("");
        if (!el) throw new Error("");
        if (cart.costHectare == undefined) throw new Error("");
        cart.tech_operations[j] = el;
        costHectare +=
          el.costMachineWork! +
            el.costCars! +
            el.costFuel! +
            el.costHandWork! ||
          el.costHandWork ||
          el.costServices ||
          el.costTransport ||
          el.costMaterials ||
          0;
        costMachineWork += el.costMachineWork || 0;
        costCars += el.costCars || 0;
        costFuel += el.costFuel || 0;
        costHandWork += el.costHandWork || 0;

        tech_cart.update(
          {
            costHectare,
            totalCostFuel: costFuel,
            totalCostHandWork: costHandWork,
            totalCostCars: costCars,
            totalCostMachineWork: costMachineWork,
          },
          { where: { id: oper.techCartId } }
        );
      });
    }
  }
  await Promise.all(promises);
  return carts;
}

async function guestPatchCart(data: resTechCartsWithOpers) {
  const cart: resTechCartsWithOpers = JSON.parse(JSON.stringify(data));
  let sum = 0;
  if (!cart.tech_operations) return;
  for (let j = 0; j < cart.tech_operations.length; j++) {
    let oper = cart.tech_operations[j];

    let el = await changeOper(
      oper,
      oper.techCartId!,
      oper[cellNames[oper.cell]] as Icost_material | null,
      oper[cellNames[oper.cell]] as Icost_service | null,
      oper[cellNames[oper.cell]] as Icost_transport | null,
      {
        ...oper[cellNames[oper.cell]],
        priceDiesel: cart.priceDiesel,
        salary: cart.salary,
      } as guestAggregate | null,
      {
        ...oper[cellNames[oper.cell]],
        salary: cart.salary,
      } as guest_cost_hand_work | null
    );
    if (!el) throw new Error("");

    sum +=
      el.costMachineWork! + el.costCars! + el.costFuel! + el.costHandWork! ||
      el.costHandWork ||
      el.costServices ||
      el.costTransport ||
      el.costMaterials ||
      0;
    cart.tech_operations[j] = el;
  }
  cart.costHectare = sum;
  // console.log(cart.tech_operations.map((el) => el));
  // console.log(cart.tech_operations.map((el) => el.cost_hand_work));
  // console.log(cart);

  return [cart];
}
async function getExistTractors(user: Principal | undefined) {
  const Tractors: Itractor[] = await tractor.findAll({
    //@ts-ignore
    where: { userId: user.sub, copiedFromId: { [Op.ne]: null } },
  });
  // console.log(Tractors);

  return JSON.parse(JSON.stringify(Tractors));
}
async function getExistMachines(user: Principal | undefined) {
  return await agricultural_machine.findAll({
    //@ts-ignore
    where: { userId: user.sub, copiedFromId: { [Op.ne]: null } },
  });
}
async function checkTractorId(
  authorTractorId: number | undefined,
  el: resTechOperation,
  user: Principal | undefined
) {
  let tractors = await getExistTractors(user);
  // console.log(tractors);

  for (let i = 0; i < tractors.length; i++) {
    const el = tractors[i];
    if (el.copiedFromId == authorTractorId) {
      return el.id;
    }
  }
  const Tractor = await tractor.create({
    brand: el.aggregate?.tractor?.brand!,
    depreciationPeriod: el.aggregate?.tractor?.depreciationPeriod!,
    enginePower: el.aggregate?.tractor?.enginePower!,
    fuelConsumption: el.aggregate?.tractor?.fuelConsumption!,
    marketCost: el.aggregate?.tractor?.marketCost!,
    nameTractor: el.aggregate?.tractor?.nameTractor!,
    numberOfPersonnel: el.aggregate?.tractor?.numberOfPersonnel!,
    gradeId: el.aggregate?.tractor?.gradeId,
    userId: user?.sub,
    copiedFromId: el.aggregate?.tractor.id,
  });
  return Tractor.id;
}
async function checkMachineId(
  authorMachineId: number | undefined,
  el: resTechOperation,
  user: Principal | undefined
) {
  let machines = await getExistMachines(user);
  for (let i = 0; i < machines.length; i++) {
    const el = machines[i];
    if (el.copiedFromId == authorMachineId) {
      return el.id;
    }
  }
  const Machine = await agricultural_machine.create({
    brand: el.aggregate?.agricultural_machine?.brand!,
    depreciationPeriod: el.aggregate?.agricultural_machine?.depreciationPeri!,
    marketCost: el.aggregate?.agricultural_machine?.marketCost!,
    nameMachine: el.aggregate?.agricultural_machine?.nameMachine!,
    numberOfServicePersonnel:
      el.aggregate?.agricultural_machine?.numberOfServiceP!,
    widthOfCapture: el.aggregate?.agricultural_machine?.widthOfCapture!,
    workingSpeed: el.aggregate?.agricultural_machine?.workingSpeed!,
    gradeId: el.aggregate?.agricultural_machine?.gradeId,
    userId: user?.sub,
    copiedFromId: el.aggregate?.agricultural_machine.id,
  });
  return Machine.id;
}
class TechCartService {
  async getCart(cartId: number) {
    let Scarts: resTechCartsWithOpers[];

    //@ts-ignore
    Scarts = await tech_cart.findAll({
      include: cartsIncludes,
      where: { id: cartId },
    });

    const carts = await changeCarts(Scarts);

    return carts;
  }
  async getOnlyCarts(user: Principal | undefined) {
    let carts: Itech_cart[];
    if (!user?.sub) {
      carts = await tech_cart.findAll({
        where: { isPublic: true, isBasic: null },
      });
    } else {
      carts = await tech_cart.findAll({
        where: { userId: user.sub, isBasic: null },
      });
    }

    return carts;
  }
  async create(data: CreateCartType, user: Principal | undefined) {
    const {
      nameCart,
      area,
      salary,
      priceDiesel,
      isComplex,
      sectionId,
      cultureId,
      cultivationTechnologyId,
      year,
      isBasic,
    } = data;

    if (!user) return;
    const techCart: Itech_cart = await tech_cart.create({
      nameCart,
      area,
      salary,
      priceDiesel,
      isComplex: isComplex ? true : false,
      sectionId: sectionId ? sectionId : null,
      cultureId: cultureId,
      cultivationTechnologyId: cultivationTechnologyId,
      year: year!,
      isBasic,
      userId: user?.sub,
    });

    return techCart;
  }
  async patchCart(data: resTechCartsWithOpers, user: Principal | undefined) {
    const {
      id,
      nameCart,
      area,
      salary,
      isPublic,
      priceDiesel,
      isComplex,
      sectionId,
      cultureId,
      cultivationTechnologyId,
      year,
    } = data;

    if (user) {
      const cart = await tech_cart.findOne({
        where: { id: id },
      });
      if (cart?.year != year) {
        vegetationYears.update(
          { techCartId: cart?.id! },
          { where: { cultureId, cultivationTechnologyId, year } }
        );
        vegetationYears.update(
          { techCartId: null },
          { where: { cultureId, cultivationTechnologyId, year: cart?.year! } }
        );
      }
      await tech_cart.update(
        {
          nameCart,
          area,
          salary,
          isPublic,
          priceDiesel,
          isComplex: isComplex ? true : false,
          sectionId: sectionId ? sectionId : null,
          cultureId: cultureId,
          year: year!,
          cultivationTechnologyId: cultivationTechnologyId,
        },
        { where: { id: id } }
      );
      const techCart: resTechCartsWithOpers[] = await tech_cart.findAll({
        where: { id: id },
        include: cartsIncludes,
      });
      if (isComplex && sectionId) {
        techCart[0].tech_operations?.forEach(async (el) => {
          await tech_operation.update(
            { sectionId: +sectionId },
            { where: { id: el.id } }
          );
        });
      }
      const res = await changeCarts(techCart);
      let costHectare = 0,
        costMachineWork = 0,
        costCars = 0,
        costFuel = 0,
        costHandWork = 0;
      res.forEach((cart) => {
        cart?.tech_operations?.forEach((el) => {
          costHectare +=
            el.costMachineWork! +
              el.costCars! +
              el.costFuel! +
              el.costHandWork! ||
            el.costHandWork ||
            el.costServices ||
            el.costTransport ||
            el.costMaterials ||
            0;
          costMachineWork += el.costMachineWork || 0;
          costCars += el.costCars || 0;
          costFuel += el.costFuel || 0;
          costHandWork += el.costHandWork || 0;
        });
      });
      tech_cart.update(
        {
          costHectare,
          totalCostFuel: costFuel,
          totalCostHandWork: costHandWork,
          totalCostCars: costCars,
          totalCostMachineWork: costMachineWork,
        },
        { where: { id: id } }
      );
      if (res[0]) res[0].costHectare = costHectare;

      return res;
    } else {
      return await guestPatchCart(data);
    }
  }

  async delete(id: number, user: Principal | undefined) {
    if (!user) return;
    //@ts-ignore
    const cart: resTechCartsWithOpers = await tech_cart.findOne({
      where: { id },
      include: cartsIncludes,
    });
    if (!cart.tech_operations) return { id };
    for (let i = 0; i < cart.tech_operations?.length; i++) {
      const el = cart.tech_operations[i];
      if (el.cell == "costHandWork") {
        await cost_hand_work.destroy({ where: { techOperationId: el.id } });
      } else if (el.cell == "costMaterials") {
        await cost_material.destroy({ where: { techOperationId: el.id } });
      } else if (el.cell == "costMechanical") {
        await aggregate.destroy({ where: { techOperationId: el.id } });
      } else if (el.cell == "costServices") {
        await cost_service.destroy({ where: { techOperationId: el.id } });
      } else if (el.cell == "costTransport") {
        await cost_transport.destroy({ where: { techOperationId: el.id } });
      }
      await tech_operation.destroy({ where: { id: el.id } });
    }

    const techCart = await tech_cart.destroy({
      where: { id: id },
    });
    return { id };
  }
  async setIsPublic(
    data: {
      id: number;
      isPublic: boolean;
      authorName?: string;
      cultural?: number;
      description?: string;
    },
    user: Principal | undefined
  ) {
    if (!user) return;
    if (
      user.role != "ADMIN" &&
      user.role != "AUTHOR" &&
      user.role != "service_role"
    )
      return;
    const { id, isPublic, authorName, cultural, description } = data;
    if (isPublic == false) {
      await tech_cart.update(
        { isPublic, authorName, culturesTypeId: cultural, isAgree: false },
        { where: { id } }
      );
    } else {
      await tech_cart.update(
        { isPublic, authorName, culturesTypeId: cultural, description },
        { where: { id } }
      );
    }
    //@ts-ignore
    let carts: resTechCartsWithOpers[] = await tech_cart.findAll({
      where: { id },
      include: cartsIncludes,
    });

    // carts = await changeCarts(carts);
    return carts;
  }
  async getCopyCarts(user: Principal | undefined) {
    if (!user) return;
    const carts = await tech_cart.findAll({ where: { isPublic: true } });
    return carts;
  }
  async copyCarts(cartId: number, user: Principal | undefined) {
    if (!user) return;
    //@ts-ignore
    const cartsData: resTechCartsWithOpers[] = await tech_cart.findAll({
      include: cartsIncludes,
      where: { id: cartId },
    });

    const cartsBefore: resTechCartsWithOpers[] | undefined = JSON.parse(
      JSON.stringify(cartsData)
    );

    if (!cartsBefore) return;

    let cartIn;
    for (let i = 0; i < cartsBefore.length; i++) {
      const cart = cartsBefore[i];

      if (!cart.tech_operations) return;
      async function mapTechOperation(
        cart: resTechCartsWithOpers,
        user: Principal
      ) {
        if (!cart.tech_operations) return;
        let res: [] | any = [];
        for (let i = 0; i < cart.tech_operations.length; i++) {
          const el = cart.tech_operations[i];
          let isTractor;
          let isMachine;
          if (el.cell == "costMechanical") {
            isTractor = await checkTractorId(
              el.aggregate?.tractor?.id,
              el,
              user
            );
            isMachine = await checkMachineId(
              el.aggregate?.agricultural_machine.id,
              el,
              user
            );
          }
          res.push({
            nameOperation: el.nameOperation,
            sectionId: el.sectionId,
            cell: el.cell,
            ...(el.cell == "costMechanical"
              ? {
                  aggregate: {
                    amountOfMachineDepreciationPerHour:
                      el.aggregate?.amountOfMachineDepreciationPerHour,
                    amountOfTractorDepreciationPerHour:
                      el.aggregate?.amountOfTractorDepreciationPerHour,
                    fuelConsumption: el.aggregate?.fuelConsumption!,
                    pricePerHourDiesel: el.aggregate?.pricePerHourDiesel,
                    pricePerHourServicePersonnel:
                      el.aggregate?.pricePerHourServicePersonnel,
                    unitProductionAggregate:
                      el.aggregate?.unitProductionAggregate,
                    workingSpeed: el.aggregate?.workingSpeed!,
                    tractorId: isTractor,
                    agriculturalMachineId: isMachine,
                  },
                }
              : el.cell == "costHandWork"
              ? {
                  cost_hand_work: {
                    gradeId: el.cost_hand_work?.gradeId,
                    nameOper: el.cost_hand_work?.nameOper,
                    pricePerHourPersonnel:
                      el.cost_hand_work?.pricePerHourPersonnel,
                    productionPerShift: el.cost_hand_work?.productionPerShift,
                    productionRateAmount:
                      el.cost_hand_work?.productionRateAmount,
                    productionRateTime: el.cost_hand_work?.productionRateTime,
                    productionRateWeight:
                      el.cost_hand_work?.productionRateWeight,
                    salaryPerShift: el.cost_hand_work?.salaryPerShift,
                    spending: el.cost_hand_work?.spending,
                    type: el.cost_hand_work?.type,
                    yieldСapacity: el.cost_hand_work?.yieldСapacity,
                    unitOfMeasurement: el.cost_hand_work?.unitOfMeasurement,
                  },
                }
              : el.cell == "costMaterials"
              ? {
                  cost_material: {
                    consumptionPerHectare:
                      el.cost_material?.consumptionPerHectare,
                    nameMaterials: el.cost_material?.nameMaterials,
                    nameOper: el.cost_material?.nameOper,
                    price: el.cost_material?.price,
                    unitsOfConsumption: el.cost_material?.unitsOfConsumption,
                    unitsOfCost: el.cost_material?.unitsOfCost,
                  },
                }
              : el.cell == "costServices"
              ? {
                  cost_service: {
                    nameService: el.cost_service?.nameService,
                    price: el.cost_service?.price,
                    unitsOfCost: el.cost_service?.unitsOfCost,
                  },
                }
              : el.cell == "costTransport"
              ? {
                  cost_transport: {
                    nameTransport: el.cost_transport?.nameTransport,
                    price: el.cost_transport?.price,
                    unitsOfCost: el.cost_transport?.unitsOfCost,
                  },
                }
              : {}),
          });
        }
        return res;
      }
      cartIn = JSON.parse(
        JSON.stringify(
          await tech_cart.create(
            {
              area: cart.area,
              nameCart: cart.nameCart,
              isPublic: false,
              priceDiesel: cart.priceDiesel,
              salary: cart.salary,
              userId: user.sub,
              //@ts-ignore
              tech_operations: await mapTechOperation(cart, user),
            },
            { include: cartsIncludes }
          )
        )
      );
    }

    let cart1 = JSON.parse(
      JSON.stringify(
        await tech_cart.findAll({
          include: cartsIncludes,
          where: { id: cartIn.id },
        })
      )
    );
    cart1 = changeCarts(cart1);

    return cart1;
  }
  async getIsAgreeCarts() {
    let carts: resTechCartsWithOpers[] = await tech_cart.findAll({
      where: { isPublic: true, isAgree: false },
      include: cartsIncludes,
    });
    // carts = await changeCarts(carts);
    return carts;
  }
  async setIsAgreeCarts(
    user: Principal | undefined,
    isAgree: boolean,
    cartId: number,
    authorName?: string,
    cultural?: number,
    description?: string
  ) {
    if (user?.role !== "ADMIN" && user?.role != "service_role") return;
    if (authorName && cultural && description) {
      await tech_cart.update(
        {
          isAgree,
          isPublic: true,
          authorName,
          culturesTypeId: cultural,
          description,
        },
        { where: { id: cartId } }
      );
    } else {
      await tech_cart.update(
        { isAgree, isPublic: true },
        { where: { id: cartId } }
      );
    }
    if (authorName && cultural && description) {
      let carts: resTechCartsWithOpers[] = await tech_cart.findAll({
        where: { id: cartId },
        include: cartsIncludes,
      });
      // carts = await changeCarts(carts);
      return carts;
    }
    return 1;
  }
  async getAgreeCarts() {
    let carts: resTechCartsWithOpers[] = await tech_cart.findAll({
      where: { isPublic: true, isAgree: true },
    });
    // carts = await changeCarts(carts);
    return carts;
  }
  async downloaded({ cartId, value }: { cartId: number; value: number }) {
    await tech_cart.update({ timesDow: ++value }, { where: { id: cartId } });

    let cart: resTechCartsWithOpers | null = await tech_cart.findOne({
      where: { id: cartId },
    });
    return cart;
  }
  async copyComplex(
    complexId: number,
    cartId: number,
    user: Principal | undefined
  ) {
    const complex: resTechCartsWithOpers | null = await tech_cart.findOne({
      where: { id: complexId },
      include: cartsIncludes,
    });
    for (let i = 0; i < complex?.tech_operations?.length!; i++) {
      // @ts-ignore
      const el = complex.tech_operations[i];

      await tech_operation.create(
        {
          cell: el.cell,
          nameOperation: el.nameOperation,
          sectionId: el.sectionId,
          techCartId: cartId,
          createdAt: el.createdAt,
          date: el.date,
          ...(el.cell == "costMechanical"
            ? {
                aggregate: {
                  amountOfMachineDepreciationPerHour:
                    el.aggregate?.amountOfMachineDepreciationPerHour,
                  amountOfTractorDepreciationPerHour:
                    el.aggregate?.amountOfTractorDepreciationPerHour,
                  fuelConsumption: el.aggregate?.fuelConsumption!,
                  pricePerHourDiesel: el.aggregate?.pricePerHourDiesel,
                  pricePerHourServicePersonnel:
                    el.aggregate?.pricePerHourServicePersonnel,
                  unitProductionAggregate:
                    el.aggregate?.unitProductionAggregate,
                  workingSpeed: el.aggregate?.workingSpeed!,
                  tractorId: el.aggregate?.tractorId,
                  agriculturalMachineId: el.aggregate?.agriculturalMachineId,
                },
              }
            : el.cell == "costHandWork"
            ? {
                cost_hand_work: {
                  gradeId: el.cost_hand_work?.gradeId,
                  nameOper: el.cost_hand_work?.nameOper,
                  pricePerHourPersonnel:
                    el.cost_hand_work?.pricePerHourPersonnel,
                  productionPerShift: el.cost_hand_work?.productionPerShift,
                  productionRateAmount: el.cost_hand_work?.productionRateAmount,
                  productionRateTime: el.cost_hand_work?.productionRateTime,
                  productionRateWeight: el.cost_hand_work?.productionRateWeight,
                  salaryPerShift: el.cost_hand_work?.salaryPerShift,
                  spending: el.cost_hand_work?.spending,
                  type: el.cost_hand_work?.type,
                  yieldСapacity: el.cost_hand_work?.yieldСapacity,
                  unitOfMeasurement: el.cost_hand_work?.unitOfMeasurement,
                },
              }
            : el.cell == "costMaterials"
            ? {
                cost_material: {
                  consumptionPerHectare:
                    el.cost_material?.consumptionPerHectare,
                  nameMaterials: el.cost_material?.nameMaterials,
                  nameOper: el.cost_material?.nameOper,
                  price: el.cost_material?.price,
                  unitsOfConsumption: el.cost_material?.unitsOfConsumption,
                  unitsOfCost: el.cost_material?.unitsOfCost,
                },
              }
            : el.cell == "costServices"
            ? {
                cost_service: {
                  nameService: el.cost_service?.nameService,
                  price: el.cost_service?.price,
                  unitsOfCost: el.cost_service?.unitsOfCost,
                },
              }
            : el.cell == "costTransport"
            ? {
                cost_transport: {
                  nameTransport: el.cost_transport?.nameTransport,
                  price: el.cost_transport?.price,
                  unitsOfCost: el.cost_transport?.unitsOfCost,
                },
              }
            : {}),
        },
        { include: opeInclude }
      );
    }

    let res: resTechCartsWithOpers | undefined | null = await tech_cart.findOne(
      {
        where: { id: cartId },
        include: cartsIncludes,
      }
    );
    if (!res) return;
    [res] = await changeCarts([res]);
    return res;
  }
  async getForBusiness() {
    //@ts-ignore
    const res: resTechCartsWithOpers[] = await tech_cart.findAll({
      where: { [Op.or]: [{ isBasic: false }, { isBasic: true }] },
    });
    return res;
  }
}

export default new TechCartService();
