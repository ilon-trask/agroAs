import { adminId, Principal } from "..";
import { tractor, Itractor } from "../models/models";

interface Idata {
  res: Itractor;
}

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
}
export default new TractorService();
