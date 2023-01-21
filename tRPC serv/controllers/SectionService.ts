import Section from "../models/models";

class SectionService {
  async getAll() {
    const section = await Section.findAll();
    return section;
  }
}
export = new SectionService();
