import sequelize from "../db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { IncomeType } from "../../tsClient/src/pages/hook/useIncomeTypes";
import { IncomeGroup } from "../../tsClient/src/pages/hook/useIncomeGroup";
import { Icell } from "../controllers/OperService";
import { string } from "zod";
import { resTechCartsWithOpers } from "../controllers/TechCartService";
import { IoutcomeGroup, IoutcomeType } from "../controllers/outComeService";

export interface Iuser {
  id?: number;
  email: string;
  password: string;
  role: number;
}

export class user extends Model<Iuser> {
  declare id: number;
  declare email: string;
  declare password: string;
  declare role: number;
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

export interface Itech_cart {
  id?: number;
  nameCart: string;
  area: number;
  costHectare?: number;
  totalCostMachines?: number;
  totalCostServices?: number;
  totalCostTransport?: number;
  totalCostMaterials?: number;
  totalCostMachineWork?: number;
  totalCostFuel?: number;
  totalCostHandWork?: number;
  salary: number;
  priceDiesel: number;
  isPublic?: boolean;
  userId: string;
  culturesTypeId?: number;
  authorName?: string;
  isAgree?: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  timesDow?: number;
  cultureId?: number;
  cultivationTechnologyId?: number;
  isComplex?: boolean;
  sectionId?: number | null;
}
export class tech_cart extends Model<Itech_cart> {
  declare id: number;
  declare nameCart: string;
  declare area: number;
  declare salary: number;
  declare priceDiesel: number;
  declare isPublic?: boolean;
  declare userId: string;
  declare authorName?: string;
  declare isAgree?: boolean;
  declare description?: string;
  declare costHectare?: number;
  declare totalCostMachines?: number;
  declare totalCostServices?: number;
  declare totalCostTransport?: number;
  declare totalCostMaterials?: number;
  declare totalCostMachineWork?: number;
  declare totalCostFuel?: number;
  declare totalCostHandWork?: number;
  declare timesDow?: number;
  declare isComplex?: boolean;
  declare sectionId?: number;
}

tech_cart.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameCart: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    area: { type: DataTypes.INTEGER, allowNull: false },
    salary: { type: DataTypes.INTEGER, allowNull: false },
    priceDiesel: { type: DataTypes.INTEGER, allowNull: false },
    isPublic: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    authorName: { type: DataTypes.STRING },
    isAgree: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: { type: DataTypes.STRING },
    costHectare: { type: DataTypes.NUMBER, defaultValue: 0 },
    totalCostMachines: { type: DataTypes.NUMBER, defaultValue: 0 },
    totalCostServices: { type: DataTypes.NUMBER, defaultValue: 0 },
    totalCostTransport: { type: DataTypes.NUMBER, defaultValue: 0 },
    totalCostMaterials: { type: DataTypes.NUMBER, defaultValue: 0 },
    totalCostMachineWork: { type: DataTypes.NUMBER, defaultValue: 0 },
    totalCostFuel: { type: DataTypes.NUMBER, defaultValue: 0 },
    totalCostHandWork: { type: DataTypes.NUMBER, defaultValue: 0 },
    timesDow: { type: DataTypes.NUMBER, defaultValue: 0 },
    isComplex: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { sequelize }
  // { sequelize, timestamps: false }
);

export interface Ispecial_work {
  id?: number;
  nameWork: string;
  area: number;
  salary: number;
  priceDiesel: number;
  totalCost?: number;
  isPublic?: boolean;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export class special_work extends Model<Ispecial_work> {
  declare id: number;
  declare nameWork: string;
  declare area: number;
  declare salary: number;
  declare priceDiesel: number;
  declare isPublic?: boolean;
  declare userId: string;
}
special_work.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameWork: { type: DataTypes.STRING, allowNull: false },
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
  date?: string | null;
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
  createdAt?: string;
  updatedAt?: string;
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
    date: { type: DataTypes.STRING },
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
  purposeMaterialId?: number;
}

export class cost_material extends Model<Icost_material> {
  declare id?: number;
  declare nameMaterials: string;
  declare price: number;
  declare unitsOfCost: string;
  declare consumptionPerHectare: number;
  declare unitsOfConsumption: string;
  declare techOperationId?: number;
  declare purposeMaterialId?: number;
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
  copiedFromId?: number;
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
  declare copiedFromId?: number;
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
    copiedFromId: { type: DataTypes.NUMBER },
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
  depreciationPeri?: number;
  widthOfCapture: number;
  workingSpeed: number;
  numberOfServicePersonnel: number;
  numberOfServiceP?: number;
  userId?: string;
  gradeId?: number;
  copiedFromId?: number;
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
  declare copiedFromId?: number;
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
    copiedFromId: { type: DataTypes.NUMBER },
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
  mechHours?: number;
  createdAt?: string;
  updatedAt?: string;
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

export interface Icultures_types {
  id?: number;
  nameCulture: string;
}
export class cultures_types extends Model<Icultures_types> {
  declare id?: number;
  declare nameCulture: string;
}

cultures_types.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameCulture: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);

