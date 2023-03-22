import { makeAutoObservable } from "mobx";
import {
  IbusinessCategory,
  IbusinessPlan,
} from "../../../tRPC serv/models/models";

export default class MapStore {
  private _businessCategory: IbusinessCategory[] = [];
  private _businessPlans: IbusinessPlan[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  public set businessCategory(v: IbusinessCategory[]) {
    this._businessCategory = v;
  }
  public set newBusinessCategory(v: IbusinessCategory) {
    this._businessCategory.push(v);
  }
  public set businessPlan(v: IbusinessPlan[]) {
    this._businessPlans = v;
  }
  public set newBusinessPlan(v: IbusinessPlan) {
    this._businessPlans.push(v);
  }

  public get businessCategory(): IbusinessCategory[] {
    return this._businessCategory;
  }
  public get businessPlan(): IbusinessPlan[] {
    return this._businessPlans;
  }
}
