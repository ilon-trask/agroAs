import { Isection, section } from "../models/models";
// (async function checkSection() {
//   if (!section) return;
//   const Section: Isection[] = await section.findAll();
//   if (!Section[0]) {
//     await section.create({ id: 1, myId: 10, name: "Підготовка  ґруну" });
//     await section.create({ id: 2, myId: 20, name: "Посадка" });
//     await section.create({ id: 3, myId: 30, name: "Догялд" });
//     await section.create({ id: 4, myId: 40, name: "Живлення" });
//     await section.create({ id: 5, myId: 50, name: "Моніторинг" });
//     await section.create({ id: 6, myId: 60, name: "Захист" });
//     await section.create({ id: 7, myId: 70, name: "Збір" });
//     await section.create({ id: 8, myId: 80, name: "Зберігання" });
//   }
// })();
class SectionService {
  async getAll() {
    const Section: Isection[] = await section.findAll();
    return Section;
  }
}
export default new SectionService();
