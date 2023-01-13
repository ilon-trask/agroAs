const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
  },
  { timestamps: false }
);

const TechCart = sequelize.define(
  "tech_cart",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameCart: { type: DataTypes.STRING, allowNull: false },
    area: { type: DataTypes.INTEGER, allowNull: false },
    totalCost: { type: DataTypes.INTEGER },
    salary: { type: DataTypes.INTEGER, allowNull: false },
    priceDiesel: { type: DataTypes.INTEGER, allowNull: false },
  }
  // { timestamps: false }
);

const TechOperation = sequelize.define(
  "tech_operation",
  {
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
  }
  // { timestamps: false }
);

const CostMaterial = sequelize.define(
  "cost_material",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameMaterials: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    unitsOfCost: { type: DataTypes.STRING },
    consumptionPerHectare: { type: DataTypes.INTEGER, allowNull: false },
    unitsOfConsumption: { type: DataTypes.STRING },
    cell: { type: DataTypes.STRING, allowNull: false },
  }
  // { timestamps: false }
);
const CostService = sequelize.define(
  "cost_service",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameService: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    unitsOfCost: { type: DataTypes.STRING },
    cell: { type: DataTypes.STRING, allowNull: false },
  }
  // { timestamps: false }
);
const CostTransport = sequelize.define(
  "cost_transport",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameTransport: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    unitsOfCost: { type: DataTypes.STRING },
    cell: { type: DataTypes.STRING, allowNull: false },
  }
  // { timestamps: false }
);
const Section = sequelize.define(
  "section",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

const Tractor = sequelize.define(
  "tractor",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameTractor: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    brand: { type: DataTypes.STRING, allowNull: false },
    marketCost: { type: DataTypes.INTEGER, allowNull: false },
    depreciationPeriod: { type: DataTypes.INTEGER, allowNull: false },
    enginePower: { type: DataTypes.INTEGER, allowNull: false },
    fuelConsumption: { type: DataTypes.INTEGER, allowNull: false },
    numberOfPersonnel: { type: DataTypes.INTEGER, allowNull: false },
    typeOfWork: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false }
);

const AgriculturalMachine = sequelize.define(
  "agricultural_machine",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameMachine: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    marketCost: { type: DataTypes.INTEGER, allowNull: false },
    depreciationPeriod: { type: DataTypes.INTEGER, allowNull: false },
    widthOfCapture: { type: DataTypes.FLOAT, allowNull: false },
    workingSpeed: { type: DataTypes.INTEGER, allowNull: false },
    numberOfServicePersonnel: { type: DataTypes.INTEGER, allowNull: false },
    typeOfWork: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false }
);

const Aggregate = sequelize.define(
  "aggregate",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amountOfTractorDepreciationPerHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fuelConsumption: { type: DataTypes.INTEGER, allowNull: false },
    pricePerHourServicePersonnel: { type: DataTypes.INTEGER },
    amountOfMachineDepreciationPerHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitProductionAggregate: { type: DataTypes.INTEGER, allowNull: false },
    workingSpeed: { type: DataTypes.INTEGER, allowNull: false },
    pricePerHourDiesel: { type: DataTypes.INTEGER },
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

User.hasMany(Tractor);
Tractor.belongsTo(User);

User.hasMany(AgriculturalMachine);
AgriculturalMachine.belongsTo(User);

TechOperation.hasOne(Aggregate);
Aggregate.belongsTo(TechOperation);

Tractor.hasMany(Aggregate);
Aggregate.belongsTo(Tractor);

AgriculturalMachine.hasMany(Aggregate);
Aggregate.belongsTo(AgriculturalMachine);

module.exports = {
  User,
  TechCart,
  TechOperation,
  CostMaterial,
  CostService,
  CostTransport,
  Section,
  Tractor,
  AgriculturalMachine,
  Aggregate,
};
