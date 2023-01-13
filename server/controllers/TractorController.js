const { Tractor } = require("../models/models");

class TractorController {
  getAll(req, res) {
    const tractor = Tractor.findAll();
    tractor.then((data) => {
      return res.json(data);
    });
  }
  create(req, res) {
    const {
      res: {
        nameTractor,
        brand,
        marketCost,
        depreciationPeriod,
        enginePower,
        fuelConsumption,
        numberOfPersonnel,
        typeOfWork,
      },
    } = req.body;
    console.log(req.body);
    const tractor = Tractor.create({
      nameTractor,
      brand,
      marketCost: +marketCost,
      depreciationPeriod: +depreciationPeriod,
      enginePower: +enginePower,
      fuelConsumption: +fuelConsumption,
      numberOfPersonnel: +numberOfPersonnel,
      typeOfWork: +typeOfWork,
    });
  }
}
module.exports = new TractorController();
