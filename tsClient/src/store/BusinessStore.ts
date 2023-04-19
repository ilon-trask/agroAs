import { makeAutoObservable } from "mobx";
import { resBusinessPlan } from "../../../tRPC serv/controllers/BusinessService";
import { IbusinessPlan, Iculture } from "../../../tRPC serv/models/models";

export default class BusinessStore {
  // private _businessCategory: IbusinessCategory[] = [];
  private _businessPlans: resBusinessPlan[] = [];
  private _noAgreeBusinessPlan: IbusinessPlan[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  // public set businessCategory(v: IbusinessCategory[]) {
  //   this._businessCategory = v;
  // }
  // public set newBusinessCategory(v: IbusinessCategory) {
  //   this._businessCategory.push(v);
  // }
  public set businessPlan(v: resBusinessPlan[]) {
    this._businessPlans = v;
  }
  public set newBusinessPlan(v: resBusinessPlan) {
    this._businessPlans.push(v);
  }
  public set noAgreeBusinessPlan(v: IbusinessPlan[]) {
    this._noAgreeBusinessPlan = v;
  }
  public set newNoAgreeBusinessPlan(v: IbusinessPlan) {
    this._noAgreeBusinessPlan.push(v);
  }

  // public get businessCategory(): IbusinessCategory[] {
  // return this._businessCategory;
  // }
  public get businessPlan(): resBusinessPlan[] {
    return this._businessPlans;
  }
  public get noAgreeBusinessPlan(): IbusinessPlan[] {
    return this._noAgreeBusinessPlan;
  }
}
