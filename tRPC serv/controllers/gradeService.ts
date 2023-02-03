import { grade, Igrade } from "../models/models";
// (async function checkGrades() {
// if (!grade) return;
//   const grades: Igrade[] = await grade.findAll();
//   if (!grades[0]) {
//     await grade.create({ id: 1, indicator: "I", coefficient: 1 });
//     await grade.create({ id: 2, indicator: "II", coefficient: 1.14 });
//     await grade.create({ id: 3, indicator: "III", coefficient: 1.3 });
//     await grade.create({ id: 4, indicator: "IV", coefficient: 1.48 });
//     await grade.create({ id: 5, indicator: "V", coefficient: 1.68 });
//     await grade.create({ id: 6, indicator: "VI", coefficient: 1.9 });
//   }
// })();
class gradeService {
  async get() {
    const grades: Igrade[] = await grade.findAll();
    return grades;
  }
}
export default new gradeService();
