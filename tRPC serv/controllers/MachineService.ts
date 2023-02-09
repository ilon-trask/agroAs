import { Principal } from "..";
import { agricultural_machine } from "../models/models";
import { Imachine } from "../models/models";

interface Idata {
  res: Imachine;
}
class MachineService {
  async getAll(user: Principal | undefined) {
    if (!user) return;
    const machine: Imachine[] = await agricultural_machine.findAll({
      where: { userId: user.sub },
    });
    return machine;
  }
  async create(data: Imachine, user: Principal | undefined) {
    if (!user) return;
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
    const machine: Imachine = await agricultural_machine.create({
      nameMachine,
      brand,
      marketCost: +marketCost,
      depreciationPeriod: +depreciationPeriod,
      widthOfCapture: +widthOfCapture,
      workingSpeed: +workingSpeed,
      numberOfServicePersonnel: +numberOfServicePersonnel,
      gradeId: +gradeId!,
      userId: user.sub,
    });

    return machine;
  }
  async patch(data: Imachine, user: Principal | undefined) {
    const {
      id,
      nameMachine,
      brand,
      marketCost,
      depreciationPeriod,
      widthOfCapture,
      workingSpeed,
      numberOfServicePersonnel,
      gradeId,
    } = data;
    await agricultural_machine.update(
      {
        nameMachine,
        brand,
        marketCost,
        depreciationPeriod,
        widthOfCapture,
        workingSpeed,
        numberOfServicePersonnel,
        gradeId,
      },
      { where: { id: id } }
    );
    const machine: Imachine | null = await agricultural_machine.findOne({
      where: { id: id },
    });
    if (machine == null) throw new Error("");

    return machine;
  }
}
export default new MachineService();
