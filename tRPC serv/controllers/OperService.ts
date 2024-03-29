import { Principal } from "..";
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
  Icost_material,
  Icost_service,
  Icost_transport,
  Icost_hand_work,
  Iaggregate,
  purpose_material,
} from "../models/models";
import redis, { REDIS_DEFAULT_EX } from "../redis";

import {
  cartsIncludes,
  changeCarts,
  resMater,
  resTechCartsWithOpers,
  resTechOperation,
} from "./TechCartService";

export type prope =
  | resMater
  | cost_service
  | cost_transport
  | aggregate
  | cost_hand_work;

export type prope2 =
  | resMater[]
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

export type Icell =
  | "costMaterials"
  | "costServices"
  | "costMechanical"
  | "costTransport"
  | "costHandWork";
// | "complex";

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
    date?: string | null | undefined;
    consumptionPerHectare: number;
    price: number;
    unitsOfConsumption: string;
    unitsOfCost: string;
    purposeMaterialId: number;
  }> {}

interface IdataCreateCostServices
  extends Idata<{
    nameOper: string;
    date?: string | null | undefined;
    price: number;
    unitsOfCost: string;
  }> {}
interface IdataCreateCostTransport
  extends Idata<{
    nameOper: string;
    date?: string | null | undefined;
    price: number;
    unitsOfCost: string;
  }> {}
interface IdataCreateCostMechanical
  extends Idata<{
    nameOper: string;
    date?: string | null | undefined;
    fuelConsumption: number;
    workingSpeed: number;
    idTractor: number;
    idMachine: number;
  }> {}
interface IdataCreateCostHandWork
  extends Idata<{
    nameOper: string;
    date?: string | null | undefined;
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
    date?: string | null | undefined;
    consumptionPerHectare: number;
    price: number;
    unitsOfConsumption: string;
    unitsOfCost: string;
    purposeMaterialId: number;
  }> {}
interface IdataPatchCostServices
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    date?: string | null | undefined;
    price: number;
    unitsOfCost: string;
  }> {}

interface IdataPatchCostTransport
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    date?: string | null | undefined;
    price: number;
    unitsOfCost: string;
  }> {}
interface IdataPatchCostMachine
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    date?: string | null | undefined;
    fuelConsumption: number;
    workingSpeed: number;
    idTractor: number;
    idMachine: number;
    salary?: number;
    priceDiesel?: number;
  }> {}

interface IdataPatchCostHandWork
  extends IdataPatch<{
    operId: number;
    nameOper: string;
    date?: string | null | undefined;
    gradeId: number;
    productionRateAmount?: number;
    productionRateTime?: number;
    productionRateWeight?: number;
    salaryPerShift?: number;
    spending?: number;
    type: number;
    unitOfMeasurement?: string;
    yieldСapacity: number;
    salary?: number;
  }> {}
export interface guestAggregate extends Iaggregate {
  salary: number;
  priceDiesel: number;
}
export interface guest_cost_hand_work extends Icost_hand_work {
  salary: number;
}
export const opeInclude = [
  cost_material,
  cost_service,
  cost_transport,
  cost_hand_work,
  { model: aggregate, include: [tractor, agricultural_machine] },
];
const getRedisCart = async (cartId: number) => {
  //@ts-ignore
  const redisCart = await redis.get(cartId);
  if (redisCart) {
    return JSON.parse(redisCart) as resTechCartsWithOpers;
  }
  const cart: Itech_cart | null = JSON.parse(
    JSON.stringify(
      await tech_cart.findOne({
        where: { id: cartId },
        include: cartsIncludes,
      })
    )
  );
  return (await changeCarts([cart]))[0];
};
async function changeRedisCart(cartId: number, oper: resTechOperation) {
  const cart: resTechCartsWithOpers | null = await getRedisCart(cartId);
  if (!cart?.tech_operations) return;
  cart.tech_operations = [
    ...cart.tech_operations?.filter((el) => el.id != oper.id),
    oper,
  ] //@ts-ignore
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const [
    costHectare,
    costMachineWork,
    costCars,
    costFuel,
    costHandWork,
    totalCostMaterials,
    totalCostServices,
    totalCostTransport,
  ] = (() => {
    let costHectare = 0,
      costMachineWork = 0,
      costCars = 0,
      costFuel = 0,
      costHandWork = 0,
      totalCostMaterials = 0,
      totalCostServices = 0,
      totalCostTransport = 0;

    for (let i = 0; i < cart.tech_operations.length; i++) {
      const el = cart.tech_operations[i];
      costHectare +=
        el.costMachineWork! + el.costCars! + el.costFuel! + el.costHandWork! ||
        el.costHandWork ||
        el.costServices ||
        el.costTransport ||
        el.costMaterials ||
        0;
      costMachineWork += el.costMachineWork || 0;
      costCars += el.costCars || 0;
      costFuel += el.costFuel || 0;
      costHandWork += el.costHandWork || 0;
      totalCostMaterials += el.costMaterials || 0;
      totalCostServices += el.costServices || 0;
      totalCostTransport += el.costTransport || 0;
    }
    return [
      costHectare,
      costMachineWork,
      costCars,
      costFuel,
      costHandWork,
      totalCostMaterials,
      totalCostServices,
      totalCostTransport,
    ];
  })();
  cart.costHectare = costHectare;
  cart.totalCostMachineWork = costMachineWork;
  cart.totalCostCars = costCars;
  cart.totalCostFuel = costFuel;
  cart.totalCostHandWork = costHandWork;
  cart.totalCostMaterials = totalCostMaterials;
  cart.totalCostServices = totalCostServices;
  cart.totalCostTransport = totalCostTransport;
  //@ts-ignore
  await redis.setex(cartId, REDIS_DEFAULT_EX, JSON.stringify(cart));
}
async function createOper(
  cartId: number,
  nameOper: string,
  cell: Icell,
  section: number,
  date: string | null | undefined
) {
  // console.log("date");
  // console.log(date);

  let Soper: Itech_operation = await tech_operation.create({
    techCartId: cartId,
    nameOperation: nameOper,
    cell,
    sectionId: section,
    date: date,
  });
  const oper: Itech_operation = JSON.parse(JSON.stringify(Soper));

  return oper;
}

