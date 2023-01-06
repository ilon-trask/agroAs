const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const TechCart = sequelize.define("tech_cart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameCart: { type: DataTypes.STRING, allowNull: false },
  area: { type: DataTypes.INTEGER, allowNull: false },
  totalCost: { type: DataTypes.INTEGER },
  salary: { type: DataTypes.INTEGER, allowNull: false },
  priceDiesel: { type: DataTypes.INTEGER, allowNull: false },
});

const TechOperation = sequelize.define("tech_operation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameOperation: { type: DataTypes.STRING },
  // amountWork: { type: DataTypes.INTEGER },
  // unitOfWork: { type: DataTypes.STRING },
  cell: { type: DataTypes.STRING, allowNull: false },
  costCars: { type: DataTypes.INTEGER },
  costFuel: { type: DataTypes.INTEGER },
  costMachineWork: { type: DataTypes.INTEGER },
  costHandWork: { type: DataTypes.INTEGER },
  costMaterials: { type: DataTypes.INTEGER },
  costTransport: { type: DataTypes.INTEGER },
  costServices: { type: DataTypes.INTEGER },
});

const CostMaterial = sequelize.define("cost_material", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameMaterials: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  unitsOfCost: { type: DataTypes.STRING },
  consumptionPerHectare: { type: DataTypes.INTEGER, allowNull: false },
  unitsOfConsumption: { type: DataTypes.STRING },
  cell: { type: DataTypes.STRING, allowNull: false },
});
const CostService = sequelize.define("cost_service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameService: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  unitsOfCost: { type: DataTypes.STRING },
  cell: { type: DataTypes.STRING, allowNull: false },
});
const CostTransport = sequelize.define("cost_transport", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameTransport: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  unitsOfCost: { type: DataTypes.STRING },
  cell: { type: DataTypes.STRING, allowNull: false },
});
const Section = sequelize.define(
  "section",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

User.hasMany(TechCart);
TechCart.belongsTo(User);

TechCart.hasMany(TechOperation, { onDelete: "CASCADE" });
TechOperation.belongsTo(TechCart);

TechOperation.hasOne(CostMaterial, { onDelete: "CASCADE" });
CostMaterial.belongsTo(TechOperation);

TechOperation.hasOne(CostService, { onDelete: "CASCADE" });
CostService.belongsTo(TechOperation);

TechOperation.hasOne(CostTransport, { onDelete: "CASCADE" });
CostTransport.belongsTo(TechOperation);

Section.hasMany(TechOperation);
TechOperation.belongsTo(Section);

module.exports = {
  User,
  TechCart,
  TechOperation,
  CostMaterial,
  CostService,
  CostTransport,
  Section,
};
