import sequelize from "../db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class user extends Model<
  InferAttributes<user>,
  InferCreationAttributes<user>
> {
  declare id: number;
  declare email: string;
  declare password: number;
  declare role?: number;
}

user.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
  },
  { sequelize }
);

// export const User = sequelize.define(
//   "user",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     email: { type: DataTypes.STRING, unique: true },
//     password: { type: DataTypes.STRING },
//     role: { type: DataTypes.STRING, defaultValue: "USER" },
//   },
//   { timestamps: false }
// );

interface Itech_cart {
  id?: number;
  nameCart: string;
  area: number;
  totalCost?: number;
  salary: number;
  priceDiesel: number;
  userId?: number;
}
export class tech_cart extends Model<Itech_cart> {
  declare id: number;
  declare nameCart: string;
  declare area: number;
  declare totalCost: number;
  declare salary: number;
  declare priceDiesel: number;
  declare userId?: number;
}

tech_cart.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameCart: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    area: { type: DataTypes.INTEGER, allowNull: false },
    totalCost: { type: DataTypes.INTEGER, allowNull: false },
    salary: { type: DataTypes.INTEGER, allowNull: false },
    priceDiesel: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize }
);
// export const TechCart = sequelize.define(
//   "tech_cart",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     nameCart: { type: DataTypes.STRING, allowNull: false },
//     area: { type: DataTypes.INTEGER, allowNull: false },
//     totalCost: { type: DataTypes.INTEGER },
//     salary: { type: DataTypes.INTEGER, allowNull: false },
//     priceDiesel: { type: DataTypes.INTEGER, allowNull: false },
//   }
//   // { timestamps: false }
// );

export class tech_operation extends Model<
  InferAttributes<tech_operation>,
  InferCreationAttributes<tech_operation>
> {
  declare id?: number;
  declare nameOperation: string;
  declare cell: string;
  declare costCars?: number;
  declare costFuel?: number;
  declare costMachineWork?: number;
  declare costHandWork?: number;
  declare costMaterials?: number;
  declare costTransport?: number;
  declare costServices?: number;
  declare techCartId?: number;
  declare sectionId?: number;
}

tech_operation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameOperation: { type: DataTypes.STRING },
    cell: { type: DataTypes.STRING, allowNull: false },
    costCars: { type: DataTypes.INTEGER },
    costFuel: { type: DataTypes.INTEGER },
    costMachineWork: { type: DataTypes.INTEGER },
    costHandWork: { type: DataTypes.INTEGER },
    costMaterials: { type: DataTypes.INTEGER },
    costTransport: { type: DataTypes.INTEGER },
    costServices: { type: DataTypes.INTEGER },
  },
  { sequelize }
);
// export const tech_operation = sequelize.define(
//   "tech_operation",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     nameOperation: { type: DataTypes.STRING },
//     // amountWork: { type: DataTypes.INTEGER },
//     // unitOfWork: { type: DataTypes.STRING },
//     cell: { type: DataTypes.STRING, allowNull: false },
//     costCars: { type: DataTypes.INTEGER },
//     costFuel: { type: DataTypes.INTEGER },
//     costMachineWork: { type: DataTypes.INTEGER },
//     costHandWork: { type: DataTypes.INTEGER },
//     cost_materials: { type: DataTypes.INTEGER },
//     costTransport: { type: DataTypes.INTEGER },
//     costServices: { type: DataTypes.INTEGER },
//   }
//   // { timestamps: false }
// );

export class cost_material extends Model<
  InferAttributes<cost_material>,
  InferCreationAttributes<cost_material>
> {
  declare id?: number;
  declare nameMaterials: string;
  declare price: number;
  declare unitsOfCost: string;
  declare consumptionPerHectare: number;
  declare unitsOfConsumption: string;
  declare techOperationId?: number;
}

cost_material.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameMaterials: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    unitsOfCost: { type: DataTypes.STRING },
    consumptionPerHectare: { type: DataTypes.INTEGER },
    unitsOfConsumption: { type: DataTypes.STRING },
  },
  { sequelize }
);

// export const cost_material = sequelize.define(
//   "cost_material",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     nameMaterials: { type: DataTypes.STRING, allowNull: false },
//     price: { type: DataTypes.INTEGER, allowNull: false },
//     unitsOfCost: { type: DataTypes.STRING },
//     consumptionPerHectare: { type: DataTypes.INTEGER, allowNull: false },
//     unitsOfConsumption: { type: DataTypes.STRING },
//     cell: { type: DataTypes.STRING, allowNull: false },
//   }
//   // { timestamps: false }
// );

export class cost_service extends Model<
  InferAttributes<cost_service>,
  InferCreationAttributes<cost_service>
> {
  declare id?: number;
  declare nameService: string;
  declare price: number;
  declare unitsOfCost: string;
  declare techOperationId?: number;
}

cost_service.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameService: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    unitsOfCost: { type: DataTypes.STRING },
  },
  { sequelize }
);

// export const CostService = sequelize.define(
//   "cost_service",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     nameService: { type: DataTypes.STRING, allowNull: false },
//     price: { type: DataTypes.INTEGER, allowNull: false },
//     unitsOfCost: { type: DataTypes.STRING },
//     cell: { type: DataTypes.STRING, allowNull: false },
//   }
//   // { timestamps: false }
// );

export class cost_transport extends Model<
  InferAttributes<cost_transport>,
  InferCreationAttributes<cost_transport>
> {
  declare id?: number;
  declare nameTransport: string;
  declare price: number;
  declare unitsOfCost: string;
  declare techOperationId?: number;
}

