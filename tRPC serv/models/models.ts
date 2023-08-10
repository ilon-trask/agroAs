import sequelize from "../db";
import { DataTypes, Model } from "sequelize";
import { Icell } from "../controllers/OperService";
import { IoutcomeGroup, IoutcomeType } from "../controllers/outComeService";
import { CreditPurposeType } from "../../tsClient/src/shared/hook/useCreditPurpose";
import { InvestmentOriginType } from "../../tsClient/src/shared/hook/useInvestmentOrigin";
import { DerjPurposeType } from "../../tsClient/src/shared/hook/useDerjPurpose";
import { GrantPurposeType } from "../../tsClient/src/shared/hook/useGrantPurpose";
import { BuyingMachinePurposeType } from "../../tsClient/src/shared/hook/useBuyingMachinePurpose";
import { AdministrationPurposeType } from "../../tsClient/src/shared/hook/useAdministrationPurpose";
import { AdministrationPeriodCalcType } from "../../tsClient/src/shared/hook/useAdministrationPeriodCalc";
import { EnterpriseFormType } from "../../tsClient/src/shared/hook/useEnterpriseForm";
import { EnterpriseTaxGroupType } from "../../tsClient/src/shared/hook/useEnterpriseTaxGroup";
import { WorkerClassesType } from "../../tsClient/src/shared/hook/useWorkersClasses";
import { RepaymentsMethodsType } from "../../tsClient/src/shared/hook/useRepaymentMethods";
import { PaymentsFrequencysType } from "../../tsClient/src/shared/hook/usePaymentsFrequencys";
import { VegetationYearsType } from "../../tsClient/src/shared/hook/useVegetationYears";
import { CreditCalculationMethodType } from "../../tsClient/src/shared/hook/useCreditCalculationMethod";
import { CreditCalculationTypeType } from "../../tsClient/src/shared/hook/useCreditCalculationType";
import { FinancingType } from "../../tsClient/src/shared/hook/useFinancingType";
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
  totalCostCars?: number;
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
  createdAt?: Date;
  updatedAt?: Date;
  timesDow?: number;
  cultureId?: number;
  cultivationTechnologyId?: number;
  isComplex?: boolean;
  sectionId?: number | null;
  year: VegetationYearsType;
  isBasic: boolean | null;
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
  declare totalCostCars?: number;
  declare totalCostServices?: number;
  declare totalCostTransport?: number;
  declare totalCostMaterials?: number;
  declare totalCostMachineWork?: number;
  declare totalCostFuel?: number;
  declare totalCostHandWork?: number;
  declare timesDow?: number;
  declare isComplex?: boolean;
  declare sectionId?: number;
  declare cultivationTechnologyId?: number;
  declare isBasic: boolean | null;
  declare year: VegetationYearsType;
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
    totalCostCars: { type: DataTypes.NUMBER, defaultValue: 0 },
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
    year: { type: DataTypes.STRING },
    isBasic: { type: DataTypes.BOOLEAN },
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
  createdAt?: Date;
  updatedAt?: Date;
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
  createdAt?: Date;
  updatedAt?: Date;
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
  createdAt?: Date;
  updatedAt?: Date;
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
  initialAmount: number;
  topic: string;
  dateStart: string;
  realizationTime: number;
  cultures?: Iculture[];
  isPublic?: boolean;
  isAgree?: boolean;
  description?: string;
  enterpriseId?: number | null;
  userId: string;
  goal: string | null | undefined;
  responsiblePerson: string | null | undefined;
  city: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}
export class businessPlan extends Model<IbusinessPlan> {
  declare id?: number;
  declare name: string;
  declare initialAmount: number;
  declare goal: string | null | undefined;
  declare responsiblePerson: string | null | undefined;
  declare city: string | null | undefined;
  declare dateStart: string;
  declare realizationTime: number;
  declare isPublic?: boolean;
  declare isAgree?: boolean;
  declare description?: string;
  declare userId: string;
}
businessPlan.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    topic: { type: DataTypes.TEXT },
    name: { type: DataTypes.STRING, allowNull: false },
    goal: { type: DataTypes.TEXT },
    responsiblePerson: { type: DataTypes.TEXT },
    city: { type: DataTypes.TEXT },
    initialAmount: { type: DataTypes.INTEGER },
    dateStart: { type: DataTypes.DATEONLY },
    realizationTime: { type: DataTypes.INTEGER },
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

