const { Section } = require("../models/models");

class SectionController {
  getAll(req, res) {
    const section = Section.findAll();
    section.then((data) => {
      return res.json(data);
    });
  }
}
module.exports = new SectionController();
