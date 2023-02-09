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
import { Icell } from "./OperService";

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
    });
  }
  Scarts.sort((a, b) => a.id! - b.id!);
  const carts = JSON.parse(JSON.stringify(Scarts));
  for (let i = 0; i < carts.length; i++) {
    let cart = carts[i];
    let sum: number = 0;
    for (let j = 0; j < cart.tech_operations.length; j++) {
      let oper: Itech_operation = cart.tech_operations[j];

      if (oper.cell == "costMaterials") {
        //@ts-ignore sequelize-znov
        let costMaterials = oper[cellNames[oper.cell]];
        if (!costMaterials) {
          oper.costMaterials = 0;
          continue;
        }
        oper.costMaterials =
          costMaterials.price * costMaterials.consumptionPerHectare;
        sum += costMaterials.price * costMaterials.consumptionPerHectare;
      } else if (oper.cell == "costTransport") {
        //@ts-ignore sequelize-znov
        let costTransport = oper[cellNames[oper.cell]];
        if (!costTransport) {
          oper.costTransport = 0;
          continue;
        }

        oper.costTransport = costTransport.price;
        sum += costTransport.price;
      } else if (oper.cell == "costServices") {
        //@ts-ignore sequelize-znov
        let costServices = oper[cellNames[oper.cell]];
        if (!costServices) {
          oper.costServices = 0;
          continue;
        }
        oper.costServices = costServices.price;
        sum += costServices.price;
      } else if (oper.cell == "costMechanical") {
        //@ts-ignore sequelize-znov
        const aggregateData = oper[cellNames[oper.cell]];
        if (aggregateData == null) throw new Error("");

        const Tractor = await tractor.findOne({
          where: { id: aggregateData.tractorId },
        });
        const machine = await agricultural_machine.findOne({
          where: { id: aggregateData.agriculturalMachineId },
        });
        const Grade = await grade.findAll();
        if (Tractor == null || machine == null || cart == null || Grade == null)
          throw new Error("");
        const [gradeTractor] = Grade.filter((el) => el.id == Tractor.gradeId);
        const [gradeMachine] = Grade.filter((el) => el.id == machine.gradeId);
        const pricePerHourPersonnel = Math.round(cart?.salary / 176);
        const costFuel = Math.round(
          (+aggregateData.fuelConsumption * +cart.priceDiesel) /
            Math.round(
              (+machine.widthOfCapture * (+aggregateData.workingSpeed * 1000)) /
                10000
            )
        );
        const costCars = Math.round(
          ((Math.round(
            +Tractor.marketCost / +Tractor.depreciationPeriod / 220 / 8
          ) +
            Math.round(
              +machine.marketCost / +machine.depreciationPeriod / 220 / 8
            )) *
            1.05) /
            Math.round(
              (+machine.widthOfCapture * (+aggregateData.workingSpeed * 1000)) /
                10000
            )
        );
        const costMachineWork = Math.round(
          pricePerHourPersonnel *
            (Tractor.numberOfPersonnel ?? 0) *
            gradeTractor?.coefficient!
        );
        const costHandWork = Math.round(
          pricePerHourPersonnel *
            (machine.numberOfServicePersonnel ?? 0) *
            gradeMachine?.coefficient!
        );

        oper.costMachineWork = costMachineWork;
        oper.costCars = costCars;
        oper.costFuel = costFuel;
        oper.costHandWork = costHandWork;
        sum += costMachineWork + costCars + costFuel + costHandWork;
      } else if (oper.cell == "costHandWork") {
        //@ts-ignore sequelize-znov
        const handWork = oper[cellNames[oper.cell]];
        let costHandWork;
        if (!handWork) {
          oper.costHandWork = 0;
          continue;
        }
        const Grade = await grade.findOne({ where: { id: handWork.gradeId } });
        if (!Grade || !cart) throw new Error("нема карти або типу роботи");

        const pricePerHourPersonnel = Math.round(cart.salary / 176);

        if (handWork.type == 1) {
          costHandWork = Math.round(
            (pricePerHourPersonnel / handWork.productionRateTime!) *
              Grade.coefficient *
              10000
          );
        } else if (handWork.type == 2) {
          costHandWork = Math.round(
            pricePerHourPersonnel *
              (handWork.yieldСapacity! / handWork.productionRateWeight!) *
              Grade.coefficient
          );
        } else if (handWork.type == 3) {
          costHandWork = Math.round(
            pricePerHourPersonnel *
              (handWork.spending! / handWork.productionRateAmount!) *
              Grade.coefficient
          );
        }
        oper.costHandWork = costHandWork;
        sum += costHandWork || 0;
      }
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
  cart.nameCart = data.nameCart;
  cart.area = data.area;
  cart.salary = data.salary;
  cart.priceDiesel = data.priceDiesel;
  let sum = 0;
  for (let j = 0; j < cart.tech_operations.length; j++) {
    let oper: Itech_operation = cart.tech_operations[j];
    console.log(oper);

    if (oper.cell == "costMaterials") {
      //@ts-ignore sequelize-znov
      let costMaterials = oper[cellNames[oper.cell]];
      if (!costMaterials) {
        oper.costMaterials = 0;
        continue;
      }
      // console.log(costMaterials);

      oper.costMaterials =
        costMaterials.price * costMaterials.consumptionPerHectare;
      sum += costMaterials.price * costMaterials.consumptionPerHectare;
    } else if (oper.cell == "costTransport") {
      //@ts-ignore sequelize-znov
      let costTransport = oper[cellNames[oper.cell]];
      if (!costTransport) {
        oper.costTransport = 0;
        continue;
      }

      oper.costTransport = costTransport.price;
      sum += costTransport.price;
    } else if (oper.cell == "costServices") {
      //@ts-ignore sequelize-znov
      let costServices = oper[cellNames[oper.cell]];
      if (!costServices) {
        oper.costServices = 0;
        continue;
      }

      oper.costServices = costServices.price;
      sum += costServices.price;
    } else if (oper.cell == "costMechanical") {
      //@ts-ignore sequelize-znov
      const aggregateData = oper[cellNames[oper.cell]];
      if (aggregateData == null) throw new Error("");

      const Tractor = await tractor.findOne({
        where: { id: aggregateData.tractorId },
      });
      const machine = await agricultural_machine.findOne({
        where: { id: aggregateData.agriculturalMachineId },
      });
      const Grade = await grade.findAll();
      if (Tractor == null || machine == null || cart == null || Grade == null)
        throw new Error("");
      const [gradeTractor] = Grade.filter((el) => el.id == Tractor.gradeId);
      const [gradeMachine] = Grade.filter((el) => el.id == machine.gradeId);
      const pricePerHourPersonnel = Math.round(cart?.salary / 176);
      const costFuel = Math.round(
        (+aggregateData.fuelConsumption * +cart.priceDiesel) /
          Math.round(
            (+machine.widthOfCapture * (+aggregateData.workingSpeed * 1000)) /
              10000
          )
      );
      const costCars = Math.round(
        ((Math.round(
          +Tractor.marketCost / +Tractor.depreciationPeriod / 220 / 8
        ) +
          Math.round(
            +machine.marketCost / +machine.depreciationPeriod / 220 / 8
          )) *
          1.05) /
          Math.round(
            (+machine.widthOfCapture * (+aggregateData.workingSpeed * 1000)) /
              10000
          )
      );
      const costMachineWork = Math.round(
        pricePerHourPersonnel *
          (Tractor.numberOfPersonnel ?? 0) *
          gradeTractor?.coefficient!
      );
      const costHandWork = Math.round(
        pricePerHourPersonnel *
          (machine.numberOfServicePersonnel ?? 0) *
          gradeMachine?.coefficient!
      );

      oper.costMachineWork = costMachineWork;
      oper.costCars = costCars;
      oper.costFuel = costFuel;
      oper.costHandWork = costHandWork;
      sum += costMachineWork + costCars + costFuel + costHandWork;
    } else if (oper.cell == "costHandWork") {
      //@ts-ignore sequelize-znov
      const handWork = oper[cellNames[oper.cell]];
      let costHandWork;
      if (!handWork) {
        oper.costHandWork = 0;
        continue;
      }
      const Grade = await grade.findOne({ where: { id: handWork.gradeId } });
      if (!Grade || !cart) throw new Error("нема карти або типу роботи");

      const pricePerHourPersonnel = Math.round(cart.salary / 176);

      if (handWork.type == 1) {
        costHandWork = Math.round(
          (pricePerHourPersonnel / handWork.productionRateTime!) *
            Grade.coefficient *
            10000
        );
      } else if (handWork.type == 2) {
        costHandWork = Math.round(
          pricePerHourPersonnel *
            (handWork.yieldСapacity! / handWork.productionRateWeight!) *
            Grade.coefficient
        );
      } else if (handWork.type == 3) {
        costHandWork = Math.round(
          pricePerHourPersonnel *
            (handWork.spending! / handWork.productionRateAmount!) *
            Grade.coefficient
        );
      }
      oper.costHandWork = costHandWork;
      sum += costHandWork || 0;
    }
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
