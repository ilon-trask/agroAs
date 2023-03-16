import { makeAutoObservable } from "mobx";
import { IUserRole } from "../../../tRPC serv";

export default class UserStore {
  private _isAuth: boolean = false;
  private _role: IUserRole = "";
  constructor() {
    makeAutoObservable(this);
  }

  set isAuth(auth: boolean) {
    this._isAuth = auth;
  }
  set role(role) {
    this._role = role;
  }
  get isAuth() {
    return this._isAuth;
  }
  get role() {
    return this._role;
  }
}