export interface IbusProd {
  id?: number;
  businessPlanId?: number;
  productId?: number;
  cultivationTechnologyId?: number;
  area: number;
  year: number;
  techCartId?: number;
  price?: number | null;
}
export class busProd extends Model<IbusProd> {
  declare id?: number;
  declare businessPlanId?: number;
  declare productId?: number;
  declare cultivationTechnologyId?: number;
  declare area: number;
  declare year: number;
  declare techCartId?: number;
  declare price: number;
}
busProd.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    area: { type: DataTypes.FLOAT },
    year: { type: DataTypes.INTEGER },
    price: { type: DataTypes.FLOAT(2) },
  },
  { sequelize, timestamps: false }
);

export interface IcultivationTechnologies {
  id?: number;
  name: string;
  yieldFactor: number;
}
export class cultivationTechnologies extends Model<IcultivationTechnologies> {
  declare id?: number;
  declare name: string;
  declare yieldFactor: number;
}
cultivationTechnologies.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    yieldFactor: { type: DataTypes.FLOAT, defaultValue: 1 },
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
  createdAt?: Date;
  updatedAt?: Date;
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
  createdAt?: Date;
  updatedAt?: Date;
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
// export interface IyieldPlant {
//   id?: number;
//   userId?: string;
//   timesDow: number;
//   landingPeriod: YieldPlantLandingPeriodType;
//   cultureId?: number;
//   cultivationTechnologyId?: number;
//   productId?: number;
// }
// export class yieldPlant extends Model<IyieldPlant> {
//   declare id?: number;
//   declare userId?: string;
//   declare timesDow: number;
//   declare landingPeriod: YieldPlantLandingPeriodType;
//   declare cultivationTechnologyId?: number;
//   declare cultureId?: number;
//   declare productId?: number;
// }
// yieldPlant.init(
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     userId: { type: DataTypes.STRING, allowNull: false },
//     timesDow: { type: DataTypes.INTEGER },
//     landingPeriod: { type: DataTypes.STRING },
//   },
//   { sequelize }
// );
// export interface IyieldCalculation {
//   id?: number;
//   numberFruit: number;
//   fruitWeight: number;
//   numberFlower: number;
//   numberSocket: number;
//   cultureId?: number;
//   yieldRoll: number;
// }
// export class yieldCalculation extends Model<IyieldCalculation> {
//   declare id?: number;
//   declare numberFruit: number;
//   declare fruitWeight: number;
//   declare numberFlower: number;
//   declare numberSocket: number;
//   declare yieldPlantId?: number;
//   declare yieldRoll: number;
// }
// yieldCalculation.init(
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     numberFruit: { type: DataTypes.FLOAT },
//     fruitWeight: { type: DataTypes.FLOAT },
//     numberSocket: { type: DataTypes.FLOAT },
//     numberFlower: { type: DataTypes.FLOAT },
//     yieldRoll: { type: DataTypes.FLOAT },
//   },
//   { sequelize }
// );
export interface Iculture {
  id?: number;
  name: string;
  product: string;
  priceBerry: number;
  collectPeriod: "I квартал" | "II квартал" | "III квартал" | "IV квартал";
}
export class culture extends Model<Iculture> {
  declare id?: number;
  declare name: string;
  declare product: string;
  declare priceBerry: number;
  declare collectPeriod:
    | "I квартал"
    | "II квартал"
    | "III квартал"
    | "IV квартал";
}
culture.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    product: { type: DataTypes.STRING },
    priceBerry: { type: DataTypes.INTEGER },
    collectPeriod: { type: DataTypes.STRING },
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
  createdAt?: Date;
  updatedAt?: Date;
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
// export interface Iincome {
//   id?: number;
//   type: IncomeType;
//   group: IncomeGroup;
//   isUsing: boolean;
//   UserId: string;
//   saleId?: number | null;
//   financingId?: number | null;
// }
// export class income extends Model<Iincome> {
//   declare id?: number;
//   declare type: IncomeType;
//   declare group: IncomeGroup;
//   declare UserId: string;
//   declare isUsing: boolean;
//   declare saleId?: number;
//   declare financingId?: number;
// }
// income.init(
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     type: { type: DataTypes.STRING, allowNull: false },
//     group: { type: DataTypes.STRING },
//     isUsing: { type: DataTypes.BOOLEAN },
//     UserId: { type: DataTypes.STRING, allowNull: false },
//   },
//   { sequelize }
// );