export interface IbusinessPlan {
  id?: number;
  name: string;
  businessCategoryId?: number;
  isPublic?: boolean;
  isAgree?: boolean;
  description?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
export class businessPlan extends Model<IbusinessPlan> {
  declare id?: number;
  declare name: string;
  declare isPublic?: boolean;
  declare isAgree?: boolean;
  declare description?: string;
  declare userId: string;
}
businessPlan.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAgree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    description: { type: DataTypes.STRING },
  },
  { sequelize }
);

export interface IcultivationTechnologies {
  id?: number;
  name: string;
}
export class cultivationTechnologies extends Model<IcultivationTechnologies> {
  declare id?: number;
  declare name: string;
}
cultivationTechnologies.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);

export interface Iresume {
  id?: number;
  aboutProject: string | null;
  investment: string | null;
  id_tableInvestment: number | null;
  finIndicators: string | null;
  deduction: string | null;
  businessPlanId?: number;
  createdAt?: string;
  updatedAt?: string;
}
export class resume extends Model<Iresume> {
  declare id?: number;
  declare aboutProject: string;
  declare investment: string;
  declare id_tableInvestment: number;
  declare finIndicators: string;
  declare deduction: string;
}

resume.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aboutProject: { type: DataTypes.STRING },
    investment: { type: DataTypes.STRING },
    id_tableInvestment: { type: DataTypes.NUMBER },
    finIndicators: { type: DataTypes.STRING },
    deduction: { type: DataTypes.STRING },
  },
  { sequelize }
);
export interface ItitlePage {
  id?: number;
  title: string | null;
  businessPlanId?: number;
  createdAt?: string;
  updatedAt?: string;
}
export class titlePage extends Model<ItitlePage> {
  declare id?: number;
  declare title: string;
}

titlePage.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
  },
  { sequelize }
);
export interface IyieldPlant {
  id?: number;
  userId?: string;
  comment: string;
  plantingDensity: number;
  yieldPerHectare: number;
  yieldPerRoll: number;
  timesDow: number;
  cultureId?: number;
}
export class yieldPlant extends Model<IyieldPlant> {
  declare id?: number;
  declare userId?: string;
  declare comment: string;
  declare plantingDensity: number;
  declare yieldPerHectare: number;
  declare yieldPerRoll: number;
  declare timesDow: number;
}
yieldPlant.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING },
    plantingDensity: { type: DataTypes.FLOAT },
    yieldPerHectare: { type: DataTypes.FLOAT },
    yieldPerRoll: { type: DataTypes.FLOAT },
    timesDow: { type: DataTypes.INTEGER },
  },
  { sequelize }
);
export interface IyieldCalculation {
  id?: number;
  numberFruit: number;
  fruitWeight: number;
  numberFlower: number;
  numberSocket: number;
  numberPlantsPerHectare: number;
  yieldPlantId?: number;
}
export class yieldCalculation extends Model<IyieldCalculation> {
  declare id?: number;
  declare numberFruit: number;
  declare fruitWeight: number;
  declare numberFlower: number;
  declare numberSocket: number;
  declare numberPlantsPerHectare: number;
  declare yieldPlantId?: number;
}
yieldCalculation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numberFruit: { type: DataTypes.FLOAT },
    fruitWeight: { type: DataTypes.FLOAT },
    numberSocket: { type: DataTypes.FLOAT },
    numberFlower: { type: DataTypes.FLOAT },
    numberPlantsPerHectare: { type: DataTypes.FLOAT },
  },
  { sequelize }
);
export interface Iculture {
  id?: number;
  name: string;
  product: string;
  priceBerry: number;
}
export class culture extends Model<Iculture> {
  declare id?: number;
  declare name: string;
  declare product: string;
  declare priceBerry: number;
}
culture.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    product: { type: DataTypes.STRING },
    priceBerry: { type: DataTypes.INTEGER },
  },
  { sequelize }
);
export interface Ipurpose_material {
  id?: number;
  purpose: string;
}
export class purpose_material extends Model<Ipurpose_material> {
  declare id?: number;
  declare purpose: string;
}
purpose_material.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    purpose: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
export interface ItechnologicalEconomicJustification {
  id?: number;
  comment: string | null;
  area: number;
  isPublic?: boolean;
  isAgree?: boolean;
  authorName?: string;
  publicComment?: string;
  techCartId?: number;
  cultureId?: number;
  cultivationTechnologyId?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}
