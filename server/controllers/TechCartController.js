const {
  TechCart,
  TechOperation,
  CostMaterial,
  CostService,
  CostTransport,
  Tractor,
  AgriculturalMachine,
  Aggregate,
} = require("../models/models");

class TechCartController {
  create(req, res) {
    try {
      console.log(req.body);
      const { nameCart, area, salary, priceDiesel, price = 0 } = req.body;
      const techCart = TechCart.create({
        nameCart: nameCart,
        area: area,
        salary: salary,
        priceDiesel: priceDiesel,
      });

      return res.json(techCart);
    } catch (e) {
      console.log(e);
    }
  }
  getAll(req, res) {
    const techCart = TechCart.findAll();
    techCart.then((data) => {
      let resData = JSON.parse(JSON.stringify(data));
      resData.sort((a, b) => a.id - b.id);
      console.log(resData);
      return res.json(resData);
    });
  }
  patchCart(req, res) {
    const { id, nameCart, area, salary, priceDiesel } = req.body;
    console.log(req.body);
    const techCart = TechCart.update(
      { nameCart, area, salary, priceDiesel },
      { where: { id: id } }
    );
    req.json("norm");
  }
  getOper(req, res) {
    try {
      const { id } = req.params;
      console.log(req.params);
      const techOperation = TechOperation.findAll({
        where: { techCartId: id },
      });
      techOperation.then((data) => {
        let resData = JSON.parse(JSON.stringify(data));
        resData.sort((a, b) => a.id - b.id);
        return res.json(resData);
      });
    } catch (e) {
      res.json("помилка");
    }
  }
  createOper(req, res) {
    try {
      const {
        cartId,
        sum,
        arr: {
          cell,
          res: {
            nameOper,
            price,
            amount,
            unitsOfCost,
            unitsOfConsumption,
            fuelConsumption,
            workingSpeed,
            idMachine,
            idTractor,
          },
          section,
        },
      } = req.body;
      console.log(sum + "sum");
      console.log(cell);

      function createOper() {
        const techOperation = TechOperation.create({
          techCartId: cartId,
          nameOperation: nameOper,
          cell,
          [cell]: +price * +amount || +price,
          sectionId: section,
        });
        return techOperation;
      }

      function tehcCartUpdate() {
        TechCart.update({ totalCost: sum }, { where: { id: cartId } });
      }

      if (cell == "costMaterials") {
        createOper()
          .then((data) => {
            const operId = data.id;
            CostMaterial.create({
              nameMaterials: nameOper,
              price: +price,
              unitsOfCost,
              consumptionPerHectare: +amount,
              unitsOfConsumption,
              cell,
              techOperationId: operId,
            });
          })
          .then(tehcCartUpdate());
      } else if (cell == "costServices") {
        createOper()
          .then((data) => {
            const operId = data.id;
            const costService = CostService.create({
              nameService: nameOper,
              price: +price,
              unitsOfCost,
              cell,
              techOperationId: operId,
            });
          })
          .then(tehcCartUpdate());
      } else if (cell == "costTransport") {
        createOper()
          .then((data) => {
            const operId = data.id;
            const costTransport = CostTransport.create({
              nameTransport: nameOper,
              price: +price,
              unitsOfCost,
              cell,
              techOperationId: operId,
            });
          })
          .then(tehcCartUpdate());
      } else if (cell == "costMechanical") {
        const cart = TechCart.findOne({ where: { id: cartId } }).then(
          (cart) => {
            const tractor = Tractor.findOne({ where: { id: idTractor } }).then(
              (tractor) => {
                const machine = AgriculturalMachine.findOne({
                  where: { id: idMachine },
                }).then((machine) => {
                  console.log(tractor.nameTractor);
                  console.log(machine.id);
                  console.log(5);
                  console.log(workingSpeed);

                  const aggregate = Aggregate.create({
                    amountOfTractorDepreciationPerHour: Math.round(
                      +tractor.marketCost /
                        +tractor.depreciationPeriod /
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
                      (+machine.widthOfCapture * (+workingSpeed * 1000)) / 10000
                    ),
                    workingSpeed: +workingSpeed,
                  });
                  console.log(3);
                  aggregate.then((aggregate) => {
                    const operation = TechOperation.create({
                      techCartId: cartId,
                      nameOperation: nameOper,
                      cell,
                      costCars: Math.round(
                        ((+aggregate.amountOfTractorDepreciationPerHour +
                          +aggregate.amountOfMachineDepreciationPerHour) *
                          1.05) /
                          +aggregate.unitProductionAggregate
                      ),
                      costFuel: Math.round(
                        (+fuelConsumption * +cart.priceDiesel) /
                          +aggregate.unitProductionAggregate
                      ),
                      sectionId: section,
                    }).then((operation) => {
                      TechCart.update(
                        { totalCost: sum },
                        { where: { id: cartId } }
                      );
                      return res.json("all good");
                    });
                  });
                });
              }
            );
          }
        );
      }
      return res.json("all good");
    } catch (e) {
      console.log(e);
    }
  }
  patchOper(req, res) {
    try {
      const {
        cartId,
        sum,
        arr: {
          cell,
          res: { id, nameOper, price, amount, unitsOfCost, unitsOfConsumption },
        },
      } = req.body;
      const techOperation = TechOperation.update(
        {
          techCartId: cartId,
          nameOperation: nameOper,
          cell,
          [cell]: +price * (+amount || 1),
        },
        { where: { id: id } }
      );
      techOperation
        .then((data) => {
          let operId = data.id;
          if (cell == "costMaterials") {
            const costMaterial = CostMaterial.update(
              {
                nameMaterials: nameOper,
                price: +price,
                unitsOfCost,
                consumptionPerHectare: +amount,
                unitsOfConsumption,
                cell: cell,
                techOperationId: operId,
              },
              { where: { techOperationId: id } }
            );
          } else if (cell == "costServices") {
            const operId = data.id;
            const costService = CostService.update(
              {
                nameService: nameOper,
                price: +price,
                unitsOfCost,
                cell,
                techOperationId: operId,
              },
              { where: { techOperationId: id } }
            );
          } else if (cell == "costTransport") {
            const operId = data.id;
            const costTransport = CostTransport.update(
              {
                nameTransport: nameOper,
                price: +price,
                unitsOfCost,
                cell,
                techOperationId: operId,
              },
              { where: { techOperationId: id } }
            );
          }
        })
        .then(TechCart.update({ totalCost: +sum }, { where: { id: cartId } }));

      return res.json("all good");
    } catch (e) {
      console.log(e);
    }
  }
  deleteOper(req, res) {
    try {
      const { id, ind } = req.params;
      const [elem, akk] = req.body;
      console.log(elem);
      console.log(
        akk -
          (elem.costMaterials ||
            elem.costHandWork ||
            elem.costMaterials ||
            elem.costTransport ||
            elem.costFuel + elem.costCars)
      );

      let sum =
        akk -
        (elem.costMaterials ||
          elem.costHandWork ||
          elem.costMaterials ||
          elem.costTransport ||
          elem.costFuel + elem.costCars);
      console.log(ind);
      console.log(id);
      const costMaterials = CostMaterial.destroy({
        where: { techOperationId: ind },
      });

      const costService = CostService.destroy({
        where: { techOperationId: ind },
      });
      const costTransport = CostTransport.destroy({
        where: { techOperationId: ind },
      });
      const costMechanical = CostService.destroy({
        where: { techOperationId: ind },
      });
      const aggregate = Aggregate.destroy({
        where: {
          techOperationId: ind,
        },
      });

      costMaterials
        .then(() => {
          const techOperation = TechOperation.destroy({ where: { id: ind } });
        })
        .then(TechCart.update({ totalCost: sum }, { where: { id: id } }));
      return res.json("all good");
    } catch (e) {}
  }
  getProps(req, res) {
    try {
      let { id, el, cell } = req.params;
      function get() {
        if (cell == "costMaterials") {
          const costMaterials = CostMaterial.findAll({
            where: { techOperationId: el },
          });
          return costMaterials;
        } else if (cell == "costServices") {
          const costServices = CostService.findAll({
            where: { techOperationId: el },
          });
          return costServices;
        } else if (cell == "costTransport") {
          const costTransport = CostTransport.findAll({
            where: { techOperationId: el },
          });
          return costTransport;
        } else if (cell == "costMechanical") {
          const costMechanical = null;
          return res.json();
        }
      }
      get().then((data) => {
        return res.json(data);
      });
    } catch (e) {}
  }
  delete(req, res) {
    try {
      const { id } = req.body;
      // const techOperation = TechOperation.destroy({
      //   where: { techCartId: id },
      // });
      // techOperation.then(() => {
      const techCart = TechCart.destroy({ where: { id: id } });

      techCart.then(res.redirect("http://localhost:3000/"));
      // });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new TechCartController();
