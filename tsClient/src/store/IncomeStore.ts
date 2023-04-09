import { makeAutoObservable } from "mobx";
import { resYieldPlant } from "../../../tRPC serv/controllers/incomeService";
import {
  Iculture,
  IyieldCalculation,
  IyieldPlant,
  yieldCalculation,
} from "../../../tRPC serv/models/models";

export default class IncomeStore {
  private _yieldPlant: resYieldPlant[] = [];
  private _cultural: Iculture[] = [];
  private _yieldCalc: IyieldCalculation[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  public set yieldPlant(data: resYieldPlant[]) {
    this._yieldPlant = data;
  }

  public set newYieldPlant(data: resYieldPlant) {
    this._yieldPlant.push(data);
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

  public get yieldPlant() {
    return this._yieldPlant;
  }
  public get cultural() {
    return this._cultural;
  }
  public get yieldCalc() {
    return this._yieldCalc;
  }
}