export async function changeOper(
  e: resTechOperation,
  cartId: number,
  CostMaterials?: Icost_material | null,
  CostServices?: Icost_service | null,
  CostTransport?: Icost_transport | null,
  CostMechanical?: guestAggregate | null,
  CostHandWork?: guest_cost_hand_work | null
) {
  let elem: resTechOperation = JSON.parse(JSON.stringify(e));

  if (elem.cell == "costMaterials") {
    if (!CostMaterials) {
      let costMaterials = elem.cost_material;
      if (!costMaterials) return elem;

      elem.costMaterials = Math.round(
        costMaterials.price *
          //@ts-ignore
          (costMaterials.consumptionPerHectare || costMaterials.consumptionPer)
      );
      return elem;
    } else {
      elem.costMaterials = Math.round(
        CostMaterials.price * CostMaterials.consumptionPerHectare
      );
      return elem;
    }
  } else if (elem.cell == "costTransport") {
    if (!CostTransport) {
      let costTransport = elem.cost_transport;
      if (!costTransport) return elem;

      elem.costTransport = costTransport.price;
      return elem;
    } else {
      elem.costTransport = CostTransport.price;
      return elem;
    }
  } else if (elem.cell == "costServices") {
    if (!CostServices) {
      let costServices = elem.cost_service;
      if (!costServices) return elem;
      elem.costServices = costServices.price;
      return elem;
    } else {
      elem.costServices = CostServices.price;
      return elem;
    }
  } else if (elem.cell == "costMechanical") {
    if (!CostMechanical) {
      const aggregateData = elem.aggregate;
      if (aggregateData == null) throw new Error();

      const Tractor = aggregateData.tractor;
      const machine = aggregateData.agricultural_machine;

      const Grade = await grade.findAll();
      const cart = await tech_cart.findOne({
        where: { id: cartId },
      });

      if (Tractor == null || machine == null || cart == null || Grade == null)
        throw new Error("");
      const [gradeTractor] = Grade.filter((el) => el.id == Tractor.gradeId);
      const [gradeMachine] = Grade.filter((el) => el.id == machine.gradeId);
      const pricePerHourPersonnel = Math.round(cart?.salary / 176);
      const rareOfProduction =
        (machine.widthOfCapture * (aggregateData.workingSpeed * 1000)) / 10000;
      const mechHours = 1 / rareOfProduction;
      const costFuel = Math.round(
        (+aggregateData.fuelConsumption * +cart.priceDiesel) / rareOfProduction
      );
      const amountOfTractorDepreciationPerHour =
        +Tractor.marketCost / +Tractor.depreciationPeriod / 220 / 8;
      const amountOfMachineDepreciationPerHour =
        +machine.marketCost /
        //@ts-ignore
        (+machine.depreciationPeri || +machine.depreciationPeriod) /
        220 /
        8;
      //не знаю чого воно обрізає період це стається до JSON.parse
      const costCars = Math.round(
        ((amountOfTractorDepreciationPerHour +
          amountOfMachineDepreciationPerHour) *
          1.05) /
          rareOfProduction
      );

      const costMachineWork = Math.round(
        (pricePerHourPersonnel / rareOfProduction) *
          (Tractor.numberOfPersonnel ?? 0) *
          gradeTractor?.coefficient!
      );

      const costHandWork = Math.round(
        (pricePerHourPersonnel / rareOfProduction) *
          //@ts-ignore
          ((machine.numberOfServiceP || machine.numberOfServicePersonnel) ??
            0) *
          gradeMachine?.coefficient!
      );

      elem.costMachineWork = costMachineWork;
      elem.costCars = costCars;
      elem.costFuel = costFuel;
      elem.costHandWork = costHandWork;
      //@ts-ignore
      elem.aggregate.amountOfMachineDepreciationPerHour =
        amountOfMachineDepreciationPerHour;
      //@ts-ignore
      elem.aggregate.amountOfTractorDepreciationPerHour =
        amountOfTractorDepreciationPerHour;
      //@ts-ignore
      elem.aggregate.mechHours = mechHours;
      return elem;
    } else {
      const Tractor = await tractor.findOne({
        where: { id: CostMechanical.tractorId },
      });
      const machine = await agricultural_machine.findOne({
        where: { id: CostMechanical.agriculturalMachineId },
      });
      const Grade = await grade.findAll();
      if (Tractor == null || machine == null || Grade == null)
        throw new Error("");

      const [gradeTractor] = Grade.filter((el) => el.id == Tractor.gradeId);
      const [gradeMachine] = Grade.filter((el) => el.id == machine.gradeId);
      const pricePerHourPersonnel = Math.round(CostMechanical?.salary / 176);
      const rareOfProduction =
        (machine.widthOfCapture * (CostMechanical.workingSpeed * 1000)) / 10000;
      const mechHours = 1 / rareOfProduction;
      const costFuel = Math.round(
        (+CostMechanical.fuelConsumption * +CostMechanical.priceDiesel) /
          rareOfProduction
      );
      const amountOfTractorDepreciationPerHour =
        +Tractor.marketCost / +Tractor.depreciationPeriod / 220 / 8;
      const amountOfMachineDepreciationPerHour =
        +machine.marketCost / +machine.depreciationPeriod / 220 / 8;
      const costCars = Math.round(
        ((amountOfTractorDepreciationPerHour +
          amountOfMachineDepreciationPerHour) *
          1.05) /
          rareOfProduction
      );
      const costMachineWork = Math.round(
        (pricePerHourPersonnel / rareOfProduction) *
          (Tractor.numberOfPersonnel ?? 0) *
          gradeTractor?.coefficient!
      );
      const costHandWork = Math.round(
        (pricePerHourPersonnel / rareOfProduction) *
          (machine.numberOfServicePersonnel ?? 0) *
          gradeMachine?.coefficient!
      );

      elem.costMachineWork = costMachineWork;
      elem.costCars = costCars;
      elem.costFuel = costFuel;
      elem.costHandWork = costHandWork;
      //@ts-ignore
      elem.aggregate.amountOfMachineDepreciationPerHour =
        amountOfMachineDepreciationPerHour;
      //@ts-ignore
      elem.aggregate.amountOfTractorDepreciationPerHour =
        amountOfTractorDepreciationPerHour;
      //@ts-ignore
      elem.aggregate.mechHours = mechHours;
      return elem;
    }
  } else if (elem.cell == "costHandWork") {
    if (!CostHandWork) {
      const handWork = elem.cost_hand_work;
      let costHandWork;
      if (!handWork) throw new Error();
      const Grade = await grade.findOne({ where: { id: handWork.gradeId } });
      const cart = await tech_cart.findOne({ where: { id: cartId } });
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
      console.log(handWork.productionRateAmount);

      elem.costHandWork = costHandWork;
      return elem;
    } else {
      let costHandWork;
      const Grade = await grade.findOne({
        where: { id: CostHandWork.gradeId },
      });
      if (!Grade) throw new Error("нема  типу роботи");

      const pricePerHourPersonnel = Math.round(CostHandWork.salary / 176);

      if (CostHandWork.type == 1) {
        costHandWork = Math.round(
          (pricePerHourPersonnel / CostHandWork.productionRateTime!) *
            Grade.coefficient *
            10000
        );
      } else if (CostHandWork.type == 2) {
        costHandWork = Math.round(
          pricePerHourPersonnel *
            (CostHandWork.yieldСapacity! / CostHandWork.productionRateWeight!) *
            Grade.coefficient
        );
      } else if (CostHandWork.type == 3) {
        costHandWork = Math.round(
          pricePerHourPersonnel *
            (CostHandWork.spending! / CostHandWork.productionRateAmount!) *
            Grade.coefficient
        );
      }
      console.log(CostHandWork.type);
      console.log(costHandWork);
      console.log(
        CostHandWork.productionRateTime!
        // *
        // Grade.coefficient *
        // 10000
      );

      elem.costHandWork = costHandWork;
      return elem;
    }
  } else {
    return elem;
  }
}

