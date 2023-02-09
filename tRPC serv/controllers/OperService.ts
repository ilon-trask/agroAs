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
} from "../models/models";

import { getCart, resTechOperation } from "./TechCartService";

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
    salary?: number;
    priceDiesel?: number;
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
    salary?: number;
  }> {}
interface guestAggregate extends Iaggregate {
  salary: number;
  priceDiesel: number;
}
interface guest_cost_hand_work extends Icost_hand_work {
  salary: number;
}
async function createOper(
  cartId: number,
  nameOper: string,
  cell: Icell,
  section: number
) {
  let Soper: Itech_operation = await tech_operation.create({
    techCartId: cartId,
    nameOperation: nameOper,
    cell,
    sectionId: section,
  });
  const oper = JSON.parse(JSON.stringify(Soper));
  return oper;
}

async function changeOper(
  e: Itech_operation | resTechOperation,
  cartId: number,
  CostMaterials?: Icost_material,
  CostServices?: Icost_service,
  CostTransport?: Icost_transport,
  CostMechanical?: guestAggregate,
  CostHandWork?: guest_cost_hand_work
) {
  let elem = JSON.parse(JSON.stringify(e));
  if (elem.cell == "costMaterials") {
    if (!CostMaterials) {
      //@ts-ignore sequelize-znov
      let costMaterials = await cost_material.findOne({
        where: { techOperationId: elem.id },
      });
      if (!costMaterials) return;

      elem.costMaterials =
        costMaterials.price * costMaterials.consumptionPerHectare;
      console.log(elem);
      return elem;
    } else {
      elem.costMaterials =
        CostMaterials.price * CostMaterials.consumptionPerHectare;
      return elem;
    }
  } else if (elem.cell == "costTransport") {
    if (!CostTransport) {
      //@ts-ignore sequelize-znov
      let costTransport = await cost_transport.findOne({
        where: { techOperationId: elem.id },
      });
      if (!costTransport) return;

      elem.costTransport = costTransport.price;
      return elem;
    } else {
      elem.costTransport = CostTransport.price;
      return elem;
    }
  } else if (elem.cell == "costServices") {
    //@ts-ignore sequelize-znov
    if (!CostServices) {
      let costServices = await cost_service.findOne({
        where: { techOperationId: elem.id },
      });
      if (!costServices) return;
      elem.costServices = costServices.price;
      return elem;
    } else {
      elem.costServices = CostServices.price;
      return elem;
    }
  } else if (elem.cell == "costMechanical") {
    if (!CostMechanical) {
      //@ts-ignore sequelize-znov
      const aggregateData = await aggregate.findOne({
        where: { techOperationId: elem.id },
      });
      if (aggregateData == null) throw new Error("");

      const Tractor = await tractor.findOne({
        where: { id: aggregateData.tractorId },
      });
      const machine = await agricultural_machine.findOne({
        where: { id: aggregateData.agriculturalMachineId },
      });
      const Grade = await grade.findAll();
      const cart = await tech_cart.findOne({ where: { id: cartId } });
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

      elem.costMachineWork = costMachineWork;
      elem.costCars = costCars;
      elem.costFuel = costFuel;
      elem.costHandWork = costHandWork;
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
      const costFuel = Math.round(
        (+CostMechanical.fuelConsumption * +CostMechanical.priceDiesel) /
          Math.round(
            (+machine.widthOfCapture * (+CostMechanical.workingSpeed * 1000)) /
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
            (+machine.widthOfCapture * (+CostMechanical.workingSpeed * 1000)) /
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

      elem.costMachineWork = costMachineWork;
      elem.costCars = costCars;
      elem.costFuel = costFuel;
      elem.costHandWork = costHandWork;
      return elem;
    }
  } else if (elem.cell == "costHandWork") {
    if (!CostHandWork) {
      //@ts-ignore sequelize-znov
      const handWork = await cost_hand_work.findOne({
        where: { techOperationId: elem.id },
      });
      let costHandWork;
      if (!handWork) return;
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
      elem.costHandWork = costHandWork;
      return elem;
    }
  }
}

async function updateOper(nameOper: string, cell: Icell, operId: number) {
  const techOperation = await tech_operation.update(
    {
      nameOperation: nameOper,
      cell,
    },
    { where: { id: operId } }
  );
  //@ts-ignore
  const oper: resTechOperation = await tech_operation.findOne({
    where: { id: operId },
    include: [
      cost_material,
      cost_service,
      cost_transport,
      cost_hand_work,
      aggregate,
    ],
  });
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
          consumptionPerHectare,
          price,
          unitsOfConsumption,
          unitsOfCost,
        },
        section,
      },
    } = data;
    const oper = await createOper(cartId, nameOper, cell, section);
    const operId = oper.id;

    const costMaterial = await cost_material.create({
      nameMaterials: nameOper,
      price,
      unitsOfCost,
      consumptionPerHectare,
      unitsOfConsumption,
      techOperationId: operId,
    });
    oper.costMaterials =
      costMaterial.price * costMaterial.consumptionPerHectare;
    return { oper, prope: costMaterial };
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
    const costService = await cost_service.create({
      nameService: nameOper,
      price,
      unitsOfCost,
      techOperationId: operId,
    });
    oper.costServices = costService.price;
    return { oper, prope: costService };
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
    const costTransport = await cost_transport.create({
      nameTransport: nameOper,
      price: +price,
      unitsOfCost,
      techOperationId: operId,
    });
    oper.costTransport = costTransport.price;
    return { oper, prope: costTransport };
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

    let oper = await createOper(cartId, nameOper, cell, section);
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

    oper.costMachineWork = costMachineWork;
    oper.costCars = costCars;
    oper.costFuel = costFuel;
    oper.costHandWork = costHandWork;
    return { oper, prope: Aggregate };
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

    let oper = await createOper(cartId, nameOper, cell, section);

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
    oper.costHandWork = cost;

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
          consumptionPerHectare,
          price,
          unitsOfConsumption,
          unitsOfCost,
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
      const CostMaterials: Icost_material = {
        nameMaterials: "",
        consumptionPerHectare: consumptionPerHectare,
        price: price,
        unitsOfConsumption: unitsOfConsumption,
        unitsOfCost: unitsOfCost,
      };

      (oper.cost_material.consumptionPerHectare = consumptionPerHectare),
        (oper.cost_material.price = price),
        (oper.cost_material.unitsOfConsumption = unitsOfConsumption),
        (oper.cost_material.unitsOfCost = unitsOfCost),
        (oper.nameOperation = nameOper),
        (oper = await changeOper(oper, oper.techCartId!, CostMaterials));
    } else {
      const costMaterial = await cost_material.update(
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
      oper = await updateOper(nameOper, cell, operId);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
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
        res: { operId, nameOper, price, unitsOfCost },
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
          aggregate,
        ],
      });
      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));
      console.log(123);
      console.log(oper);
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
      console.log(2);

      console.log(oper);
    } else {
      const costService = await cost_service.update(
        {
          nameService: nameOper,
          price: +price,
          unitsOfCost,
          techOperationId: operId,
        },
        { where: { techOperationId: operId } }
      );
      oper = await updateOper(nameOper, cell, operId);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
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
        res: { operId, nameOper, price, unitsOfCost },
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
          aggregate,
        ],
      });
      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));
      console.log(123);
      console.log(oper);
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
      console.log(2);

      console.log(oper);
    } else {
      const costTransport = await cost_transport.update(
        {
          nameTransport: nameOper,
          price: +price,
          unitsOfCost,
          techOperationId: operId,
        },
        { where: { techOperationId: operId } }
      );
      oper = await updateOper(nameOper, cell, operId);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
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
          aggregate,
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
        (oper.aggregate.workingSpeed = workingSpeed),
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

      console.log(oper);
    } else {
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
      oper = await updateOper(nameOper, cell, operId);
      if (!oper) return;

      await changeOper(oper, oper.techCartId!);
    }
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
      console.log(3);

      if (!Oper) return;
      oper = JSON.parse(JSON.stringify(Oper));
      oper = await updateOper(nameOper, cell, operId);
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

      oper = await updateOper(nameOper, cell, operId);
      if (!oper) return;

      oper = await changeOper(oper, oper.techCartId!);
    }
    return oper;
  }

  async deleteOper(data: { cartId: number; operId: number }) {
    const { cartId, operId } = data;

    const elem = await tech_operation.findOne({ where: { id: operId } });
    if (!elem) throw new Error("");
    await changeOper(elem, cartId);
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
    return elem;
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