export interface Ioutcome {
  id?: number;
  name: string;
  date: string;
  year: number;
  group: IoutcomeGroup;
  type: IoutcomeType | null;
  costMonth: number | null;
  costYear?: number;
  userId: string;
  isUsing?: boolean;
  techCartId?: number;
  buyingMachineId?: number;
  administrationId?: number;
  businessPlanId?: number;
  isDefault?: boolean;
}
export class outcome extends Model<Ioutcome> {
  declare id?: number;
  declare date: string;
  declare year: number;
  declare name: string;
  declare costMonth: number;
  declare group: IoutcomeGroup;
  declare type: IoutcomeType;
  declare isUsing: boolean;
  declare userId: string;
  declare businessPlanId: number;
}
outcome.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    costMonth: { type: DataTypes.FLOAT(2) },
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
  unitMeasure: "кг" | "шт" | null;
  collectPeriod: string;
  userId: string;
  cultureId?: number;
}
export class product extends Model<Iproduct> {
  declare id?: number;
  declare name: string;
  declare unitMeasure: "кг" | "шт" | null;
  declare collectPeriod: string;
  declare userId: string;
  declare cultureId?: number;
}
product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    unitMeasure: { type: DataTypes.STRING },
    collectPeriod: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
export interface Iproduction {
  id?: number;
  isPrimary: boolean;
  year: number;
  productId?: number;
  techCartId?: number;
  isPlan: boolean;
  userId: string;
}
export class production extends Model<Iproduction> {
  declare id?: number;
  declare isPrimary: boolean;
  declare year: number;
  declare productId?: number;
  declare techCartId?: number;
  declare isPlan: boolean;
  declare userId: string;
}
production.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    year: { type: DataTypes.INTEGER },
    isPrimary: { type: DataTypes.BOOLEAN, allowNull: false },
    isPlan: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
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
  isPlan: boolean;
  userId: string;
}
export class sale extends Model<Isale> {
  declare id?: number;
  declare date: string;
  declare amount: number;
  declare price: number;
  declare productionId?: number;
  declare isPlan: boolean;
  declare userId: string;
}
sale.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY },
    amount: { type: DataTypes.FLOAT(2) },
    price: { type: DataTypes.FLOAT(2) },
    isPlan: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
export interface Ifinancing {
  id?: number;
  type: FinancingType;
  name: string;
  date: string;
  year: number;
  month: number | null;
  cost: number;
  purpose:
    | CreditPurposeType
    | InvestmentOriginType
    | DerjPurposeType
    | GrantPurposeType;
  isUseCost: boolean;
  typeName?: "Кредит" | "Державна підтримка" | "Грант" | "Інвестиції" | null;
  calculationMethod: CreditCalculationMethodType;
  calculationType: CreditCalculationTypeType | null;
  cultureId?: number | null;
  userId?: string;
  createdAt?: Date;
}
export class financing extends Model<Ifinancing> {
  declare id?: number;
  declare name: string;
  declare type: FinancingType;
  declare date: string;
  declare year: number;
  declare month: number;
  declare cost: number;
  declare cultureId?: number;
  declare purpose:
    | CreditPurposeType
    | InvestmentOriginType
    | DerjPurposeType
    | GrantPurposeType;
  declare calculationMethod: CreditCalculationMethodType;
  declare calculationType: CreditCalculationTypeType;
  declare isUseCost: boolean;
  declare userId?: string;
}
financing.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cost: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    date: { type: DataTypes.DATEONLY },
    year: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    purpose: { type: DataTypes.STRING },
    isUseCost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    calculationMethod: { type: DataTypes.STRING },
    calculationType: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },

  { sequelize }
);