export class technologicalEconomicJustification extends Model<ItechnologicalEconomicJustification> {
  declare id?: number;
  declare comment: string;
  declare area: number;
  declare isPublic?: boolean;
  declare isAgree?: boolean;
  declare publicComment?: string;
  declare authorName?: string;
  declare techCartId?: number;
  declare cultureId?: number;
  declare cultivationTechnologyId?: number;
  declare userId: string;
}
technologicalEconomicJustification.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.STRING },
    area: { type: DataTypes.INTEGER, allowNull: false },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAgree: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    publicComment: { type: DataTypes.STRING },
    authorName: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING },
  },
  { sequelize }
);
export interface Iincome {
  id?: number;
  type: IncomeType;
  group: IncomeGroup;
  isUsing: boolean;
  UserId: string;
  saleId?: number;
}
export class income extends Model<Iincome> {
  declare id?: number;
  declare type: IncomeType;
  declare group: IncomeGroup;
  declare UserId: string;
  declare isUsing: boolean;
  declare saleId?: number;
}
income.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    group: { type: DataTypes.STRING },
    isUsing: { type: DataTypes.BOOLEAN },
    UserId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);

export interface Ioutcome {
  id?: number;
  name: string;
  group: IoutcomeGroup;
  type: IoutcomeType;
  userId: string;
  isUsing?: boolean;
  techCartId?: number;
}
export class outcome extends Model<Ioutcome> {
  declare id?: number;
  declare name: string;
  declare group: IoutcomeGroup;
  declare type: IoutcomeType;
  declare isUsing: boolean;
  declare userId: string;
}
outcome.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    group: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    isUsing: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    userId: { type: DataTypes.STRING },
  },
  { sequelize }
);
export interface Iproduct {
  id?: number;
  name: string;
  price: number;
  cost: number;
  unitMeasure: string;
  userId: string;
  cultureId?: number;
}
export class product extends Model<Iproduct> {
  declare id?: number;
  declare name: string;
  declare price: number;
  declare cost: number;
  declare unitMeasure: string;
  declare userId: string;
  declare cultureId?: number;
}
product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT },
    cost: { type: DataTypes.FLOAT },
    unitMeasure: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
export interface Iproduction {
  id?: number;
  isPrimary: boolean;
  productId?: number;
  techCartId?: number;
  userId: string;
}
export class production extends Model<Iproduction> {
  declare id?: number;
  declare isPrimary: boolean;
  declare productId?: number;
  declare techCartId?: number;
  declare userId: string;
}
production.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isPrimary: { type: DataTypes.BOOLEAN, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
export interface Isale {
  id?: number;
  date: string;
  amount: number;
  price: number;
  productionId?: number;
  userId: string;
}
export class sale extends Model<Isale> {
  declare id?: number;
  declare date: string;
  declare amount: number;
  declare price: number;
  declare productionId?: number;
  declare userId: string;
}
sale.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY },
    amount: { type: DataTypes.FLOAT(2) },
    price: { type: DataTypes.FLOAT(2) },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
tech_cart.hasMany(tech_operation, { onDelete: "CASCADE" });
tech_operation.belongsTo(tech_cart);

tech_operation.hasOne(cost_material, { onDelete: "CASCADE" });
cost_material.belongsTo(tech_operation);

tech_operation.hasOne(cost_service, { onDelete: "CASCADE" });
cost_service.belongsTo(tech_operation);

tech_operation.hasOne(cost_transport, { onDelete: "CASCADE" });
cost_transport.belongsTo(tech_operation);

agricultural_machine.hasMany(aggregate);
aggregate.belongsTo(agricultural_machine);

section.hasMany(tech_operation);
tech_operation.belongsTo(section);

tech_operation.hasOne(aggregate);
aggregate.belongsTo(tech_operation);

tractor.hasMany(aggregate);
aggregate.belongsTo(tractor);

grade.hasMany(tractor);

grade.hasMany(agricultural_machine);

grade.hasMany(cost_hand_work);

tech_operation.hasOne(cost_hand_work);

cultures_types.hasMany(tech_cart);

// businessCategory.hasMany(businessPlan);

businessPlan.hasOne(resume);

businessPlan.hasOne(titlePage);

yieldPlant.hasOne(yieldCalculation);
yieldCalculation.belongsTo(yieldPlant);

culture.hasOne(yieldPlant);
yieldPlant.belongsTo(culture);

purpose_material.hasMany(cost_material);
cost_material.belongsTo(purpose_material);

culture.hasMany(technologicalEconomicJustification);
technologicalEconomicJustification.belongsTo(culture);

tech_cart.hasOne(technologicalEconomicJustification);
technologicalEconomicJustification.belongsTo(tech_cart);

cultivationTechnologies.hasMany(technologicalEconomicJustification);
technologicalEconomicJustification.belongsTo(cultivationTechnologies);

section.hasMany(tech_cart);
tech_cart.belongsTo(section);

tech_cart.hasOne(outcome);
outcome.belongsTo(tech_cart);

culture.hasMany(product);
product.belongsTo(culture);

product.hasMany(production);
production.belongsTo(product);
tech_cart.hasMany(production);
production.belongsTo(tech_cart);

production.hasMany(sale);
sale.belongsTo(production);

sale.hasOne(income);
income.belongsTo(sale);
