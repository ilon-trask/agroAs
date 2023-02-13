import { adminId, Principal } from "..";
import { tractor, Itractor } from "../models/models";

interface Idata {
  res: Itractor;
}

class TractorService {
  async getAll(userId: string | undefined) {
    if (!userId) {
      const Tractor: Itractor[] = await tractor.findAll({
        where: { id: adminId },
      });
      return Tractor;
    } else {
      const Tractor: Itractor[] = await tractor.findAll({
        where: { id: userId },
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

    const Tractor = await tractor.update(
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

    return Tractor;
  }
}
export default new TractorService();