export interface Ibuying_machine {
  id?: number;
  name: string;
  brand: string;
  date: string;
  year: number;
  price: number;
  amount: number;
  purpose: BuyingMachinePurposeType | "МШП";
  amortization?: Iamortization | null;
  userId: string;
  businessPlanId?: number;
  enterpriseId?: number | null;
}
export class buying_machine extends Model<Ibuying_machine> {
  declare id?: number;
  declare name: string;
  declare brand: string;
  declare date: string;
  declare year: number;
  declare price: number;
  declare amount: number;
  declare purpose: BuyingMachinePurposeType | "МШП";
  declare userId: string;
}
buying_machine.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    brand: { type: DataTypes.STRING },
    date: { type: DataTypes.DATEONLY },
    year: { type: DataTypes.INTEGER },
    amount: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    purpose: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
export interface Iadministration {
  id?: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  price: number;
  cost?: number;
  purpose: AdministrationPurposeType;
  periodCalc: AdministrationPeriodCalcType;
  userId: string;
}
export class administration extends Model<Iadministration> {
  declare id?: number;
  declare name: string;
  declare price: number;
  declare dateFrom: string;
  declare dateTo: string;
  declare purpose: AdministrationPurposeType;
  declare periodCalc: AdministrationPeriodCalcType;
  declare userId: string;
}
administration.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    dateFrom: { type: DataTypes.DATEONLY },
    dateTo: { type: DataTypes.DATEONLY },
    periodCalc: { type: DataTypes.STRING },
    purpose: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);

export interface Ienterprise {
  id?: number;
  name: string;
  form: EnterpriseFormType;
  taxGroup: EnterpriseTaxGroupType;
  leader?: string;
  leaderEducation?: string;
  userId: string;
}
export class enterprise extends Model<Ienterprise> {
  declare id?: number;
  declare name: string;
  declare form: EnterpriseFormType;
  declare taxGroup: EnterpriseTaxGroupType;
  declare userId: string;
}
enterprise.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    form: { type: DataTypes.STRING },
    taxGroup: { type: DataTypes.STRING },
    leader: { type: DataTypes.STRING },
    leaderEducation: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize }
);
export interface Ijob {
  id?: number;
  name: string;
  isFOPWith: boolean;
  isFOP: boolean;
  isQO: boolean;
  userId: string | null;
}
export class job extends Model<Ijob> {
  declare id?: number;
  declare name: string;
  declare isFOPWith: boolean;
  declare isFOP: boolean;
  declare isQO: boolean;
  declare userId: string | null;
}
job.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    isFOPWith: { type: DataTypes.BOOLEAN },
    isFOP: { type: DataTypes.BOOLEAN },
    isQO: { type: DataTypes.BOOLEAN },
    userId: { type: DataTypes.STRING },
  },
  { sequelize }
);
export interface Iworker {
  id?: number;
  isConst: boolean;
  salary: number;
  amount: number;
  dateFrom: string;
  dateTo: string;
  class: WorkerClassesType;
  form: EnterpriseFormType;
  userId: string;
  amountOfMounths?: number;
  year: number;
  enterpriseId?: number;
  jobId?: number;
  businessPlanId?: number;
}

export class worker extends Model<Iworker> {
  declare id: number;
  declare isConst: boolean;
  declare salary: number;
  declare amount: number;
  declare dateFrom: string;
  declare dateTo: string;
  declare form: EnterpriseFormType;
  declare class: WorkerClassesType;
  declare year: number;
  declare userId: string;
  declare businessPlanId: number;
}
worker.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER },
    salary: { type: DataTypes.INTEGER },
    isConst: { type: DataTypes.BOOLEAN },
    dateFrom: { type: DataTypes.DATEONLY },
    dateTo: { type: DataTypes.DATEONLY },
    class: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    form: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING },
  },
  {
    sequelize,
    defaultScope: {
      order: [["createdAt", "ASC"]],
    },
  }
);

export interface IvegetationYears {
  id?: number;
  year: VegetationYearsType | undefined;
  vegetationCoeff: number;
  technologyCoeff: number;
  seedlingsCoeff: number;
  allCoeff?: number;
  cultureId?: number;
  cultivationTechnologyId?: number;
  techCartId?: number | null;
  numberPlantsPerHectare: number;
  numberPerRoll: number;
  potentialYieldPerHectare?: number;
  busProdId?: number | null;
  businessPlanId?: number;
}

