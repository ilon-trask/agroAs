import { agricultural_machine } from "../models/models";
import { Imachine } from "../models/models";

interface Idata {
  res: Imachine;
}
class MachineService {
  async getAll() {
    const machine: Imachine[] = await agricultural_machine.findAll();
    return machine;
  }
  async create(data: Imachine) {
    const {
      nameMachine,
      brand,
      marketCost,
      depreciationPeriod,
      widthOfCapture,
      workingSpeed,
      numberOfServicePersonnel,
      gradeId,
    } = data;
    const machine = await agricultural_machine.create({
      nameMachine,
      brand,
      marketCost: +marketCost,
      depreciationPeriod: +depreciationPeriod,
      widthOfCapture: +widthOfCapture,
      workingSpeed: +workingSpeed,
      numberOfServicePersonnel: +numberOfServicePersonnel,
      gradeId: +gradeId!,
    });
    return machine;
  }
}
export = new MachineService();
