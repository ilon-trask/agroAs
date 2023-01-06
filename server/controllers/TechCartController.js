const {
  TechCart,
  TechOperation,
  CostMaterial,
  CostService,
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
          res: { nameOper, price, amount, unitsOfCost, unitsOfConsumption },
          section,
        },
      } = req.body;
      console.log(cartId);
      console.log(sum);
      console.log(req.body);

      if (cell == "costMaterials") {
        const techOperation = TechOperation.create({
          techCartId: cartId,
          nameOperation: nameOper,
          cell,
          [cell]: +price * +amount,
          sectionId: section,
        })
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
          .then(TechCart.update({ totalCost: sum }, { where: { id: cartId } }));
      } else if (cell == "costServices") {
        const techOperation = TechOperation.create({
          techCartId: cartId,
          nameOperation: nameOper,
          cell,
          [cell]: +price,
        })
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
          .then(TechCart.update({ totalCost: sum }, { where: { id: cartId } }));
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
      console.log(req.body);
      console.log(cartId);
      console.log(req.body);
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
      console.log(akk - (elem.costMaterials || elem.costHandWork));

      let sum = akk - (elem.costMaterials || elem.costHandWork);
      console.log(ind);
      console.log(id);
      const costMaterials = CostMaterial.destroy({
        where: { techOperationId: ind },
      });

      const costService = CostService.destroy({
        where: { techOperationId: ind },
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

      if (cell == "costMaterials") {
        const costMaterials = CostMaterial.findAll({
          where: { techOperationId: el },
        }).then((data) => {
          return res.json(data);
        });
      } else if (cell == "costServices") {
        const costServices = CostService.findAll({
          where: { techOperationId: el },
        }).then((data) => {
          return res.json(data);
        });
      }
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