async function updateOper(
  nameOper: string,
  cell: Icell,
  operId: number,
  date: string | null | undefined
) {
  const techOperation = await tech_operation.update(
    {
      nameOperation: nameOper,
      cell,
      date,
    },
    { where: { id: operId } }
  );

  let oper: resTechOperation | undefined | null = await tech_operation.findOne({
    where: { id: operId },
    include: [
      { model: cost_material, include: [purpose_material] },
      cost_service,
      cost_transport,
      cost_hand_work,
      { model: aggregate, include: [tractor, agricultural_machine] },
    ],
  });

  oper = await changeOper(oper!, oper?.techCartId!);
  return oper;
}

class OperService {
  async createCostMaterials(data: IdataCreateCostMaterials) {
    const {
      cartId,
      arr: {
        cell,
        res: {
          nameOper,
          date,
          consumptionPerHectare,
          price,
          unitsOfConsumption,
          unitsOfCost,
          purposeMaterialId,
        },
        section,
      },
    } = data;

    const oper = await createOper(cartId, nameOper, cell, section, date);
    const operId = oper.id;

    const costMaterialPre = await cost_material.create({
      nameMaterials: nameOper,
      price,
      unitsOfCost,
      consumptionPerHectare,
      unitsOfConsumption,
      techOperationId: operId,
      purposeMaterialId,
    });
    //@ts-ignore
    const costMaterial: resMater = await cost_material.findOne({
      where: { id: costMaterialPre.id },
      include: purpose_material,
    });
    const cart: Itech_cart | null = JSON.parse(
      JSON.stringify(await tech_cart.findOne({ where: { id: cartId } }))
    );

    tech_cart.update(
      {
        costHectare:
          cart?.costHectare! +
          costMaterial.price * costMaterial.consumptionPerHectare,
        totalCostMaterials:
          cart?.totalCostMaterials! +
          costMaterial.price * costMaterial.consumptionPerHectare,
      },
      { where: { id: cartId } }
    );
    oper.costMaterials =
      costMaterial.price * costMaterial.consumptionPerHectare;
    const redisCart = await getRedisCart(cartId);
    if (redisCart)
      await redis.setex(
        //@ts-ignore
        cart.id!,
        REDIS_DEFAULT_EX,
        JSON.stringify({
          ...cart,
          tech_operation: [
            ...(redisCart.tech_operations || []),
            { ...oper, cost_material: costMaterial },
          ],
          costHectare:
            cart?.costHectare! +
            costMaterial.price * costMaterial.consumptionPerHectare,
          totalCostMaterials:
            cart?.totalCostMaterials! +
            costMaterial.price * costMaterial.consumptionPerHectare,
        })
      );
    return { oper, prope: costMaterial };
  }
  async createCostServices(data: IdataCreateCostServices) {
    const {
      cartId,

      arr: {
        cell,
        res: { nameOper, date, price, unitsOfCost },
        section,
      },
    } = data;
    let oper = await createOper(cartId, nameOper, cell, section, date);
    const operId = oper.id;
    const costService = await cost_service.create({
      nameService: nameOper,
      price,
      unitsOfCost,
      techOperationId: operId,
    });
    const cart: Itech_cart | null = JSON.parse(
      JSON.stringify(await tech_cart.findOne({ where: { id: cartId } }))
    );
    tech_cart.update(
      {
        costHectare: cart?.costHectare! + costService.price,
        totalCostServices: cart?.totalCostServices! + costService.price,
      },
      { where: { id: cartId } }
    );
    oper.costServices = costService.price;
    const redisCart = await getRedisCart(cartId);
    if (redisCart)
      await redis.setex(
        //@ts-ignore
        cart.id!,
        REDIS_DEFAULT_EX,
        JSON.stringify({
          ...cart,
          tech_operation: [
            ...(redisCart.tech_operations || []),
            { ...oper, cost_service: costService },
          ],
          costHectare: cart?.costHectare! + costService.price,
          totalCostServices: cart?.totalCostServices! + costService.price,
        })
      );
    return { oper, prope: costService };
  }
  async createCostTransport(data: IdataCreateCostTransport) {
    const {
      cartId,
      arr: {
        cell,
        res: { nameOper, date, price, unitsOfCost },
        section,
      },
    } = data;
    let oper = await createOper(cartId, nameOper, cell, section, date);
    const operId = oper.id;
    const costTransport = await cost_transport.create({
      nameTransport: nameOper,
      price: +price,
      unitsOfCost,
      techOperationId: operId,
    });
    const cart: Itech_cart | null = JSON.parse(
      JSON.stringify(await tech_cart.findOne({ where: { id: cartId } }))
    );
    tech_cart.update(
      {
        costHectare: cart?.costHectare! + costTransport.price,
        totalCostTransport: cart?.totalCostTransport! + costTransport.price,
      },
      { where: { id: cartId } }
    );
    oper.costTransport = costTransport.price;
    const redisCart = await getRedisCart(cartId);
    if (redisCart)
      await redis.setex(
        //@ts-ignore
        cart.id!,
        REDIS_DEFAULT_EX,
        JSON.stringify({
          ...cart,
          tech_operation: [
            ...(redisCart.tech_operations || []),
            { ...oper, cost_transport: costTransport },
          ],
          costHectare: cart?.costHectare! + costTransport.price,
          totalCostTransport: cart?.totalCostTransport! + costTransport.price,
        })
      );
    return { oper, prope: costTransport };
  }
  async createCostMechanical(data: IdataCreateCostMechanical) {
    const {
      cartId,

      arr: {
        cell,
        res: {
          nameOper,
          date,
          fuelConsumption,
          workingSpeed,
          idTractor,
          idMachine,
        },
        section,
      },
    } = data;
    let sum: number;
    const cart: Itech_cart | null = JSON.parse(
      JSON.stringify(await tech_cart.findOne({ where: { id: cartId } }))
    );
    const Tractor = await tractor.findOne({ where: { id: idTractor } });
    const machine = await agricultural_machine.findOne({
      where: { id: idMachine },
    });

    let oper = await createOper(cartId, nameOper, cell, section, date);
    if (!machine || !Tractor || !cart || !oper) throw new Error("");
    const Aggregate = await aggregate.create({
      fuelConsumption: +fuelConsumption,
      workingSpeed: +workingSpeed,
      techOperationId: oper.id,
      tractorId: Tractor.id,
      agriculturalMachineId: machine.id,
    });
    const Grade = await grade.findAll();
    if (Grade == null) throw new Error("");
    const [gradeTractor] = Grade.filter((el) => el.id == Tractor.gradeId);
    const [gradeMachine] = Grade.filter((el) => el.id == machine.gradeId);
    const pricePerHourPersonnel = Math.round(cart?.salary / 176);
    const costFuel = Math.round(
      (+Aggregate.fuelConsumption * +cart.priceDiesel) /
        Math.round(
          (+machine.widthOfCapture * (+Aggregate.workingSpeed * 1000)) / 10000
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
          (+machine.widthOfCapture * (+Aggregate.workingSpeed * 1000)) / 10000
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
    tech_cart.update(
      {
        costHectare:
          cart.costHectare! +
          costMachineWork +
          costCars +
          costFuel +
          costHandWork,
        totalCostCars: cart.totalCostCars! + costCars,
        totalCostFuel: cart.totalCostFuel! + costFuel,
        totalCostHandWork: cart.totalCostHandWork! + costHandWork,
        totalCostMachineWork: cart.totalCostMachineWork! + costMachineWork,
      },
      { where: { id: cartId } }
    );
    oper.costMachineWork = costMachineWork;
    oper.costCars = costCars;
    oper.costFuel = costFuel;
    oper.costHandWork = costHandWork;
    const redisCart = await getRedisCart(cartId);
    if (redisCart)
      await redis.setex(
        //@ts-ignore
        cart.id!,
        REDIS_DEFAULT_EX,
        JSON.stringify({
          ...cart,
          tech_operation: [
            ...(redisCart.tech_operations || []),
            { ...oper, aggregate: Aggregate },
          ],
          costHectare:
            cart.costHectare! +
            costMachineWork +
            costCars +
            costFuel +
            costHandWork,
          totalCostCars: cart.totalCostCars! + costCars,
          totalCostFuel: cart.totalCostFuel! + costFuel,
          totalCostHandWork: cart.totalCostHandWork! + costHandWork,
          totalCostMachineWork: cart.totalCostMachineWork! + costMachineWork,
        })
      );
    return { oper, prope: Aggregate };
  }
  async createCostHandWork(data: IdataCreateCostHandWork) {
    const {
      cartId,

      arr: {
        cell,
        res: {
          nameOper,
          date,
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
    const cart: Itech_cart | null = JSON.parse(
      JSON.stringify(await tech_cart.findOne({ where: { id: cartId } }))
    );
    const Grade = await grade.findOne({ where: { id: gradeId } });
    if (!Grade || !cart) throw new Error("");

    let oper = await createOper(cartId, nameOper, cell, section, date);

    const costHandWork = await cost_hand_work.create({
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

    let cost = 0;
    const pricePerHourPersonnel = Math.round(cart.salary / 176);

    if (costHandWork.type == 1) {
      cost = Math.round(
        (pricePerHourPersonnel / costHandWork.productionRateTime!) *
          Grade.coefficient *
          10000
      );
    } else if (costHandWork.type == 2) {
      cost = Math.round(
        pricePerHourPersonnel *
          (costHandWork.yieldСapacity! / costHandWork.productionRateWeight!) *
          Grade.coefficient
      );
    } else if (costHandWork.type == 3) {
      cost = Math.round(
        pricePerHourPersonnel *
          (costHandWork.spending! / costHandWork.productionRateAmount!) *
          Grade.coefficient
      );
    }
    tech_cart.update(
      {
        costHectare: cart.costHectare! + cost,
        totalCostHandWork: cart.totalCostHandWork! + cost,
      },
      { where: { id: cartId } }
    );
    oper.costHandWork = cost;
    const redisCart = await getRedisCart(cartId);
    if (redisCart)
      await redis.setex(
        //@ts-ignore
        cart.id!,
        REDIS_DEFAULT_EX,
        JSON.stringify({
          ...cart,
          tech_operation: [
            ...(redisCart.tech_operations || []),
            { ...oper, cost_hand_work: costHandWork },
          ],
          costHectare: cart.costHectare! + cost,
          totalCostHandWork: cart.totalCostHandWork! + cost,
        })
      );
    return { oper, prope: costHandWork };
  }
  async patchCostMaterials(
    data: IdataPatchCostMaterial,
    user: Principal | undefined
  ) {
    const {
      cartId,
      arr: {
        cell,
        res: {
          operId,
          nameOper,
          date,
          consumptionPerHectare,
          price,
          unitsOfConsumption,
          unitsOfCost,
          purposeMaterialId,
        },
      },
    } = data;
    let oper;
    if (!user) {
      let Oper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));
      const CostMaterials: Icost_material = {
        nameMaterials: "",
        consumptionPerHectare: consumptionPerHectare,
        price: price,
        unitsOfConsumption: unitsOfConsumption,
        unitsOfCost: unitsOfCost,
        techOperationId: purposeMaterialId,
      };

      (oper.cost_material.consumptionPerHectare = consumptionPerHectare),
        (oper.cost_material.price = price),
        (oper.cost_material.unitsOfConsumption = unitsOfConsumption),
        (oper.cost_material.unitsOfCost = unitsOfCost),
        (oper.cost_material.purposeMaterialId = purposeMaterialId),
        (oper.nameOperation = nameOper),
        (oper = await changeOper(oper, oper.techCartId!, CostMaterials));
    } else {
      //@ts-ignore
      let inOper: resTechOperation | null | undefined =
        await tech_operation.findOne({
          where: { id: operId },
          include: [
            cost_material,
            cost_service,
            cost_transport,
            cost_hand_work,
            { model: aggregate, include: [tractor, agricultural_machine] },
          ],
        });
      let cart: Itech_cart = JSON.parse(
        JSON.stringify(
          await tech_cart.findOne({ where: { id: inOper?.techCartId } })
        )
      );
      let operCalc = await changeOper(inOper!, inOper?.techCartId!);
      let costHectare = cart.costHectare!;
      if (operCalc) {
        costHectare -=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;
      }
      const costMaterial = await cost_material.update(
        {
          nameMaterials: nameOper,
          price,
          unitsOfCost,
          consumptionPerHectare: +consumptionPerHectare,
          unitsOfConsumption,
          techOperationId: operId,
          purposeMaterialId: purposeMaterialId,
        },
        { where: { techOperationId: operId } }
      );
      inOper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      operCalc = await changeOper(inOper!, inOper?.techCartId!);
      if (operCalc) {
        costHectare +=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;

        tech_cart.update(
          { costHectare },
          { where: { id: inOper?.techCartId } }
        );
      }
      oper = await updateOper(nameOper, cell, operId, date);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
    changeRedisCart(oper?.techCartId!, oper!);
    return oper;
  }
  async patchCostService(
    data: IdataPatchCostServices,
    user: Principal | undefined
  ) {
    const {
      cartId,
      arr: {
        cell,
        res: { operId, nameOper, date, price, unitsOfCost },
      },
    } = data;

    if (price === undefined || unitsOfCost === undefined) throw new Error("");
    let oper;
    if (!user) {
      let Oper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));
      const CostService: Icost_service = {
        nameService: "",
        price: price,
        unitsOfCost: unitsOfCost,
      };

      (oper.cost_service.price = price),
        (oper.cost_service.unitsOfCost = unitsOfCost),
        (oper.nameOperation = nameOper),
        (oper = await changeOper(
          oper,
          oper.techCartId!,
          undefined,
          CostService
        ));
    } else {
      //@ts-ignore
      let inOper: resTechOperation | null | undefined =
        await tech_operation.findOne({
          where: { id: operId },
          include: [
            cost_material,
            cost_service,
            cost_transport,
            cost_hand_work,
            { model: aggregate, include: [tractor, agricultural_machine] },
          ],
        });
      let cart: Itech_cart = JSON.parse(
        JSON.stringify(
          await tech_cart.findOne({ where: { id: inOper?.techCartId } })
        )
      );
      let operCalc = await changeOper(inOper!, inOper?.techCartId!);
      let costHectare = cart.costHectare!;
      if (operCalc) {
        costHectare -=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;
      }
      const costService = await cost_service.update(
        {
          nameService: nameOper,
          price: +price,
          unitsOfCost,
          techOperationId: operId,
        },
        { where: { techOperationId: operId } }
      );
      inOper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      operCalc = await changeOper(inOper!, inOper?.techCartId!);
      if (operCalc) {
        costHectare +=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;

        tech_cart.update(
          { costHectare },
          { where: { id: inOper?.techCartId } }
        );
      }
      oper = await updateOper(nameOper, cell, operId, date);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
    changeRedisCart(oper?.techCartId!, oper!);
    return oper;
  }
  async patchCostTransport(
    data: IdataPatchCostTransport,
    user: Principal | undefined
  ) {
    const {
      cartId,
      arr: {
        cell,
        res: { operId, nameOper, date, price, unitsOfCost },
      },
    } = data;
    if (price === undefined || unitsOfCost === undefined) throw new Error("");
    let oper;
    if (!user) {
      let Oper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));
      const CostTransport: Icost_transport = {
        nameTransport: "",
        price: price,
        unitsOfCost: unitsOfCost,
      };

      (oper.cost_transport.price = price),
        (oper.cost_transport.unitsOfCost = unitsOfCost),
        (oper.nameOperation = nameOper),
        (oper = await changeOper(
          oper,
          oper.techCartId!,
          undefined,
          undefined,
          CostTransport
        ));
    } else {
      //@ts-ignore
      let inOper: resTechOperation | null | undefined =
        await tech_operation.findOne({
          where: { id: operId },
          include: [
            cost_material,
            cost_service,
            cost_transport,
            cost_hand_work,
            { model: aggregate, include: [tractor, agricultural_machine] },
          ],
        });
      let cart: Itech_cart = JSON.parse(
        JSON.stringify(
          await tech_cart.findOne({ where: { id: inOper?.techCartId } })
        )
      );
      let operCalc = await changeOper(inOper!, inOper?.techCartId!);
      let costHectare = cart.costHectare!;
      if (operCalc) {
        costHectare -=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;
      }
      const costTransport = await cost_transport.update(
        {
          nameTransport: nameOper,
          price: +price,
          unitsOfCost,
          techOperationId: operId,
        },
        { where: { techOperationId: operId } }
      );
      inOper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      operCalc = await changeOper(inOper!, inOper?.techCartId!);
      if (operCalc) {
        costHectare +=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;

        tech_cart.update(
          { costHectare },
          { where: { id: inOper?.techCartId } }
        );
      }
      oper = await updateOper(nameOper, cell, operId, date);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
    changeRedisCart(oper?.techCartId!, oper!);
    return oper;
  }
  async patchCostMechanical(
    data: IdataPatchCostMachine,
    user: Principal | undefined
  ) {
    const {
      cartId,
      arr: {
        cell,
        res: {
          operId,
          nameOper,
          date,
          fuelConsumption,
          idMachine,
          idTractor,
          workingSpeed,
          salary,
          priceDiesel,
        },
      },
    } = data;
    let oper;
    if (!user) {
      let Oper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));

      const costMechanical: guestAggregate = {
        fuelConsumption: fuelConsumption,
        workingSpeed: workingSpeed,
        tractorId: idTractor,
        agriculturalMachineId: idMachine,
        salary: salary!,
        priceDiesel: priceDiesel!,
      };

      (oper.aggregate.fuelConsumption = fuelConsumption),
        (oper.aggregate.tractor.fuelConsumption = fuelConsumption),
        (oper.aggregate.workingSpeed = workingSpeed),
        (oper.aggregate.agricultural_machine.workingSpeed = workingSpeed),
        (oper.aggregate.tractorId = idTractor),
        (oper.aggregate.agriculturalMachineId = idMachine),
        (oper.nameOperation = nameOper),
        (oper = await changeOper(
          oper,
          oper.techCartId!,
          undefined,
          undefined,
          undefined,
          costMechanical
        ));
    } else {
      //@ts-ignore
      let inOper: resTechOperation | null | undefined =
        await tech_operation.findOne({
          where: { id: operId },
          include: [
            cost_material,
            cost_service,
            cost_transport,
            cost_hand_work,
            { model: aggregate, include: [tractor, agricultural_machine] },
          ],
        });

      let InCart: Itech_cart = JSON.parse(
        JSON.stringify(
          await tech_cart.findOne({ where: { id: inOper?.techCartId } })
        )
      );
      let operCalc = await changeOper(inOper!, inOper?.techCartId!);
      let costHectare = InCart.costHectare!;
      if (operCalc) {
        costHectare -=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;
      }
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
      inOper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      operCalc = await changeOper(inOper!, inOper?.techCartId!);
      if (operCalc) {
        costHectare +=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;

        tech_cart.update(
          { costHectare },
          { where: { id: inOper?.techCartId } }
        );
      }
      oper = await updateOper(nameOper, cell, operId, date);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
    changeRedisCart(oper?.techCartId!, oper!);
    return oper;
  }
  async patchCostHandWork(
    data: IdataPatchCostHandWork,
    user: Principal | undefined
  ) {
    const {
      cartId,
      arr: {
        cell,
        res: {
          operId,
          nameOper,
          date,
          gradeId,
          type,
          yieldСapacity,
          productionRateAmount,
          productionRateTime,
          productionRateWeight,
          salaryPerShift,
          spending,
          unitOfMeasurement,
          salary,
        },
      },
    } = data;
    let oper;

    if (!user) {
      let Oper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          aggregate,
        ],
      });

      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));
      oper = await updateOper(nameOper, cell, operId, date);
      if (!oper) return;
      const CostHandWork: guest_cost_hand_work = {
        nameOper: "",
        type: type,
        productionRateTime: productionRateTime,
        yieldСapacity: yieldСapacity,
        productionRateWeight: productionRateWeight,
        spending: spending,
        productionRateAmount: productionRateAmount,
        gradeId: gradeId,
        salary: salary!,
      };
      if (!oper.cost_hand_work) return;

