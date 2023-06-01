import { makeAutoObservable } from "mobx";
import { resYieldPlant } from "../../../tRPC serv/controllers/incomeService";
import {
  Ifinancing,
  Iculture,
  Iproduction,
  Isale,
  IvegetationYears,
  IyieldCalculation,
} from "../../../tRPC serv/models/models";

export default class IncomeStore {
  private _yieldPlant: resYieldPlant[] = [];
  private _cultural: Iculture[] = [];
  private _yieldCalc: IyieldCalculation[] = [];
  private _income: any[] = [];
  private _production: Iproduction[] = [];
  private _sale: Isale[] = [];
  private _credit: Ifinancing[] = [];
  private _investment: Ifinancing[] = [];
  private _derj: Ifinancing[] = [];
  private _grant: Ifinancing[] = [];
  private _vegetationYear: IvegetationYears[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  public set yieldPlant(data: resYieldPlant[]) {
    this._yieldPlant = data;
  }
  public set newYieldPlant(data: resYieldPlant) {
    if (!Array.isArray(this._yieldPlant)) {
      this._yieldPlant = [];
    }
    this._yieldPlant = [...this._yieldPlant, data];
  }

  public set cultural(data: Iculture[]) {
    this._cultural = data;
  }
  public set newCultural(data: Iculture) {
    this._cultural.push(data);
  }
  public set yieldCalc(data: IyieldCalculation[]) {
    this._yieldCalc = data;
  }
  public set newYieldCalc(data: IyieldCalculation) {
    this._yieldCalc.push(data);
  }
  public set income(data: any[]) {
    this._income = data;
  }
  public set newIncome(data: any) {
    this._income.push(data);
  }
  public set production(prod: Iproduction[]) {
    this._production = prod;
  }
  public set newProduction(prod: Iproduction) {
    this._production.push(prod);
  }
  public set sale(sale: Isale[]) {
    this._sale = sale;
  }
  public set newSale(sale: Isale) {
    this._sale.push(sale);
  }
  public set credit(credit: Ifinancing[]) {
    this._credit = credit;
  }
  public set newCredit(credit: Ifinancing) {
    this._credit.push(credit);
  }
  public set investment(investment: Ifinancing[]) {
    this._investment = investment;
  }
  public set newInvestment(investment: Ifinancing) {
    this._investment.push(investment);
  }
  public set derj(derj: Ifinancing[]) {
    this._derj = derj;
  }
  public set newDerj(derj: Ifinancing) {
    this._derj.push(derj);
  }
  public set grant(grant: Ifinancing[]) {
    this._grant = grant;
  }
  public set newGrant(grant: Ifinancing) {
    this._grant.push(grant);
  }
  public set vegetationYear(vegetationYear: IvegetationYears[]) {
    this._vegetationYear = vegetationYear;
  }
  public set newVegetationYear(vegetationYear: IvegetationYears) {
    this._vegetationYear.push(vegetationYear);
  }
  public get yieldPlant() {
    return this._yieldPlant;
  }
  public get cultural() {
    return this._cultural;
  }
  public get yieldCalc() {
    return this._yieldCalc;
  }
  public get income() {
    return this._income;
  }
  public get production() {
    return this._production;
  }
  public get sale() {
    return this._sale;
  }
  public get credit() {
    return this._credit;
  }
  public get investment() {
    return this._investment;
  }
  public get derj() {
    return this._derj;
  }
  public get grant() {
    return this._grant;
  }
  public get vegetationYear() {
    return this._vegetationYear;
  }
}
