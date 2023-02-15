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
  Itech_cart,
  Itech_operation,
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

export interface resTechOperation extends Itech_operation {
  aggregate: Iaggregate | null;
  cost_hand_work: Icost_hand_work | null;
  cost_material: Icost_material | null;
  cost_service: Icost_service | null;
  cost_transport: Icost_transport | null;
}
export interface resTechCartsWithOpers extends Itech_cart {
  tech_operations: resTechOperation[];
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

export async function getCart(userId: string | undefined) {
  let res: { carts: resTechCartsWithOpers[] } = {
    carts: [],
  };
  let Scarts: resTechCartsWithOpers[];
  if (!userId) {
    //@ts-ignore
    Scarts = await tech_cart.findAll({
      include: [
        {
          model: tech_operation,
          include: [
            cost_material,
            cost_service,
            cost_transport,
            cost_hand_work,
            aggregate,
          ],
        },
      ],
      where: { isPublic: true },
    });
  } else {
    //@ts-ignore
    Scarts = await tech_cart.findAll({
      include: [
        {
          model: tech_operation,
          include: [
            cost_material,
            cost_service,
            cost_transport,
            cost_hand_work,
            aggregate,
          ],
        },
      ],
      where: { userId: userId },
    });
  }
  Scarts.sort((a, b) => a.id! - b.id!);
  const carts = JSON.parse(JSON.stringify(Scarts));
  for (let i = 0; i < carts.length; i++) {
    let cart = carts[i];
    let sum: number = 0;
    for (let j = 0; j < cart.tech_operations.length; j++) {
      let oper: resTechOperation = cart.tech_operations[j];

      //@ts-ignore sequelize-znov
      let el = await changeOper(oper, oper.techCartId!);
      cart.tech_operations[j] = el;
      sum +=
        el.costMachineWork! + el.costCars! + el.costFuel! + el.costHandWork! ||
        el.costHandWork ||
        el.costServices ||
        el.costTransport ||
        el.costMaterials ||
        0;
    }
    cart.totalCost = sum;
  }

  res = { carts };

  //@ts-ignore
  return res;
}

async function guestPatchCart(data: Idata) {
  //@ts-ignore
  const Scart: resTechCartsWithOpers = data;
  const cart: resTechCartsWithOpers = JSON.parse(JSON.stringify(Scart));
  let sum = 0;
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
    const techCart = await tech_cart.destroy({ where: { id: id } });
    return { id };
  }
  async setIsPublic(
    data: { id: number; isPublic: boolean },
    user: Principal | undefined
  ) {
    if (!user) return;
    if (user.role != "ADMIN") return;
    const { id, isPublic } = data;
    tech_cart.update({ isPublic }, { where: { id } });
    return getCart(user?.sub);
  }
}

export default new TechCartService();
