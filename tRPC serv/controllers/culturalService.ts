import { cultures_types, Icultures_types } from "../models/models";

class culturalService {
  async get() {
    const grades: Icultures_types[] = await cultures_types.findAll();
    return grades;
  }
  async create(data: any) {
    const grades = await cultures_types.create(...data);
  }
}
export default new culturalService();