export class vegetationYears extends Model<IvegetationYears> {
  declare id?: number;
  declare year: VegetationYearsType;
  declare vegetationCoeff: number;
  declare technologyCoeff: number;
  declare seedlingsCoeff: number;
  declare busProdId?: number | null;
  declare numberPlantsPerHectare: number;
  declare numberPerRoll: number;
}
vegetationYears.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    vegetationCoeff: { type: DataTypes.FLOAT },
    seedlingsCoeff: { type: DataTypes.FLOAT },
    technologyCoeff: { type: DataTypes.FLOAT },
    year: { type: DataTypes.STRING },
    numberPlantsPerHectare: { type: DataTypes.FLOAT },
    numberPerRoll: { type: DataTypes.FLOAT },
  },

  { sequelize }
);
export interface Iland {
  readonly id?: number;
  name: string;
  cadastreNumber: number | null;
  year: number;
  area: number;
  userId: string;
  date: string;
  rate: number;
  rightOfUse: "Оренда" | "Власна";
  ownership: "Комунальна" | "Приватна" | "Державна" | "";
  readonly enterpriseId?: number | null;
  readonly businessPlanId?: number | null | undefined;
  readonly createdAt?: Date;
}
export class land extends Model<Iland> {
  declare id: number;
  declare name: string;
  declare cadastreNumber: number;
  declare year: number;
  declare area: number;
  declare userId: string;
  declare date: string;
  declare rate: number;
  declare rightOfUse: "Оренда" | "Власна";
  declare ownership: "Комунальна" | "Приватна" | "Державна" | "";
}
land.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    cadastreNumber: { type: DataTypes.STRING },
    area: { type: DataTypes.FLOAT },
    rate: { type: DataTypes.INTEGER },
    ownership: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
    rightOfUse: { type: DataTypes.STRING },
  },
  {
    sequelize,
    defaultScope: {
      order: [["createdAt", "ASC"]],
    },
  }
);

export interface Ibuilding {
  readonly id?: number;
  name: string;
  startPrice: number;
  // depreciationPeriod: number | null;
  date: string;
  year: number;
  description: string;
  // introductionDate: string | null;
  userId: string;
  // depreciationMonth?: number | null;
  amortization?: Iamortization | null;
  readonly enterpriseId?: number | null;
  readonly businessPlanId?: number | null;
}
export class building extends Model<Ibuilding> {
  declare id: number;
  declare name: string;
  declare date: string;
  declare year: number;
  declare description: string;
  declare startPrice: number;
  // declare introductionDate: string;
  // declare depreciationPeriod: number;
  declare userId: string;
}
building.init(
  {
    name: { type: DataTypes.STRING },
    startPrice: { type: DataTypes.DECIMAL(10, 2) },
    // depreciationPeriod: { type: DataTypes.INTEGER },
    date: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    userId: { type: DataTypes.STRING, allowNull: false },
    // introductionDate: { type: DataTypes.STRING },
  },
  { sequelize }
);
interface IFinancBus {
  businessPlanId?: number;
  financingId?: number;
}
export class financBus extends Model<IFinancBus> {
  declare businessPlanId: number;
  declare financingId: number;
}
export interface IcreditParameter {
  id?: number;
  procent: number;
  startDatePayments: string | null;
  monthlyСommission: number;
  commissionForCredit: number;
  repaymentMethod: RepaymentsMethodsType;
  paymentsFrequency: PaymentsFrequencysType;
  termType: "на бізнес-план" | "на роки" | null;
  creditTerm: number;
  financingId?: number;
}
export class creditParameter extends Model<IcreditParameter> {
  declare id: number;
  declare procent: number;
  declare startDatePayments: string;
  declare monthlyСommission: number;
  declare commissionForCredit: number;
  declare repaymentMethod: string;
  declare paymentsFrequency: string;
  declare termType: string;
  declare creditTerm: number;
  declare financingId?: number;
}
creditParameter.init(
  {
    procent: { type: DataTypes.FLOAT },
    startDatePayments: { type: DataTypes.STRING },
    monthlyСommission: { type: DataTypes.INTEGER },
    commissionForCredit: { type: DataTypes.INTEGER },
    repaymentMethod: { type: DataTypes.STRING },
    paymentsFrequency: { type: DataTypes.STRING },
    termType: { type: DataTypes.STRING },
    creditTerm: { type: DataTypes.INTEGER },
  },
  { sequelize }
);

export interface Iamortization {
  id?: number | null;
  introductionDate: string;
  year: number;
  depreciationPeriod: number;
  // amount: number;
  depreciationPerMonth?: number;
  buildingId?: number | null;
  buyingMachineId?: number | null;
}

