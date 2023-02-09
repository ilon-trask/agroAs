import sequelize from "../db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { Icell } from "../controllers/OperService";
import { string } from "zod";

// export interface Iuser {
//   id?: number;
//   email: string;
//   password: string;
//   role: number;
// }

// export class user extends Model<Iuser> {
//   declare id: number;
//   declare email: string;
//   declare password: string;
//   declare role: number;
// }

// user.init(
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     email: { type: DataTypes.STRING, unique: true },
//     password: { type: DataTypes.STRING },
//     role: { type: DataTypes.STRING, defaultValue: "USER" },
//   },
//   { sequelize }
// );

export interface Itech_cart {
  id?: number;
  nameCart: string;
  area: number;
  totalCost?: number;
  salary: number;
  priceDiesel: number;
  isPublic?: boolean;
  userId: string;
}
export class tech_cart extends Model<Itech_cart> {
  declare id: number;
  declare nameCart: string;
  declare area: number;
  declare salary: number;
  declare priceDiesel: number;
  declare isPublic?: boolean;
  declare userId: string;
}

tech_cart.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameCart: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    area: { type: DataTypes.INTEGER, allowNull: false },
    salary: { type: DataTypes.INTEGER, allowNull: false },
    priceDiesel: { type: DataTypes.INTEGER, allowNull: false },
    isPublic: { type: DataTypes.BOOLEAN },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Itech_operation {
  id?: number;
  nameOperation: string;
  cell: Icell;
  costCars?: number;
  costFuel?: number;
  costMachineWork?: number;
  costHandWork?: number;
  costMaterials?: number;
  costTransport?: number;
  costServices?: number;
  techCartId?: number;
  sectionId?: number;
}

export class tech_operation extends Model<Itech_operation> {
  declare id?: number;
  declare nameOperation: string;
  declare cell: Icell;
  declare techCartId?: number;
  declare sectionId?: number;
}

tech_operation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameOperation: { type: DataTypes.STRING },
    cell: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Icost_material {
  id?: number;
  nameOper?: string;
  nameMaterials: string;
  price: number;
  unitsOfCost: string;
  consumptionPerHectare: number;
  unitsOfConsumption: string;
  techOperationId?: number;
}

