import { tractor, Itractor } from "../models/models";

interface Idata {
  res: Itractor;
}

class TractorService {
  async getAll() {
    const Tractor: Itractor[] = await tractor.findAll();
    return Tractor;
  }

  async create(data: Itractor) {
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

    const Tractor = await tractor.create({
      nameTractor,
      brand,
      marketCost,
      depreciationPeriod,
      enginePower,
      fuelConsumption,
      numberOfPersonnel,
      gradeId,
    });

    return Tractor;
  }
}
export = new TractorService();