import { makeAutoObservable } from "mobx";

export default class MapStore {
  constructor() {
    this._maps = [];
    this._opers = [];
    this._costMaterials = [];
    this._costServices = [];
    this._costMechanical = [];
    this._costTransport = [];
    this._section = [];
    makeAutoObservable(this);
  }

  set maps(maps) {
    this._maps = maps;
  }
  set newMaps(maps) {
    this._maps = [...this._maps, maps];
  }
  set opers(opers) {
    this._opers = opers;
  }
  set newOper(opers) {
    this._opers.push(opers);
  }
  set newCostMaterials(mat) {
    this._costMaterials.push(mat);
  }
  set costMaterials(mat) {
    this._costMaterials = mat;
  }
  set costMechanical(mech) {
    this._costMechanical = mech;
  }
  set newCostTransport(trans) {
    this._costTransport.push(trans);
  }
  set costTransport(trans) {
    this._costTransport = trans;
  }
  set newCostServices(serv) {
    this._costServices.push(serv);
  }
  set costServices(serv) {
    this._costServices = serv;
  }
  set section(sec) {
    this._section = sec;
  }
  get maps() {
    return this._maps;
  }
  get opers() {
    return this._opers;
  }
  get costMaterials() {
    return this._costMaterials;
  }
  get costServices() {
    return this._costServices;
  }
  get costMechanical() {
    return this._costMechanical;
  }
  get costTransport() {
    return this._costTransport;
  }
  get section() {
    return this._section;
  }
}
