import { Isection, section } from "../models/models";

class SectionService {
  async getAll() {
    const Section: Isection[] = await section.findAll();
    return Section;
  }
}
export default new SectionService();