export class cost_material extends Model<Icost_material> {
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
    price: { type: DataTypes.FLOAT },
    unitsOfCost: { type: DataTypes.STRING },
    consumptionPerHectare: { type: DataTypes.FLOAT },
    unitsOfConsumption: { type: DataTypes.STRING },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Icost_service {
  id?: number;
  nameService: string;
  price: number;
  unitsOfCost: string;
  techOperationId?: number;
}

export class cost_service extends Model<Icost_service> {
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
    price: { type: DataTypes.FLOAT, allowNull: false },
    unitsOfCost: { type: DataTypes.STRING },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Icost_transport {
  id?: number;
  nameTransport: string;
  price: number;
  unitsOfCost: string;
  techOperationId?: number;
}

export class cost_transport extends Model<Icost_transport> {
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
    price: { type: DataTypes.FLOAT, allowNull: false },
    unitsOfCost: { type: DataTypes.STRING },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Isection {
  id: number;
  myId: number;
  name: string;
}

export class section extends Model<Isection> {
  declare id: number;
  declare myId: number;
  declare name: string;
}

section.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    myId: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Igrade {
  id: number;
  indicator: string;
  coefficient: number;
}

export class grade extends Model<Igrade> {
  declare id: number;
  declare indicator: string;
  declare coefficient: number;
}

grade.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    indicator: { type: DataTypes.STRING, primaryKey: true },
    coefficient: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Itractor {
  id?: number;
  nameTractor: string;
  brand: string;
  marketCost: number;
  depreciationPeriod: number;
  enginePower: number;
  fuelConsumption: number;
  numberOfPersonnel: number;
  userId?: string;
  gradeId?: number;
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
  declare userId: string;
  declare gradeId?: number;
}

tractor.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameTractor: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    brand: { type: DataTypes.STRING, allowNull: false },
    marketCost: { type: DataTypes.INTEGER, allowNull: false },
    depreciationPeriod: { type: DataTypes.INTEGER, allowNull: false },
    enginePower: { type: DataTypes.FLOAT, allowNull: false },
    fuelConsumption: { type: DataTypes.FLOAT, allowNull: false },
    numberOfPersonnel: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Imachine {
  id?: number;
  nameMachine: string;
  brand: string;
  marketCost: number;
  depreciationPeriod: number;
  widthOfCapture: number;
  workingSpeed: number;
  numberOfServicePersonnel: number;
  userId?: string;
  gradeId?: number;
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
  declare userId: string;
  declare gradeId?: number;
}

agricultural_machine.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameMachine: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    brand: { type: DataTypes.STRING, allowNull: false },
    marketCost: { type: DataTypes.INTEGER, allowNull: false },
    depreciationPeriod: { type: DataTypes.FLOAT, allowNull: false },
    widthOfCapture: { type: DataTypes.FLOAT, allowNull: false },
    workingSpeed: { type: DataTypes.FLOAT, allowNull: false },
    numberOfServicePersonnel: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Iaggregate {
  id?: number;
  amountOfTractorDepreciationPerHour?: number;
  fuelConsumption: number;
  pricePerHourServicePersonnel?: number;
  amountOfMachineDepreciationPerHour?: number;
  unitProductionAggregate?: number;
  workingSpeed: number;
  pricePerHourDiesel?: number;
  techOperationId?: number;
  tractorId?: number;
  agriculturalMachineId?: number;
}

export class aggregate extends Model<Iaggregate> {
  declare id?: number;
  declare amountOfTractorDepreciationPerHour?: number;
  declare fuelConsumption: number;
  declare pricePerHourServicePersonnel?: number;
  declare amountOfMachineDepreciationPerHour?: number;
  declare unitProductionAggregate?: number;
  declare workingSpeed: number;
  declare pricePerHourDiesel?: number;
  declare techOperationId?: number;
  declare tractorId?: number;
  declare agriculturalMachineId?: number;
}

aggregate.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fuelConsumption: { type: DataTypes.FLOAT, allowNull: false },
    workingSpeed: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Icost_hand_work {
  id?: number;
  nameOper: string;
  pricePerHourPersonnel?: number;
  salaryPerShift?: number;
  productionPerShift?: number;
  unitOfMeasurement?: string;
  productionRateTime?: number;
  productionRateWeight?: number;
  productionRateAmount?: number;
  yieldСapacity?: number;
  spending?: number;
  type: number;
  techOperationId?: number;
  gradeId?: number;
}

export class cost_hand_work extends Model<Icost_hand_work> {
  declare id?: number;
  declare nameOper: string;
  declare pricePerHourPersonnel?: number;
  declare salaryPerShift?: number;
  declare productionPerShift?: number;
  declare unitOfMeasurement?: string;
  declare productionRateTime?: number;
  declare productionRateWeight?: number;
  declare productionRateAmount?: number;
  declare yieldСapacity?: number;
  declare spending?: number;
  declare type: number;
  declare techOperationId?: number;
  declare gradeId?: number;
}

cost_hand_work.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameOper: { type: DataTypes.STRING, allowNull: false },
    pricePerHourPersonnel: { type: DataTypes.INTEGER },
    salaryPerShift: { type: DataTypes.INTEGER },
    productionPerShift: { type: DataTypes.INTEGER },
    unitOfMeasurement: { type: DataTypes.STRING },
    productionRateTime: { type: DataTypes.FLOAT },
    productionRateWeight: { type: DataTypes.FLOAT },
    productionRateAmount: { type: DataTypes.FLOAT },
    yieldСapacity: { type: DataTypes.FLOAT },
    spending: { type: DataTypes.FLOAT },
    type: { type: DataTypes.INTEGER },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

tech_cart.hasMany(tech_operation, { onDelete: "CASCADE" });
tech_operation.belongsTo(tech_cart);

tech_operation.hasOne(cost_material, { onDelete: "CASCADE" });
cost_material.belongsTo(tech_operation);

tech_operation.hasOne(cost_service, { onDelete: "CASCADE" });
cost_service.belongsTo(tech_operation);

tech_operation.hasOne(cost_transport, { onDelete: "CASCADE" });
cost_transport.belongsTo(tech_operation);

section.hasMany(tech_operation);
tech_operation.belongsTo(section);

tech_operation.hasOne(aggregate);
aggregate.belongsTo(tech_operation);

tractor.hasMany(aggregate);
aggregate.belongsTo(tractor);

agricultural_machine.hasMany(aggregate);
aggregate.belongsTo(agricultural_machine);

grade.hasMany(tractor);

grade.hasMany(agricultural_machine);

grade.hasMany(cost_hand_work);

tech_operation.hasOne(cost_hand_work);
