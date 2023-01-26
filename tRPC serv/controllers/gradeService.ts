import { grade, Igrade } from "../models/models";

class gradeService {
  async get() {
    const grades: Igrade[] = await grade.findAll();
    return grades;
  }
}
export default new gradeService();
