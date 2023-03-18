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
  Itech_cart,
  Itech_operation,
  Itractor,
  tech_cart,
  tech_operation,
  tractor,
} from "../models/models";
import {
  changeOper,
  guestAggregate,
  guest_cost_hand_work,
  Icell,
} from "./OperService";

export interface Idata {
  id?: number;
  nameCart: string;
  area: number;
  totalCost?: number;
  salary: number;
  isPublic?: boolean | undefined;
  priceDiesel: number;
  tech_operations?: [
    {
      aggregate: {
        agriculturalMachineId: number;
        fuelConsumption: number;
        id: number;
        techOperationId: number;
        tractorId: number;
        workingSpeed: number;
      } | null;
      cell: Icell;
      costCars: number | null;
      costFuel: number | null;
      costHandWork: number | null;
      costMachineWork: number | null;
      cost_hand_work: {
        gradeId: number;
        id: number;
        nameOper: string;
        pricePerHourPersonnel: number | null;
        productionPerShift: number | null;
        productionRateAmount: number;
        productionRateTime: number;
        productionRateWeight: number;
        salaryPerShift: number;
        spending: number;
        techOperationId: number;
        type: number;
        unitOfMeasurement: string;
        yieldСapacity: number;
      } | null;
      cost_material: {
        consumptionPerHectare: number;
        id: number;
        nameMaterials: string;
        price: number;
        techOperationId: number;
        unitsOfConsumption: string;
        unitsOfCost: string;
      } | null;
      cost_service: {
        id: number;
        nameService: string;
        price: number;
        techOperationId: number;
        unitsOfCost: string;
      } | null;
      cost_transport: {
        id: number;
        nameTransport: string;
        price: number;
        unitsOfCost: string;
        techOperationId: number;
      } | null;
      nameOperation: string;
      sectionId: number;
      techCartId: number;
      id: number;
    }
  ];
  userId?: number;
}
interface resTechOperationAggreagte extends Iaggregate {
  tractor: Itractor;
  agricultural_machine: Imachine;
}
export interface resTechOperation extends Itech_operation {
  aggregate?: resTechOperationAggreagte | null;
  cost_hand_work?: Icost_hand_work | null;
  cost_material?: Icost_material | null;
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
const cartsIncludes = [
  {
    model: tech_operation,
    include: [
      cost_material,
      cost_service,
      cost_transport,
      cost_hand_work,
      { model: aggregate, include: [tractor, agricultural_machine] },
    ],
  },
];
async function changeCarts(Scarts: resTechCartsWithOpers[]) {
  Scarts.sort((a, b) => a.id! - b.id!);
  const carts: resTechCartsWithOpers[] = JSON.parse(JSON.stringify(Scarts));
  for (let i = 0; i < carts.length; i++) {
    let cart = carts[i];
    let sum: number = 0;
    if (cart.tech_operations)
      for (let j = 0; j < cart.tech_operations.length; j++) {
        let oper: resTechOperation = cart.tech_operations[j];

        let el = await changeOper(oper, oper.techCartId!);
        if (!el) throw new Error("");

        cart.tech_operations[j] = el;
        sum +=
          el.costMachineWork! +
            el.costCars! +
            el.costFuel! +
            el.costHandWork! ||
          el.costHandWork ||
          el.costServices ||
          el.costTransport ||
          el.costMaterials ||
          0;
      }

    cart.totalCost = sum;
  }
  return carts;
}
export async function getCart(userId: string | undefined) {
  let res: { carts: resTechCartsWithOpers[] } = {
    carts: [],
  };
  let Scarts: resTechCartsWithOpers[];
  if (!userId) {
    //@ts-ignore
    Scarts = await tech_cart.findAll({
      include: cartsIncludes,
      where: { isPublic: true },
    });
  } else {
    //@ts-ignore
    Scarts = await tech_cart.findAll({
      include: cartsIncludes,
      where: { userId: userId },
    });
  }

  res = { carts: await changeCarts(Scarts) };

  //@ts-ignore
  return res;
}

async function guestPatchCart(data: Idata) {
  //@ts-ignore
  const Scart: resTechCartsWithOpers = data;
  const cart: resTechCartsWithOpers = JSON.parse(JSON.stringify(Scart));
  let sum = 0;
  if (!cart.tech_operations) return;
  for (let j = 0; j < cart.tech_operations.length; j++) {
    let oper: resTechOperation = cart.tech_operations[j];

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
  cart.totalCost = sum;

  return { carts: [cart] };
}

class TechCartService {
  async getAll(user: Principal | undefined) {
    return getCart(user?.sub);
  }
  async create(data: Idata, user: Principal | undefined) {
    const {
      nameCart,
      area,
      salary,
      priceDiesel,

      totalCost = 0,
    } = data;
    if (!user) return;
    const techCart: Itech_cart = await tech_cart.create({
      nameCart,
      area,
      totalCost,
      salary,
      priceDiesel,
      userId: user?.sub,
    });

    return techCart;
  }
  async patchCart(data: Idata, user: Principal | undefined) {
    const { id, nameCart, area, salary, isPublic, priceDiesel } = data;
    if (user) {
      const techCart = await tech_cart.update(
        { nameCart, area, salary, isPublic, priceDiesel },
        { where: { id: id } }
      );
      return getCart(user?.sub);
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
    const { id, isPublic, authorName, cultural } = data;
    if (isPublic == false) {
      await tech_cart.update(
        { isPublic, authorName, culturesTypeId: cultural, isAgree: false },
        { where: { id } }
      );
    } else {
      await tech_cart.update(
        { isPublic, authorName, culturesTypeId: cultural },
        { where: { id } }
      );
    }
    //@ts-ignore
    let carts: resTechCartsWithOpers[] = await tech_cart.findAll({
      where: { id },
      include: cartsIncludes,
    });

    carts = await changeCarts(carts);
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
    async function getExistTractors() {
      const Tractors: Itractor[] = await tractor.findAll({
        //@ts-ignore
        where: { userId: user.sub, copiedFromId: { [Op.ne]: null } },
      });
      console.log(Tractors);

      return JSON.parse(JSON.stringify(Tractors));
    }
    async function getExistMachines() {
      return await agricultural_machine.findAll({
        //@ts-ignore
        where: { userId: user.sub, copiedFromId: { [Op.ne]: null } },
      });
    }
    async function checkTractorId(
      authorTractorId: number | undefined,
      el: resTechOperation
    ) {
      let tractors = await getExistTractors();
      console.log(tractors);

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
      el: resTechOperation
    ) {
      let machines = await getExistMachines();
      for (let i = 0; i < machines.length; i++) {
        const el = machines[i];
        if (el.copiedFromId == authorMachineId) {
          return el.id;
        }
      }
      const Machine = await agricultural_machine.create({
        brand: el.aggregate?.agricultural_machine?.brand!,
        depreciationPeriod:
          el.aggregate?.agricultural_machine?.depreciationPeri!,
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
            isTractor = await checkTractorId(el.aggregate?.tractor?.id, el);
            console.log("id");
            console.log(isTractor);

            isMachine = await checkMachineId(
              el.aggregate?.agricultural_machine.id,
              el
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
    carts = await changeCarts(carts);
    return carts;
  }
  async setIsAgreeCarts(
    user: Principal | undefined,
    isAgree: boolean,
    cartId: number,
    authorName?: string,
    cultural?: number
  ) {
    if (user?.role !== "ADMIN" && user?.role != "service_role") return;
    if (authorName && cultural) {
      await tech_cart.update(
        { isAgree, isPublic: true, authorName, culturesTypeId: cultural },
        { where: { id: cartId } }
      );
    } else {
      await tech_cart.update(
        { isAgree, isPublic: true },
        { where: { id: cartId } }
      );
    }
    if (authorName && cultural) {
      let carts: resTechCartsWithOpers[] = await tech_cart.findAll({
        where: { id: cartId },
        include: cartsIncludes,
      });
      carts = await changeCarts(carts);
      return carts;
    }
    return 1;
  }
  async getAgreeCarts() {
    let carts: resTechCartsWithOpers[] = await tech_cart.findAll({
      where: { isPublic: true, isAgree: true },
      include: cartsIncludes,
    });
    carts = await changeCarts(carts);
    return carts;
  }
}

export default new TechCartService();
