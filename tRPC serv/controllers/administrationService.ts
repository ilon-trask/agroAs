import { Op } from "sequelize";
import { Principal } from "..";
import { administration, Iadministration, outcome } from "../models/models";
import {
  CreateAdministration,
  PatchAdministration,
} from "../routes/administrationRouter";
function costCalc(obj: Iadministration) {
  let data: Iadministration = JSON.parse(JSON.stringify(obj));

  if (data.periodCalc == "Помісячно") {
    let monts = +data.dateTo.split("-")[1] - +data.dateFrom.split("-")[1];
    data.cost = (monts + 1) * data.price;
  } else if (data.periodCalc == "Поквартально") {
    let akk: number[] = [];
    function setAkk(value: number) {
      if (!akk.includes(value)) {
        akk.push(value);
      }
    }
    for (
      let i = +data.dateFrom.split("-")[1];
      i <= +data.dateTo.split("-")[1];
      i++
    ) {
      if (i >= 1 && i <= 3) {
        setAkk(1);
      } else if (i > 3 && i <= 6) {
        setAkk(2);
      } else if (i >= 7 && i <= 9) {
        setAkk(3);
      } else if (i >= 10 && i <= 12) {
        setAkk(4);
      }
      const quarter = akk.length;
      data.cost = quarter * data.price;
    }
  } else if (data.periodCalc == "За рік") {
    let year = +data.dateTo.split("-")[0] - +data.dateFrom.split("-")[0];
    data.cost = (year + 1) * data.price;
  }
  return data;
}
class administrationService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const adm: Iadministration[] = await administration.findAll({
      where: { userId: user.sub },
    });
    const res = adm.map((el) => costCalc(el));
    return res;
  }
  async create(user: Principal | undefined, data: CreateAdministration) {
    if (!user) return;
    const res: Iadministration = await administration.create({
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      name: data.name,
      periodCalc: data.periodCalc,
      price: data.price,

      purpose: data.purpose,
      userId: user.sub,
    });
    return costCalc(res);
  }
  async patch(user: Principal | undefined, data: PatchAdministration) {
    if (!user) return;
    await administration.update(
      {
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        name: data.name,
        periodCalc: data.periodCalc,
        price: data.price,
        purpose: data.purpose,
      },
      { where: { id: data.admId } }
    );
    const res: Iadministration | null = await administration.findOne({
      where: { id: data.admId },
    });
    if (!res) return;
    return costCalc(res);
  }
  async delete(user: Principal | undefined, admId: number) {
    if (!user) return;
    await outcome.destroy({ where: { administrationId: admId } });
    const res = await administration.destroy({ where: { id: admId } });
    return res;
  }
}
export default new administrationService();
