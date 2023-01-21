import { tractor } from "../models/models";

interface Itractor {
  id?: number;
  nameTractor: string;
  brand: string;
  marketCost: number;
  depreciationPeriod: number;
  enginePower: number;
  fuelConsumption: number;
  numberOfPersonnel: number;
  typeOfWork: number;
  userId?: number;
}
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
      typeOfWork,
    } = data;

    const Tractor = await tractor.create({
      nameTractor,
      brand,
      marketCost,
      depreciationPeriod,
      enginePower,
      fuelConsumption,
      numberOfPersonnel,
      typeOfWork,
    });

    return Tractor;
  }
}
export = new TractorService();