cost_transport.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameTransport: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    unitsOfCost: { type: DataTypes.STRING },
  },
  { sequelize }
);

// export const CostTransport = sequelize.define(
//   "cost_transport",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     nameTransport: { type: DataTypes.STRING, allowNull: false },
//     price: { type: DataTypes.INTEGER, allowNull: false },
//     unitsOfCost: { type: DataTypes.STRING },
//     cell: { type: DataTypes.STRING, allowNull: false },
//   }
//   // { timestamps: false }
// );

const Section = sequelize.define(
  "section",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
export default Section;

interface Itractor {
  id?: number;
  nameTractor: string;
  brand: string;
  marketCost: number;
  depreciationPeriod: number;
  enginePower: number;
  fuelConsumption: number;
  numberOfPersonnel: number;
  typeOfWork: number;
  userId?: number;
}
export class tractor extends Model<Itractor> {
  declare id: number;
  declare nameTractor: string;
  declare brand: string;
  declare marketCost: number;
  declare depreciationPeriod: number;
  declare enginePower: number;
  declare fuelConsumption: number;
  declare numberOfPersonnel: number;
  declare typeOfWork: number;
  declare userId?: number;
}

tractor.init(
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
  { sequelize }
);

interface Imachine {
  id?: number;
  nameMachine: string;
  brand: string;
  marketCost: number;
  depreciationPeriod: number;
  widthOfCapture: number;
  workingSpeed: number;
  numberOfServicePersonnel: number;
  typeOfWork: number;
  userId?: number;
}
export class agricultural_machine extends Model<Imachine> {
  declare id: number;
  declare nameMachine: string;
  declare brand: string;
  declare marketCost: number;
  declare depreciationPeriod: number;
  declare widthOfCapture: number;
  declare workingSpeed: number;
  declare numberOfServicePersonnel: number;
  declare typeOfWork: number;
  declare userId?: number;
}

agricultural_machine.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameMachine: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    brand: { type: DataTypes.STRING, allowNull: false },
    marketCost: { type: DataTypes.INTEGER, allowNull: false },
    depreciationPeriod: { type: DataTypes.INTEGER, allowNull: false },
    widthOfCapture: { type: DataTypes.FLOAT, allowNull: false },
    workingSpeed: { type: DataTypes.INTEGER, allowNull: false },
    numberOfServicePersonnel: { type: DataTypes.INTEGER, allowNull: false },
    typeOfWork: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize }
);
// export const AgriculturalMachine = sequelize.define(
//   "agricultural_machine",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     nameMachine: { type: DataTypes.STRING, allowNull: false },
//     brand: { type: DataTypes.STRING, allowNull: false },
//     marketCost: { type: DataTypes.INTEGER, allowNull: false },
//     depreciationPeriod: { type: DataTypes.INTEGER, allowNull: false },
//     widthOfCapture: { type: DataTypes.FLOAT, allowNull: false },
//     workingSpeed: { type: DataTypes.INTEGER, allowNull: false },
//     numberOfServicePersonnel: { type: DataTypes.INTEGER, allowNull: false },
//     typeOfWork: { type: DataTypes.INTEGER, allowNull: false },
//   },
//   { timestamps: false }
// );

export class aggregate extends Model<
  InferAttributes<aggregate>,
  InferCreationAttributes<aggregate>
> {
  declare id?: number;
  declare amountOfTractorDepreciationPerHour: number;
  declare fuelConsumption: number;
  declare pricePerHourServicePersonnel?: number;
  declare amountOfMachineDepreciationPerHour: number;
  declare unitProductionAggregate: number;
  declare workingSpeed: number;
  declare pricePerHourDiesel?: number;
  declare techOperationId?: number;
  declare tractorId?: number;
  declare agriculturalMachineId?: number;
}

aggregate.init(
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
  { sequelize }
);

// export const Aggregate = sequelize.define(
//   "aggregate",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     amountOfTractorDepreciationPerHour: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     fuelConsumption: { type: DataTypes.INTEGER, allowNull: false },
//     pricePerHourServicePersonnel: { type: DataTypes.INTEGER },
//     amountOfMachineDepreciationPerHour: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     unitProductionAggregate: { type: DataTypes.INTEGER, allowNull: false },
//     workingSpeed: { type: DataTypes.INTEGER, allowNull: false },
//     pricePerHourDiesel: { type: DataTypes.INTEGER },
//   },
//   { timestamps: false }
// );
user.hasMany(tech_cart);
tech_cart.belongsTo(user);

tech_cart.hasMany(tech_operation, { onDelete: "CASCADE" });
tech_operation.belongsTo(tech_cart);

tech_operation.hasOne(cost_material, { onDelete: "CASCADE" });
cost_material.belongsTo(tech_operation);

tech_operation.hasOne(cost_service, { onDelete: "CASCADE" });
cost_service.belongsTo(tech_operation);

tech_operation.hasOne(cost_transport, { onDelete: "CASCADE" });
cost_transport.belongsTo(tech_operation);

Section.hasMany(tech_operation);
tech_operation.belongsTo(Section);

user.hasMany(tractor);
tractor.belongsTo(user);

user.hasMany(agricultural_machine);
agricultural_machine.belongsTo(user);

tech_operation.hasOne(aggregate);
aggregate.belongsTo(tech_operation);

tractor.hasMany(aggregate);
aggregate.belongsTo(tractor);

agricultural_machine.hasMany(aggregate);
aggregate.belongsTo(agricultural_machine);
