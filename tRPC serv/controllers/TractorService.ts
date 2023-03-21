import { Op } from "sequelize";
import { adminId, Principal } from "..";
import { tractor, Itractor } from "../models/models";

class TractorService {
  async getAll(userId: string | undefined) {
    if (!userId) {
      const Tractor: Itractor[] = await tractor.findAll({
        where: { userId: adminId },
      });
      return Tractor;
    } else {
      const Tractor: Itractor[] = await tractor.findAll({
        where: { userId: userId },
      });
      return Tractor;
    }
  }

  async create(data: Itractor, user: Principal | undefined) {
    if (!user) return;
    const {
      nameTractor,
      brand,
      marketCost,
      depreciationPeriod,
      enginePower,
      fuelConsumption,
      numberOfPersonnel,
      gradeId,
    } = data;
    const Tractor: Itractor = await tractor.create({
      nameTractor,
      brand,
      marketCost,
      depreciationPeriod,
      enginePower,
      fuelConsumption,
      numberOfPersonnel,
      gradeId,
      userId: user.sub,
    });
    if (user.role == "service_role") {
      await tractor.update(
        { copiedFromId: Tractor.id },
        { where: { id: Tractor.id } }
      );
    }
    console.log(123);
    console.log(Tractor);

    return Tractor;
  }
  async patch(data: Itractor, user: Principal | undefined) {
    if (!user) return;
    const {
      id,
      nameTractor,
      brand,
      marketCost,
      depreciationPeriod,
      enginePower,
      fuelConsumption,
      numberOfPersonnel,
      gradeId,
    } = data;

    await tractor.update(
      {
        nameTractor,
        brand,
        marketCost,
        depreciationPeriod,
        enginePower,
        fuelConsumption,
        numberOfPersonnel,
        gradeId,
      },
      { where: { id: id } }
    );
    const Tractor: Itractor | null = await tractor.findOne({
      where: { id: id },
    });
    if (Tractor == null) throw new Error("");

    return Tractor;
  }
  async getCopyTractors(user: Principal | undefined) {
    if (!user) return;
    let adminTractors: Itractor[] = JSON.parse(
      JSON.stringify(
        await tractor.findAll({
          where: { userId: adminId },
        })
      )
    );
    const Tractors: Itractor[] | null = JSON.parse(
      JSON.stringify(
        await tractor.findAll({
          //@ts-ignore
          where: { userId: user.sub, copiedFromId: { [Op.ne]: null } },
        })
      )
    );
    if (!Tractors) return adminTractors;
    Tractors.forEach(
      (Tr) =>
        (adminTractors = adminTractors.filter((Ad) => Ad.id != Tr.copiedFromId))
    );

    return adminTractors;
  }
  async copyTractor(TractorId: number, user: Principal | undefined) {
    if (!user) return;

    const tractorData: Itractor | null = await tractor.findOne({
      where: { id: TractorId },
    });
    if (!tractorData) return;
    const Tractor: Itractor = await tractor.create({
      brand: tractorData.brand,
      depreciationPeriod: tractorData.depreciationPeriod,
      enginePower: tractorData.enginePower,
      fuelConsumption: tractorData.fuelConsumption,
      marketCost: tractorData.marketCost,
      nameTractor: tractorData.nameTractor,
      numberOfPersonnel: tractorData.numberOfPersonnel,
      copiedFromId: tractorData.id,
      gradeId: tractorData.gradeId,
      userId: user?.sub,
    });
    console.log(Tractor);
    return Tractor;
  }
}
export default new TractorService();