export class amortization extends Model<Iamortization> {
  declare id?: number;
  declare introductionData: string;
  declare depreciationPeriod: number;
  // declare amount: number;
  declare year: number;
  declare buildingId?: number;
  declare buyingMachineId?: number;
}

amortization.init(
  {
    introductionDate: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    depreciationPeriod: { type: DataTypes.INTEGER },
    // amount: { type: DataTypes.INTEGER },
  },
  { sequelize }
);

financBus.init({}, { sequelize });
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

cultivationTechnologies.hasMany(busProd);

// businessPlan.belongsToMany(product, { through: busProd });
// product.belongsToMany(businessPlan, { through: busProd });
// cultivationTechnologies.belongsToMany(product, { through: busProd });
// businessPlan.belongsToMany(cultivationTechnologies, { through: busProd });
businessPlan.hasMany(busProd);
busProd.belongsTo(businessPlan);
product.hasMany(busProd);
busProd.belongsTo(product);
cultivationTechnologies.hasMany(busProd);
busProd.belongsTo(cultivationTechnologies);
tech_cart.hasMany(busProd);
busProd.belongsTo(tech_cart);
businessPlan.hasMany(vegetationYears);
vegetationYears.belongsTo(businessPlan);
busProd.hasOne(vegetationYears);
vegetationYears.belongsTo(busProd, { onDelete: "CASCADE" });

// yieldPlant.hasOne(yieldCalculation);
// yieldCalculation.belongsTo(yieldPlant);

// culture.hasOne(yieldPlant);
// yieldPlant.belongsTo(culture);

// product.hasOne(yieldPlant);
// yieldPlant.belongsTo(product);

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

// sale.hasOne(income);
// income.belongsTo(sale);

// financing.hasOne(income);
// income.belongsTo(financing);

buying_machine.hasOne(outcome);
outcome.belongsTo(buying_machine);

administration.hasOne(outcome);
outcome.belongsTo(administration);

businessPlan.hasMany(outcome);
outcome.belongsTo(businessPlan);
// (async () => {
//   let a = await culture.findOne({ where: { id: 3 } });
//   let b = await businessPlan.findOne({ where: { id: 5 } });
//   await b.addCulture(a);
// })();

enterprise.hasMany(businessPlan);
businessPlan.belongsTo(enterprise);

// cultivationTechnologies.hasMany(yieldPlant);
// yieldPlant.belongsTo(cultivationTechnologies);

culture.hasMany(tech_cart);
tech_cart.belongsTo(culture);

enterprise.hasOne(worker);
worker.belongsTo(enterprise);

job.hasOne(worker);
worker.belongsTo(job);

businessPlan.hasMany(worker);
worker.belongsTo(businessPlan);

cultivationTechnologies.hasMany(tech_cart);
tech_cart.belongsTo(cultivationTechnologies);

culture.hasMany(vegetationYears);
vegetationYears.belongsTo(culture);

cultivationTechnologies.hasMany(vegetationYears);
vegetationYears.belongsTo(cultivationTechnologies);

tech_cart.hasMany(vegetationYears);
vegetationYears.belongsTo(tech_cart);

businessPlan.hasMany(buying_machine);
buying_machine.belongsTo(businessPlan);

enterprise.hasMany(buying_machine);
buying_machine.belongsTo(enterprise);

enterprise.hasMany(land);
land.belongsTo(enterprise);

businessPlan.hasMany(land);
land.belongsTo(businessPlan);

enterprise.hasMany(building);
building.belongsTo(enterprise);

businessPlan.hasMany(building);
building.belongsTo(businessPlan);

culture.hasMany(financing);
financing.belongsTo(culture);

businessPlan.hasMany(financing);
financing.belongsTo(businessPlan);
// financing.belongsToMany(businessPlan,{through:financBus});
// businessPlan.belongsToMany(financing, { through: financBus });

// culture.hasMany(yieldCalculation);
// yieldCalculation.belongsTo(culture);
financing.hasOne(creditParameter);
creditParameter.belongsTo(financing);

building.hasOne(amortization);
amortization.belongsTo(building);

buying_machine.hasOne(amortization);
amortization.belongsTo(buying_machine);
