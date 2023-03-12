import { Op } from "sequelize";
import { adminId, Principal } from "..";
import { agricultural_machine } from "../models/models";
import { Imachine } from "../models/models";

class MachineService {
  async getAll(user: Principal | undefined) {
    if (!user) {
      const machine: Imachine[] = await agricultural_machine.findAll({
        where: { userId: adminId },
      });
      return machine;
    } else {
      const machine: Imachine[] = await agricultural_machine.findAll({
        where: { userId: user.sub },
      });
      return machine;
    }
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
  async getCopyMachine(user: Principal | undefined) {
    if (!user) return;
    let adminMachine: Imachine[] = JSON.parse(
      JSON.stringify(
        await agricultural_machine.findAll({
          where: { userId: adminId },
        })
      )
    );
    const Machines: Imachine[] | null = JSON.parse(
      JSON.stringify(
        await agricultural_machine.findAll({
          //@ts-ignore
          where: { userId: user.sub, copiedFromId: { [Op.ne]: null } },
        })
      )
    );
    if (!Machines) return adminMachine;
    Machines.forEach(
      (Tr) =>
        (adminMachine = adminMachine.filter((Ad) => Ad.id != Tr.copiedFromId))
    );

    return adminMachine;
  }
  async copyMachine(MachineId: number, user: Principal | undefined) {
    if (!user) return;

    const machineData: Imachine | null = await agricultural_machine.findOne({
      where: { id: MachineId },
    });
    if (!machineData) return;
    const Machine: Imachine = await agricultural_machine.create({
      brand: machineData.brand,
      depreciationPeriod: machineData.depreciationPeriod,
      marketCost: machineData.marketCost,
      nameMachine: machineData.nameMachine,
      numberOfServicePersonnel: machineData.numberOfServicePersonnel,
      widthOfCapture: machineData.widthOfCapture,
      workingSpeed: machineData.workingSpeed,
      copiedFromId: machineData.id,
      gradeId: machineData.gradeId,
      userId: user?.sub,
    });
    console.log(Machine);
    return Machine;
  }
}
export default new MachineService();
