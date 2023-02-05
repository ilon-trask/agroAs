import {
  tech_cart,
  tractor,
  tech_operation,
  agricultural_machine,
  aggregate,
  cost_material,
  cost_service,
  grade,
  cost_hand_work,
  Itech_cart,
  Itech_operation,
  cost_transport,
} from "../models/models";

export type prope =
  | cost_material
  | cost_service
  | cost_transport
  | aggregate
  | cost_hand_work;

export type prope2 =
  | cost_material[]
  | cost_service[]
  | cost_transport[]
  | aggregate[]
  | cost_hand_work[];

export type IresPatch = {
  operId: number;
  nameOper: string;
  price?: number;
  amount?: number;
  unitsOfCost?: string;
  unitsOfConsumption?: string;
  fuelConsumption?: number;
  workingSpeed?: number;
  idMachine?: number;
  idTractor?: number;
  pricePerHourPersonnel?: number;
  salaryPerShift?: number;
  productionPerShift?: number;
  unitOfMeasurement?: string;
  productionRateTime?: number;
  productionRateWeight?: number;
  productionRateAmount?: number;
  yieldСapacity?: number;
  spending?: number;
  type?: number;
  gradeId?: number;
};

export interface Ioper {
  id?: number;
  nameOperation: string;
  cell: Icell;
  costCars?: number;
  costFuel?: number;
  costMachineWork?: number;
  costHandWork?: number;
  costMaterials?: number;
  costTransport?: number;
  costServices?: number;
  techCartId?: number;
  sectionId?: number;
}
export type Icell =
  | "costMaterials"
  | "costServices"
  | "costMechanical"
  | "costTransport"
  | "costHandWork";

interface Idata<T> {
  cartId: number;
  arr: {
    cell: Icell;
    res: T;
    section: number;
  };
}
interface IdataCreateCostMaterials
  extends Idata<{
    nameOper: string;
    consumptionPerHectare: number;
    price: number;
    unitsOfConsumption: string;
    unitsOfCost: string;
  }> {}

interface IdataCreateCostServices
  extends Idata<{ nameOper: string; price: number; unitsOfCost: string }> {}
interface IdataCreateCostTransport
  extends Idata<{ nameOper: string; price: number; unitsOfCost: string }> {}
interface IdataCreateCostMechanical
  extends Idata<{
    nameOper: string;
    fuelConsumption: number;
    workingSpeed: number;
    idTractor: number;
    idMachine: number;
  }> {}
interface IdataCreateCostHandWork
  extends Idata<{
    nameOper: string;
    gradeId: number;
    productionRateAmount?: number;
    productionRateTime?: number;
    productionRateWeight?: number;
    salaryPerShift?: number;
    spending?: number;
    type: number;
    unitOfMeasurement?: string;
    yieldСapacity: number;
  }> {}

interface IdataPatch<T> {
  cartId: number;
  arr: {
    cell: Icell;
    res: T;
  };
}
interface IdataPatchCostMaterial
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    consumptionPerHectare: number;
    price: number;
    unitsOfConsumption: string;
    unitsOfCost: string;
  }> {}
interface IdataPatchCostServices
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    price: number;
    unitsOfCost: string;
  }> {}

interface IdataPatchCostTransport
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    price: number;
    unitsOfCost: string;
  }> {}
interface IdataPatchCostMachine
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    fuelConsumption: number;
    workingSpeed: number;
    idTractor: number;
    idMachine: number;
  }> {}

interface IdataPatchCostHandWork
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    gradeId: number;
    productionRateAmount?: number;
    productionRateTime?: number;
    productionRateWeight?: number;
    salaryPerShift?: number;
    spending?: number;
    type: number;
    unitOfMeasurement?: string;
    yieldСapacity: number;
  }> {}

async function createOper(
  cartId: number,
  nameOper: string,
  cell: Icell,
  section: number
) {
  return await tech_operation.create({
    techCartId: cartId,
    nameOperation: nameOper,
    cell,
    sectionId: section,
  });
}
function techCartUpdate(sum: number, cartId: number) {
  tech_cart.update({ totalCost: sum || 0 }, { where: { id: cartId } });
}

