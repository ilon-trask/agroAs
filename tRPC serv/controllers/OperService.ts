import {
  tech_cart,
  tractor,
  tech_operation,
  agricultural_machine,
  aggregate,
  cost_material,
  cost_service,
  cost_transport,
} from "../models/models";

type Ires = {
  operId?: number;
  nameOper: string;
  price?: number;
  amount?: number;
  unitsOfCost?: string;
  unitsOfConsumption?: string;
  fuelConsumption?: number;
  workingSpeed?: number;
  idMachine?: number;
  idTractor?: number;
};

interface Ioper {
  id?: number;
  nameOperation: string;
  cell: number;
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
interface Idata {
  cartId: number;
  sum: number;
  arr: {
    cell: Icell;
    res: Ires;
    section: number;
  };
}

class OperService {
  getOper(id: number): Promise<tech_operation[]> {
    const techOperation = tech_operation.findAll({
      where: { techCartId: id },
    });
    return techOperation;
  }
  async createOper(data: Idata) {
    const {
      cartId,
      sum,
      arr: {
        cell,
        res: {
          nameOper,
          price = null,
          amount = null,
          unitsOfCost = null,
          unitsOfConsumption = null,
          fuelConsumption = null,
          workingSpeed = null,
          idMachine,
          idTractor,
        },
        section,
      },
    } = data;
    if (
      price === undefined ||
      amount === undefined ||
      unitsOfConsumption === undefined ||
      unitsOfCost === undefined ||
      workingSpeed === undefined ||
      fuelConsumption === undefined
    ) {
      throw new Error("");
    } else {
      function createOper() {
        if (price === undefined || amount === undefined) {
          throw new Error("");
        }
        const techOperation: Promise<tech_operation> = tech_operation.create({
          techCartId: cartId,
          nameOperation: nameOper,
          cell,
          [cell]: +price * +amount || +price,
          sectionId: section,
        });
        return techOperation;
      }

      function tehcCartUpdate() {
        tech_cart.update({ totalCost: sum }, { where: { id: cartId } });
      }

      if (cell == "costMaterials") {
        createOper()
          .then((data) => {
            const operId = data.id;
            cost_material.create({
              nameMaterials: nameOper,
              price: +price,
              unitsOfCost,
              consumptionPerHectare: +amount,
              unitsOfConsumption,
              techOperationId: operId,
            });
          })
          .then(() => {
            tehcCartUpdate();
          });
      } else if (cell == "costServices") {
        createOper()
          .then((data) => {
            const operId = data.id;
            const costService = cost_service.create({
              nameService: nameOper,
              price: +price,
              unitsOfCost,
              techOperationId: operId,
            });
          })
          .then(() => {
            tehcCartUpdate();
          });
      } else if (cell == "costTransport") {
        createOper()
          .then((data) => {
            const operId = data.id;
            const costTransport = cost_transport.create({
              nameTransport: nameOper,
              price: +price,
              unitsOfCost,
              techOperationId: operId,
            });
          })
          .then(() => {
            tehcCartUpdate();
          });
      } else if (cell == "costMechanical") {
        console.log(123);

        const cart = await tech_cart.findOne({ where: { id: cartId } });
        if (!cart) {
          return "problem";
        }
        const Tractor = await tractor.findOne({ where: { id: idTractor } });
        if (!Tractor) {
          return "problem";
        }
        const machine = await agricultural_machine.findOne({
          where: { id: idMachine },
        });
        if (!machine) {
          return "problem";
        }

        const operation = tech_operation.create({
          techCartId: cartId,
          nameOperation: nameOper,
          cell,
          costCars: 0,
          costFuel: 0,
          sectionId: section,
        });
        operation.then((operation) => {
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
          });
          Aggregate.then((Aggregate) => {
            const oper = tech_operation
              .update(
                {
                  techCartId: cartId,
                  nameOperation: nameOper,
                  cell,
                  costCars: Math.round(
                    ((+Aggregate.amountOfTractorDepreciationPerHour +
                      +Aggregate.amountOfMachineDepreciationPerHour) *
                      1.05) /
                      +Aggregate.unitProductionAggregate
                  ),
                  costFuel: Math.round(
                    (+fuelConsumption * +cart.priceDiesel) /
                      +Aggregate.unitProductionAggregate
                  ),
                  sectionId: section,
                },
                { where: { id: operation.id } }
              )
              .then((operation) => {
                tech_cart.update({ totalCost: sum }, { where: { id: cartId } });
              });
          });
        });
      }
    }
    return "all good";
  }
  patchOper(data: Idata) {
    const {
      cartId,
      sum,
      arr: {
        cell,
        res: {
          operId,
          nameOper,
          price,
          amount,
          unitsOfCost,
          unitsOfConsumption,
          fuelConsumption,
          workingSpeed,
          idTractor,
          idMachine,
        },
      },
    } = data;

    //@ts-expect-error wrong-type-in-librery
    const techOperation: Promise<tech_operation> = tech_operation.update(
      {
        techCartId: cartId,
        nameOperation: nameOper,
        cell,
        [cell]: (+price || 1) * (+amount || 1),
      },
      { where: { id: operId } }
    );
    techOperation
      .then((data) => {
        if (cell == "costMaterials") {
          const costMaterial = cost_material.update(
            {
              nameMaterials: nameOper,
              price: +price,
              unitsOfCost,
              consumptionPerHectare: +amount,
              unitsOfConsumption,
              techOperationId: operId,
            },
            { where: { techOperationId: operId } }
          );
        } else if (cell == "costServices") {
          const costService = cost_service.update(
            {
              nameService: nameOper,
              price: +price,
              unitsOfCost,
              techOperationId: operId,
            },
            { where: { techOperationId: operId } }
          );
        } else if (cell == "costTransport") {
          const costTransport = cost_transport.update(
            {
              nameTransport: nameOper,
              price: +price,
              unitsOfCost,
              techOperationId: operId,
            },
            { where: { techOperationId: operId } }
          );
        } else if (cell == "costMechanical") {
          const Aggregate = aggregate.findOne({
            where: {},
          });
          Aggregate.then((Aggreagate) => {
            const Tractor = tractor
              .findOne({ where: { id: idTractor } })
              .then((Tractor) => {
                if (!Tractor) {
                  return "problem";
                }
                const machine = agricultural_machine
                  .findOne({
                    where: { id: idMachine },
                  })
                  .then((machine) => {
                    if (!machine) {
                      return "problem";
                    }

                    const costMechanical = aggregate.update(
                      {
                        amountOfTractorDepreciationPerHour: Math.round(
                          +Tractor.marketCost /
                            +Tractor.depreciationPeriod /
                            220 /
                            8
                        ),
                        fuelConsumption: +fuelConsumption,
                        amountOfMachineDepreciationPerHour: Math.round(
                          +machine.marketCost /
                            +machine.depreciationPeriod /
                            220 /
                            8
                        ),
                        unitProductionAggregate: Math.round(
                          (+machine.widthOfCapture * (+workingSpeed * 1000)) /
                            10000
                        ),
                        workingSpeed: +workingSpeed,
                        tractorId: idTractor,
                        agriculturalMachineId: idMachine,
                      },
                      { where: { techOperationId: operId } }
                    );
                  });
              });
          });
        }
      })
      .then(() => {
        tech_cart.update({ totalCost: +sum }, { where: { id: cartId } });
      });

    return "all good";
  }
  async deleteOper(data: { cartId: number; operId: number; akk: number }) {
    const { cartId, operId, akk } = data;
    console.log(cartId);

    const elem = await tech_operation.findOne({ where: { id: operId } });
    if (!elem) {
      throw new Error("");
    }
    let sum =
      akk -
      (elem.costMaterials ||
        elem.costHandWork ||
        elem.costMaterials ||
        elem.costTransport ||
        elem.costServices ||
        (elem.costFuel || 0) + (elem.costCars || 0));

    const costMaterials = await cost_material.destroy({
      where: { techOperationId: operId },
    });
    const costService = await cost_service.destroy({
      where: { techOperationId: operId },
    });
    const costTransport = await cost_transport.destroy({
      where: { techOperationId: operId },
    });
    const costMechanical = await cost_service.destroy({
      where: { techOperationId: operId },
    });
    const Aggregate = await aggregate.destroy({
      where: {
        techOperationId: operId,
      },
    });

    const techOperation = await tech_operation.destroy({
      where: { id: operId },
    });

    await tech_cart.update({ totalCost: sum }, { where: { id: cartId } });

    return "all good";
  }
  async getProps({ operId }: { operId: number }) {
    const oper = await tech_operation.findOne({ where: { id: operId } });
    if (!oper) {
      throw new Error("");
    }
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
      }
      throw new Error("");
    }

    return get();
  }
}
type prope = cost_material | cost_service | cost_transport | aggregate;
export default new OperService();
