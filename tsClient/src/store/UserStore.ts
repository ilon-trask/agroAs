import { makeAutoObservable } from "mobx";

type user = {};

export default class UserStore {
  private _isAuth: boolean = false;
  private _user: user = {};
  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(auth: boolean) {
    this._isAuth = auth;
  }
  setUser(user: user) {
    this._user = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
