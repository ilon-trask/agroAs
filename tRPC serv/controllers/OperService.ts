import {
  tech_cart,
  tractor,
  tech_operation,
  agricultural_machine,
  aggregate,
  cost_material,
  cost_service,
  cost_transport,
  grade,
  cost_hand_work,
  Itech_cart,
  Itech_operation,
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
  akk: number;
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
  akkum: number;
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
  price: number,
  consumptionPerHectare: number | undefined,
  cartId: number,
  nameOper: string,
  cell: Icell,
  section: number
) {
  return await tech_operation.create({
    techCartId: cartId,
    nameOperation: nameOper,
    cell,
    [cell]: +price * +(consumptionPerHectare || 1),
    sectionId: section,
  });
}
function techCartUpdate(sum: number, cartId: number) {
  tech_cart.update({ totalCost: sum || 0 }, { where: { id: cartId } });
}

function updateOper(
  price: number,
  consumptionPerHectare: number | undefined,
  unitsOfConsumption: string | undefined,
  unitsOfCost: string,
  nameOper: string,
  cell: Icell,
  operId: number
) {
  const techOperation = tech_operation.update(
    {
      nameOperation: nameOper,
      [cell]: price * (consumptionPerHectare || 1),
    },
    { where: { id: operId } }
  );
}
async function getOper(id: number) {
  const techOperation: tech_operation[] = await tech_operation.findAll({
    where: { techCartId: id },
  });

  //@ts-ignore
  techOperation.sort((a, b) => a.id - b.id);
  let props: prope[] = [];
  for (let i = 0; i < techOperation.length; i++) {
    let el = techOperation[i];
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
  async getOper(id: number) {
    const techOperation: tech_operation[] = await tech_operation.findAll({
      where: { techCartId: id },
    });
    //@ts-ignore
    techOperation.sort((a, b) => a.id - b.id);
    return techOperation;
  }

  async createCostMaterials(data: IdataCreateCostMaterials) {
    const {
      cartId,
      akk,
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
    const oper = await createOper(
      price,
      consumptionPerHectare,
      cartId,
      nameOper,
      cell,
      section
    );
    sum = akk + price * consumptionPerHectare;
    const operId = oper.id;
    cost_material.create({
      nameMaterials: nameOper,
      price,
      unitsOfCost,
      consumptionPerHectare,
      unitsOfConsumption,
      techOperationId: operId,
    });

    techCartUpdate(sum, cartId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async createCostServices(data: IdataCreateCostServices) {
    const {
      cartId,
      akk,
      arr: {
        cell,
        res: { nameOper, price, unitsOfCost },
        section,
      },
    } = data;
    let sum: number;
    let oper = await createOper(
      price,
      undefined,
      cartId,
      nameOper,
      cell,
      section
    );
    const operId = oper.id;
    sum = akk + price;
    const costService = cost_service.create({
      nameService: nameOper,
      price: +price,
      unitsOfCost,
      techOperationId: operId,
    });

    techCartUpdate(sum, cartId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async createCostTransport(data: IdataCreateCostTransport) {
    const {
      cartId,
      akk,
      arr: {
        cell,
        res: { nameOper, price, unitsOfCost },
        section,
      },
    } = data;
    let sum: number;
    let oper = await createOper(
      price,
      undefined,
      cartId,
      nameOper,
      cell,
      section
    );
    sum = akk + price;
    const operId = oper.id;
    const costTransport = cost_transport.create({
      nameTransport: nameOper,
      price: +price,
      unitsOfCost,
      techOperationId: operId,
    });

    techCartUpdate(sum, cartId);

    let res = await getCart(cartId, operId!);
    return res;
  }
  async creteCostMechanical(data: IdataCreateCostMechanical) {
    const {
      cartId,
      akk,
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
      costCars: 0,
      costFuel: 0,
      sectionId: section,
    });
    if (!machine || !Tractor || !cart || !operation) throw new Error("");
    const Aggregate = aggregate.create({
      amountOfTractorDepreciationPerHour: Math.round(
        +Tractor.marketCost / +Tractor.depreciationPeriod / 220 / 8
      ),
      fuelConsumption: +fuelConsumption,
      amountOfMachineDepreciationPerHour: Math.round(
        +machine.marketCost / +machine.depreciationPeriod / 220 / 8
      ),
      unitProductionAggregate: Math.round(
        (+machine.widthOfCapture * (+workingSpeed * 1000)) / 10000
      ),
      workingSpeed: +workingSpeed,
      techOperationId: operation.id,
      tractorId: Tractor.id,
      agriculturalMachineId: machine.id,
      pricePerHourServicePersonnel: Math.round(cart.salary / 176),
    });
    Aggregate.then(async (Aggregate) => {
      const aggregateData = await aggregate.findOne({
        where: { techOperationId: operation.id },
      });
      const gradeTractor = await grade.findOne({
        where: { id: Tractor.gradeId },
      });
      const gradeMachine = await grade.findOne({
        where: { id: machine.gradeId },
      });
      const costFuel = Math.round(
        (+fuelConsumption * +cart.priceDiesel) /
          +Aggregate.unitProductionAggregate
      );
      const costCars = Math.round(
        ((+Aggregate.amountOfTractorDepreciationPerHour +
          +Aggregate.amountOfMachineDepreciationPerHour) *
          1.05) /
          +Aggregate.unitProductionAggregate
      );
      const costMachineWork = Math.round(
        aggregateData?.pricePerHourServicePersonnel! *
          (Tractor.numberOfPersonnel ?? 0) *
          gradeTractor?.coefficient!
      );
      const costHandWork = Math.round(
        aggregateData?.pricePerHourServicePersonnel! *
          (machine.numberOfServicePersonnel ?? 0) *
          gradeMachine?.coefficient!
      );
      sum = akk + costCars + costFuel + costMachineWork + costHandWork;
      const oper = tech_operation.update(
        {
          techCartId: cartId,
          nameOperation: nameOper,
          cell,
          costCars: costCars,
          costFuel: costFuel,
          sectionId: section,
          costMachineWork,
          costHandWork,
        },
        { where: { id: operation.id } }
      );
      const operId = operation.id!;
      techCartUpdate(sum, cartId);

      let res = await getCart(cartId, operId!);
      return res;
    });
  }
  async createCostHandWork(data: IdataCreateCostHandWork) {
    const {
      cartId,
      akk,
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
      pricePerHourPersonnel: Math.round(cart?.salary / 176),
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
    let costHandWork;
    let sum: number;

    if (type == 1) {
      costHandWork = Math.round(
        handWork.pricePerHourPersonnel *
          handWork.productionRateTime! *
          Grade.coefficient
      );
      sum = akk + costHandWork;
    } else if (type == 2) {
      costHandWork = Math.round(
        handWork.pricePerHourPersonnel *
          (handWork.yieldСapacity! / handWork.productionRateWeight!) *
          Grade.coefficient
      );
      sum = akk + costHandWork;
    } else if (type == 3) {
      costHandWork = Math.round(
        handWork.pricePerHourPersonnel *
          (handWork.spending! / handWork.productionRateAmount!) *
          Grade.coefficient
      );
      sum = akk + costHandWork;
    }
    await tech_operation.update({ costHandWork }, { where: { id: oper.id } });
    // @ts-ignore
    techCartUpdate(sum, cartId);
    const operId = oper.id!;
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostMaterials(data: IdataPatchCostMaterial) {
    const {
      cartId,
      akkum,
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
    let sum: number;
    sum = akkum + price * consumptionPerHectare;
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
    updateOper(
      price,
      consumptionPerHectare,
      unitsOfConsumption,
      unitsOfCost,
      nameOper,
      cell,
      operId
    );
    techCartUpdate(sum, cartId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostService(data: IdataPatchCostServices) {
    const {
      cartId,
      akkum,
      arr: {
        cell,
        res: { operId, nameOper, price, unitsOfCost },
      },
    } = data;
    let sum: number;

    if (price === undefined || unitsOfCost === undefined) throw new Error("");
    sum = akkum + price;
    const costService = cost_service.update(
      {
        nameService: nameOper,
        price: +price,
        unitsOfCost,
        techOperationId: operId,
      },
      { where: { techOperationId: operId } }
    );
    updateOper(
      price,
      undefined,
      undefined,
      unitsOfCost,
      nameOper,
      cell,
      operId
    );
    techCartUpdate(sum, cartId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostTransport(data: IdataPatchCostTransport) {
    const {
      cartId,
      akkum,
      arr: {
        cell,
        res: { operId, nameOper, price, unitsOfCost },
      },
    } = data;
    let sum: number;
    if (price === undefined || unitsOfCost === undefined) throw new Error("");
    sum = akkum + price;
    const costTransport = cost_transport.update(
      {
        nameTransport: nameOper,
        price: +price,
        unitsOfCost,
        techOperationId: operId,
      },
      { where: { techOperationId: operId } }
    );
    updateOper(
      price,
      undefined,
      undefined,
      unitsOfCost,
      nameOper,
      cell,
      operId
    );
    techCartUpdate(sum, cartId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostMechanical(data: IdataPatchCostMachine) {
    const {
      cartId,
      akkum,
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
        amountOfTractorDepreciationPerHour: Math.round(
          +Tractor.marketCost / +Tractor.depreciationPeriod / 220 / 8
        ),
        fuelConsumption: +fuelConsumption,
        amountOfMachineDepreciationPerHour: Math.round(
          +machine.marketCost / +machine.depreciationPeriod / 220 / 8
        ),
        unitProductionAggregate: Math.round(
          (+machine.widthOfCapture * (+workingSpeed * 1000)) / 10000
        ),
        workingSpeed: +workingSpeed,
        tractorId: idTractor,
        agriculturalMachineId: idMachine,
        pricePerHourServicePersonnel: Math.round(cart.salary / 176),
      },
      { where: { techOperationId: operId } }
    );
    const Aggregate = await aggregate.findOne({
      where: { techOperationId: operId },
    });
    if (!Aggregate) throw new Error("");
    const aggregateData = await aggregate.findOne({
      where: { techOperationId: operId },
    });
    const gradeTractor = await grade.findOne({
      where: { id: Tractor.gradeId },
    });
    const gradeMachine = await grade.findOne({
      where: { id: machine.gradeId },
    });
    const costFuel = Math.round(
      (+fuelConsumption * +cart.priceDiesel) /
        +Aggregate.unitProductionAggregate
    );
    const costCars = Math.round(
      ((+Aggregate.amountOfTractorDepreciationPerHour +
        +Aggregate.amountOfMachineDepreciationPerHour) *
        1.05) /
        +Aggregate.unitProductionAggregate
    );
    const costMachineWork = Math.round(
      aggregateData?.pricePerHourServicePersonnel! *
        (Tractor.numberOfPersonnel ?? 0) *
        gradeTractor?.coefficient!
    );
    const costHandWork = Math.round(
      aggregateData?.pricePerHourServicePersonnel! *
        (machine.numberOfServicePersonnel ?? 0) *
        gradeMachine?.coefficient!
    );

    const sum = akkum + costCars + costFuel + costMachineWork + costHandWork;

    tech_operation.update(
      {
        techCartId: cartId,
        nameOperation: nameOper,
        costCars: costCars,
        costFuel: costFuel,
        costMachineWork,
        costHandWork,
      },
      { where: { id: operId } }
    );
    techCartUpdate(sum, cartId);
    let res = await getCart(cartId, operId!);
    return res;
  }
  async patchCostHandWork(data: IdataPatchCostHandWork) {
    const {
      cartId,
      akkum,
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
    const cart = await tech_cart.findOne({ where: { id: cartId } });
    const Grade = await grade.findOne({ where: { id: gradeId } });

    if (!Grade || !type || !cart) throw new Error("");
    await cost_hand_work.update(
      {
        nameOper,
        pricePerHourPersonnel: Math.round(cart?.salary / 176),
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
    const handWork = await cost_hand_work.findOne({
      where: { techOperationId: operId },
    });
    if (!handWork) throw new Error("");

    let costHandWork;
    let sum: number;
    if (type == 1) {
      costHandWork = Math.round(
        handWork.pricePerHourPersonnel *
          handWork.productionRateTime! *
          Grade.coefficient
      );
      sum = akkum + costHandWork;
    } else if (type == 2) {
      costHandWork = Math.round(
        handWork.pricePerHourPersonnel *
          (handWork.yieldСapacity! / handWork.productionRateWeight!) *
          Grade.coefficient
      );
      sum = akkum + costHandWork;
    } else if (type == 3) {
      costHandWork = Math.round(
        handWork.pricePerHourPersonnel *
          (handWork.spending! / handWork.productionRateAmount!) *
          Grade.coefficient
      );
      sum = akkum + costHandWork;
    }
    await tech_operation
      .update({ costHandWork }, { where: { id: operId } })
      .then(() => {
        techCartUpdate(sum, cartId);
      });
    let res = await getCart(cartId, operId!);
    return res;
  }

  async deleteOper(data: { cartId: number; operId: number; akk: number }) {
    const { cartId, operId, akk } = data;

    const elem = await tech_operation.findOne({ where: { id: operId } });
    if (!elem) throw new Error("");

    let sum =
      akk -
      (elem.costMaterials ||
        elem.costHandWork ||
        elem.costMaterials ||
        elem.costTransport ||
        elem.costServices ||
        (elem.costFuel || 0) +
          (elem.costCars || 0) +
          (elem.costHandWork || 0) +
          (elem.costMachineWork || 0) ||
        elem.costHandWork ||
        0);

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
    techCartUpdate(sum, cartId);
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
