import { makeAutoObservable } from "mobx";

export default class UserStore {
  private _isAuth: boolean = false;
  private _role: "ADMIN" | "authenticated" | "" | undefined = "";
  constructor() {
    makeAutoObservable(this);
  }

  set isAuth(auth: boolean) {
    this._isAuth = auth;
  }
  set role(user) {
    this._role = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get role() {
    return this._role;
  }
}