function updateOper(nameOper: string, cell: Icell, operId: number) {
  const techOperation = tech_operation.update(
    {
      nameOperation: nameOper,
      cell,
    },
    { where: { id: operId } }
  );
}
export async function getOper(cartid: number) {
  const techOperation: tech_operation[] = await tech_operation.findAll({
    where: { techCartId: cartid },
  });

  if (!techOperation) return { opers: [], props: [] };

  techOperation.sort((a, b) => a.id! - b.id!);
  let props: prope[] = [];

  for (let i = 0; i < techOperation.length; i++) {
    let el = techOperation[i];

    if (el.cell == "costMaterials") {
      let costMaterials = await cost_material.findOne({
        where: { techOperationId: el.id },
      });
      if (!costMaterials) {
        el.costMaterials = 0;
        continue;
      }
      el.costMaterials =
        costMaterials.price * costMaterials.consumptionPerHectare;
    } else if (el.cell == "costTransport") {
      let costTransport = await cost_transport.findOne({
        where: { techOperationId: el.id },
      });
      if (!costTransport) {
        el.costTransport = 0;
        continue;
      }
      el.costTransport = costTransport.price;
    } else if (el.cell == "costServices") {
      let costServices = await cost_service.findOne({
        where: { techOperationId: el.id },
      });
      if (!costServices) {
        el.costServices = 0;
        continue;
      }

      el.costServices = costServices.price;
    } else if (el.cell == "costMechanical") {
      const aggregateData = await aggregate.findOne({
        where: { techOperationId: el.id },
      });
      if (aggregateData == null) throw new Error("");

      const cart = await tech_cart.findOne({ where: { id: el.techCartId } });
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

      el.costMachineWork = costMachineWork;
      el.costCars = costCars;
      el.costFuel = costFuel;
      el.costHandWork = costHandWork;
    } else if (el.cell == "costHandWork") {
      const handWork = await cost_hand_work.findOne({
        where: { techOperationId: el.id },
      });
      let costHandWork;
      if (!handWork) {
        el.costHandWork = 0;
        continue;
      }
      const cart = await tech_cart.findOne({ where: { id: el.techCartId } });
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
      el.costHandWork = costHandWork;
    }

    let data = await getProps(el.id!);

    props.push(data);
  }

  return { opers: techOperation, props };
}
async function getProps(operId: number) {
  const oper = await tech_operation.findOne({ where: { id: operId } });
  if (!oper) throw new Error("");

  let props: prope;

  const cell: Icell = oper.cell;

  if (cell == "costMaterials") {
    const costMaterials = await cost_material.findOne({
      where: { techOperationId: operId },
    });
    if (!costMaterials) throw new Error("");
    props = costMaterials;
  } else if (cell == "costServices") {
    const costServices = await cost_service.findOne({
      where: { techOperationId: operId },
    });
    if (!costServices) throw new Error("");
    props = costServices;
  } else if (cell == "costTransport") {
    const costTransport = await cost_transport.findOne({
      where: { techOperationId: operId },
    });
    if (!costTransport) throw new Error("");
    props = costTransport;
  } else if (cell == "costMechanical") {
    const costMechanical = await aggregate.findOne({
      where: { techOperationId: operId },
    });
    if (!costMechanical) throw new Error("");
    props = costMechanical;
  } else if (cell == "costHandWork") {
    const costHandWork = await cost_hand_work.findOne({
      where: { techOperationId: operId },
    });
    if (!costHandWork) throw new Error("");
    props = costHandWork;
  } else {
    throw new Error("");
  }

  return props;
}
async function getCart(cartId: number, operId: number) {
  const carts: Itech_cart[] = await tech_cart.findAll();
  let res: { opers: Itech_operation[]; carts: Itech_cart[]; props: prope[] };
  let get: { opers: Itech_operation[]; props: prope[] } = {
    opers: [],
    props: [],
  };
  for (let i = 0; i < carts.length; i++) {
    let el = carts[i];
    let data = await getOper(el.id!);
    get.opers.push(...data.opers);
    get.props.push(...data.props);
  }

  res = { ...get, carts };

  return res;
}
class OperService {
  async createCostMaterials(data: IdataCreateCostMaterials) {
    const {
      cartId,

      arr: {
        cell,
        res: {
          nameOper,
          consumptionPerHectare,
          price,
          unitsOfConsumption,
          unitsOfCost,
        },
        section,
      },
    } = data;
    let sum: number;
    const oper = await createOper(cartId, nameOper, cell, section);
    const operId = oper.id;

    cost_material.create({
      nameMaterials: nameOper,
      price,
      unitsOfCost,
      consumptionPerHectare,
      unitsOfConsumption,
      techOperationId: operId,
    });

    let res = await getCart(cartId, operId!);
    return res;
  }
  async createCostServices(data: IdataCreateCostServices) {
    const {
      cartId,

      arr: {
        cell,
        res: { nameOper, price, unitsOfCost },
        section,
      },
    } = data;
    let oper = await createOper(cartId, nameOper, cell, section);
    const operId = oper.id;
    const costService = cost_service.create({
      nameService: nameOper,
      price: +price,
      unitsOfCost,
      techOperationId: operId,
    });

    let res = await getCart(cartId, operId!);
    return res;
  }
  async createCostTransport(data: IdataCreateCostTransport) {
    const {
      cartId,

      arr: {
        cell,
        res: { nameOper, price, unitsOfCost },
        section,
      },
    } = data;
    let oper = await createOper(cartId, nameOper, cell, section);
    const operId = oper.id;
    const costTransport = cost_transport.create({
      nameTransport: nameOper,
      price: +price,
      unitsOfCost,
      techOperationId: operId,
    });

    let res = await getCart(cartId, operId!);
    return res;
  }

