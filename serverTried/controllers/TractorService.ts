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

  async create(data: Idata) {
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
    } = data;

    const Tractor = await tractor.create({
      nameTractor,
      brand,
      marketCost: +marketCost,
      depreciationPeriod: +depreciationPeriod,
      enginePower: +enginePower,
      fuelConsumption: +fuelConsumption,
      numberOfPersonnel: +numberOfPersonnel,
      typeOfWork: +typeOfWork,
    });

    return Tractor;
  }
}
export = new TractorService();
