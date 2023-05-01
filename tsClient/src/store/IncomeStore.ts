import { makeAutoObservable } from "mobx";
import { resYieldPlant } from "../../../tRPC serv/controllers/incomeService";
import {
  Iculture,
  Iincome,
  Iproduction,
  Isale,
  IyieldCalculation,
  IyieldPlant,
  yieldCalculation,
} from "../../../tRPC serv/models/models";

export default class IncomeStore {
  private _yieldPlant: resYieldPlant[] = [];
  private _cultural: Iculture[] = [];
  private _yieldCalc: IyieldCalculation[] = [];
  private _income: Iincome[] = [];
  private _production: Iproduction[] = [];
  private _sale: Isale[] = [];
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
  public set income(data: Iincome[]) {
    this._income = data;
  }
  public set newIncome(data: Iincome) {
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
}