  async createCostMechanical(data: IdataCreateCostMechanical) {
    const {
      cartId,

      arr: {
        cell,
        res: { nameOper, fuelConsumption, workingSpeed, idTractor, idMachine },
        section,
      },
    } = data;
    let sum: number;
    const cart = await tech_cart.findOne({ where: { id: cartId } });
    const Tractor = await tractor.findOne({ where: { id: idTractor } });
    const machine = await agricultural_machine.findOne({
      where: { id: idMachine },
    });

    const operation = await tech_operation.create({
      techCartId: cartId,
      nameOperation: nameOper,
      cell,
      sectionId: section,
    });
    if (!machine || !Tractor || !cart || !operation) throw new Error("");
    const Aggregate = await aggregate.create({
      fuelConsumption: +fuelConsumption,
      workingSpeed: +workingSpeed,
      techOperationId: operation.id,
      tractorId: Tractor.id,
      agriculturalMachineId: machine.id,
    });

    let operId = operation.id;
    let res = await getCart(cartId, operId!);
    return res;
  }
  async createCostHandWork(data: IdataCreateCostHandWork) {
    const {
      cartId,

      arr: {
        cell,
        res: {
          nameOper,
          gradeId,
          productionRateAmount,
          productionRateTime,
          productionRateWeight,
          salaryPerShift,
          spending,
          type,
          unitOfMeasurement,
          yieldСapacity,
        },
        section,
      },
    } = data;
    const cart = await tech_cart.findOne({ where: { id: cartId } });
    const Grade = await grade.findOne({ where: { id: gradeId } });
    if (!Grade || !cart) throw new Error("");

    const oper = await tech_operation.create({
      nameOperation: nameOper,
      cell,
      techCartId: cartId,
      sectionId: section,
    });

    const handWork = await cost_hand_work.create({
      nameOper,
      productionPerShift: undefined,
      productionRateAmount,
      productionRateTime,
      productionRateWeight,
      salaryPerShift,
      spending,
      type,
      unitOfMeasurement,
      yieldСapacity,
      gradeId,
      techOperationId: oper.id,
    });

    const operId = oper.id!;
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostMaterials(data: IdataPatchCostMaterial) {
    const {
      cartId,

      arr: {
        cell,
        res: {
          operId,
          nameOper,
          consumptionPerHectare,
          price,
          unitsOfConsumption,
          unitsOfCost,
        },
      },
    } = data;

    const costMaterial = cost_material.update(
      {
        nameMaterials: nameOper,
        price,
        unitsOfCost,
        consumptionPerHectare: +consumptionPerHectare,
        unitsOfConsumption,
        techOperationId: operId,
      },
      { where: { techOperationId: operId } }
    );
    updateOper(nameOper, cell, operId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostService(data: IdataPatchCostServices) {
    const {
      cartId,

      arr: {
        cell,
        res: { operId, nameOper, price, unitsOfCost },
      },
    } = data;

    if (price === undefined || unitsOfCost === undefined) throw new Error("");
    const costService = cost_service.update(
      {
        nameService: nameOper,
        price: +price,
        unitsOfCost,
        techOperationId: operId,
      },
      { where: { techOperationId: operId } }
    );
    updateOper(nameOper, cell, operId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostTransport(data: IdataPatchCostTransport) {
    const {
      cartId,

      arr: {
        cell,
        res: { operId, nameOper, price, unitsOfCost },
      },
    } = data;
    if (price === undefined || unitsOfCost === undefined) throw new Error("");
    const costTransport = cost_transport.update(
      {
        nameTransport: nameOper,
        price: +price,
        unitsOfCost,
        techOperationId: operId,
      },
      { where: { techOperationId: operId } }
    );
    updateOper(nameOper, cell, operId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostMechanical(data: IdataPatchCostMachine) {
    const {
      cartId,

      arr: {
        cell,
        res: {
          operId,
          nameOper,
          fuelConsumption,
          idMachine,
          idTractor,
          workingSpeed,
        },
      },
    } = data;
    const Tractor = await tractor.findOne({ where: { id: idTractor } });
    const machine = await agricultural_machine.findOne({
      where: { id: idMachine },
    });
    const cart = await tech_cart.findOne({ where: { id: cartId } });
    if (!cart || !machine || !Tractor) throw new Error("");
    const costMechanical = await aggregate.update(
      {
        fuelConsumption: +fuelConsumption,
        workingSpeed: +workingSpeed,
        tractorId: idTractor,
        agriculturalMachineId: idMachine,
      },
      { where: { techOperationId: operId } }
    );
    updateOper(nameOper, cell, operId);

    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostHandWork(data: IdataPatchCostHandWork) {
    const {
      cartId,
      arr: {
        cell,
        res: {
          operId,
          nameOper,
          gradeId,
          type,
          yieldСapacity,
          productionRateAmount,
          productionRateTime,
          productionRateWeight,
          salaryPerShift,
          spending,
          unitOfMeasurement,
        },
      },
    } = data;
    await cost_hand_work.update(
      {
        nameOper,
        productionPerShift: undefined,
        productionRateAmount,
        productionRateTime,
        productionRateWeight,
        salaryPerShift,
        spending,
        type,
        unitOfMeasurement,
        yieldСapacity,
        gradeId,
      },
      { where: { techOperationId: operId } }
    );

    updateOper(nameOper, cell, operId);

    let res = await getCart(cartId, operId!);
    return res;
  }

  async deleteOper(data: { cartId: number; operId: number }) {
    const { cartId, operId } = data;

    const elem = await tech_operation.findOne({ where: { id: operId } });
    if (!elem) throw new Error("");
    await cost_material.destroy({
      where: { techOperationId: operId },
    });
    await cost_service.destroy({
      where: { techOperationId: operId },
    });
    await cost_transport.destroy({
      where: { techOperationId: operId },
    });
    await cost_service.destroy({
      where: { techOperationId: operId },
    });
    await aggregate.destroy({
      where: {
        techOperationId: operId,
      },
    });
    await cost_hand_work.destroy({
      where: { techOperationId: operId },
    });
    await tech_operation.destroy({
      where: { id: operId },
    });
    let res = await getCart(cartId, operId!);
    return res;
  }
  async getProps({ operId }: { operId: number }) {
    const oper = await tech_operation.findOne({ where: { id: operId } });
    if (!oper) throw new Error("");

    const cell: Icell = oper.cell;
    async function get(): Promise<prope[]> {
      if (cell == "costMaterials") {
        const costMaterials = await cost_material.findAll({
          where: { techOperationId: operId },
        });
        return costMaterials;
      } else if (cell == "costServices") {
        const costServices = await cost_service.findAll({
          where: { techOperationId: operId },
        });
        return costServices;
      } else if (cell == "costTransport") {
        const costTransport = await cost_transport.findAll({
          where: { techOperationId: operId },
        });
        return costTransport;
      } else if (cell == "costMechanical") {
        const costMechanical = await aggregate.findAll({
          where: { techOperationId: operId },
        });
        return costMechanical;
      } else if (cell == "costHandWork") {
        const costHandWork = await cost_hand_work.findAll({
          where: { techOperationId: operId },
        });
        return costHandWork;
      }
      throw new Error("");
    }

    return get();
  }
}
export default new OperService();
