const { AgriculturalMachine } = require("../models/models");

class MachineController {
  getAll(req, res) {
    const machine = AgriculturalMachine.findAll();
    machine.then((data) => {
      return res.json(data);
    });
  }
  create(req, res) {
    const {
      res: {
        nameMachine,
        brand,
        marketCost,
        depreciationPeriod,
        widthOfCapture,
        workingSpeed,
        numberOfServicePersonnel,
        typeOfWork,
      },
    } = req.body;
    console.log(req.body);
    const machine = AgriculturalMachine.create({
      nameMachine,
      brand,
      marketCost: +marketCost,
      depreciationPeriod: +depreciationPeriod,
      widthOfCapture: +widthOfCapture,
      workingSpeed: +workingSpeed,
      numberOfServicePersonnel: +numberOfServicePersonnel,
      typeOfWork: +typeOfWork,
    });
  }
}
module.exports = new MachineController();
