import { makeAutoObservable } from "mobx";
import { IUserRole } from "../../../tRPC serv";
import { Ienterprise } from "../../../tRPC serv/models/models";

export default class EnterpriseStore {
  private _enterprise: Ienterprise[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  set enterprise(enterprise: Ienterprise[]) {
    this._enterprise = enterprise;
  }
  set newEnterprise(enterprise: Ienterprise) {
    this._enterprise.push(enterprise);
  }
  get enterprise() {
    return this._enterprise;
  }
}