      oper.cost_hand_work.type = type;
      oper.cost_hand_work.productionRateTime = productionRateTime;
      oper.cost_hand_work.yieldСapacity = yieldСapacity;
      oper.cost_hand_work.productionRateWeight = productionRateWeight;
      oper.cost_hand_work.spending = spending;
      oper.cost_hand_work.productionRateAmount = productionRateAmount;

      oper = await changeOper(
        oper,
        oper.techCartId!,
        undefined,
        undefined,
        undefined,
        undefined,
        CostHandWork
      );
    } else {
      //@ts-ignore
      let inOper: resTechOperation | null | undefined =
        await tech_operation.findOne({
          where: { id: operId },
          include: [
            cost_material,
            cost_service,
            cost_transport,
            cost_hand_work,
            { model: aggregate, include: [tractor, agricultural_machine] },
          ],
        });
      let cart: Itech_cart = JSON.parse(
        JSON.stringify(
          await tech_cart.findOne({ where: { id: inOper?.techCartId } })
        )
      );
      let operCalc = await changeOper(inOper!, inOper?.techCartId!);
      let costHectare = cart.costHectare!;
      if (operCalc) {
        costHectare -=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;
      }
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
      inOper = await tech_operation.findOne({
        where: { id: operId },
        include: [
          cost_material,
          cost_service,
          cost_transport,
          cost_hand_work,
          { model: aggregate, include: [tractor, agricultural_machine] },
        ],
      });
      operCalc = await changeOper(inOper!, inOper?.techCartId!);
      if (operCalc) {
        costHectare +=
          operCalc.costMachineWork! +
            operCalc.costCars! +
            operCalc.costFuel! +
            operCalc.costHandWork! ||
          operCalc.costHandWork ||
          operCalc.costServices ||
          operCalc.costTransport ||
          operCalc.costMaterials ||
          0;
        tech_cart.update(
          { costHectare },
          { where: { id: inOper?.techCartId } }
        );
      }
      oper = await updateOper(nameOper, cell, operId, date);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
    changeRedisCart(oper?.techCartId!, oper!);
    return oper;
  }

  async deleteOper(data: { cartId: number; operId: number }) {
    const { cartId, operId } = data;

    let elem: resTechOperation | null = await tech_operation.findOne({
      where: { id: operId },
      include: [
        cost_material,
        cost_service,
        cost_transport,
        cost_hand_work,
        { model: aggregate, include: [tractor, agricultural_machine] },
      ],
    });
    if (!elem) throw new Error("Немає операції при видаленні");

    elem = await changeOper(elem, elem.techCartId!);
    if (!elem) throw new Error("Немає операції при видаленні після");

    const cart: Itech_cart | null = JSON.parse(
      JSON.stringify(await tech_cart.findOne({ where: { id: cartId } }))
    );
    tech_cart.update(
      {
        costHectare:
          cart?.costHectare! -
          (elem.costMachineWork! +
            elem.costCars! +
            elem.costFuel! +
            elem.costHandWork! ||
            elem.costHandWork ||
            elem.costServices ||
            elem.costTransport ||
            elem.costMaterials ||
            0),
        totalCostCars: cart?.totalCostCars! - (elem.costCars || 0)!,
        totalCostFuel: cart?.totalCostFuel! - (elem.costFuel || 0)!,
        totalCostHandWork: cart?.totalCostHandWork! - (elem.costHandWork || 0)!,
        totalCostMachineWork:
          cart?.totalCostMachineWork! - (elem.costMachineWork || 0)!,
        totalCostMaterials:
          cart?.totalCostMaterials! - (elem.costMaterials || 0)!,
        totalCostServices: cart?.totalCostServices! - (elem.costServices || 0)!,
        totalCostTransport:
          cart?.totalCostTransport! - (elem.costTransport || 0)!,
      },
      { where: { id: cartId } }
    );
    const redisCart = await getRedisCart(cartId);
    if (redisCart)
      redis.setex(
        //@ts-ignore
        cart.id!,
        REDIS_DEFAULT_EX,
        JSON.stringify({
          ...cart,
          CostHectare:
            cart?.costHectare! -
            (elem.costMachineWork! +
              elem.costCars! +
              elem.costFuel! +
              elem.costHandWork! ||
              elem.costHandWork ||
              elem.costServices ||
              elem.costTransport ||
              elem.costMaterials ||
              0),
          totalCostCars: cart?.totalCostCars! - (elem.costCars || 0)!,
          totalCostFuel: cart?.totalCostFuel! - (elem.costFuel || 0)!,
          totalCostHandWork:
            cart?.totalCostHandWork! - (elem.costHandWork || 0)!,
          totalCostMachineWork:
            cart?.totalCostMachineWork! - (elem.costMachineWork || 0)!,
          totalCostMaterials:
            cart?.totalCostMaterials! - (elem.costMaterials || 0)!,
          totalCostServices:
            cart?.totalCostServices! - (elem.costServices || 0)!,
          totalCostTransport:
            cart?.totalCostTransport! - (elem.costTransport || 0)!,
          tech_operation: redisCart.tech_operations?.filter(
            (el) => el.id != elem?.id!
          ),
        })
      );
    if (elem.cell == "costHandWork") {
      await cost_hand_work.destroy({ where: { techOperationId: elem.id } });
    } else if (elem.cell == "costMaterials") {
      await cost_material.destroy({ where: { techOperationId: elem.id } });
    } else if (elem.cell == "costMechanical") {
      await aggregate.destroy({ where: { techOperationId: elem.id } });
    } else if (elem.cell == "costServices") {
      await cost_service.destroy({ where: { techOperationId: elem.id } });
    } else if (elem.cell == "costTransport") {
      await cost_transport.destroy({ where: { techOperationId: elem.id } });
    }
    await tech_operation.destroy({ where: { id: operId } });
    return elem;
  }
  async getProps({ operId }: { operId: number }) {
    const oper = await tech_operation.findOne({ where: { id: operId } });
    if (!oper) throw new Error("");

    const cell: Icell = oper.cell;
    async function get(): Promise<prope[]> {
      if (cell == "costMaterials") {
        //@ts-ignore
        const costMaterials: resMater[] = await cost_material.findAll({
          where: { techOperationId: operId },
          include: purpose_material,
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
  async getPurposesMaterial() {
    const purposes = await purpose_material.findAll();
    return purposes;
  }
}
export default new OperService();
