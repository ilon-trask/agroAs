import { makeAutoObservable } from "mobx";
import {
  Itech_operation,
  Itech_cart,
  Icost_material,
  Iaggregate,
  Icost_transport,
  Icost_service,
  Isection,
  Itractor,
  Imachine,
} from "../../../tRPC serv/models/models";

export default class MapStore {
  private _maps: Itech_cart[] = [];
  private _opers: Itech_operation[][] = [];
  private _costMaterials: Icost_material[] = [];
  private _costServices: Icost_service[] = [];
  private _costTransport: Icost_transport[] = [];
  private _section: Isection[] = [];
  private _tractor: Itractor[] = [];
  private _machine: Imachine[] = [];
  private _costMechanical: Iaggregate[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  public set maps(maps) {
    this._maps = maps;
  }
  public set newMaps(maps: Itech_cart) {
    this._maps.push(maps);
  }
  public set opers(opers) {
    this._opers = opers;
  }
  public set newOper(opers: Itech_operation[]) {
    this._opers.push(opers);
  }
  public set newCostMaterials(mat: Icost_material) {
    this._costMaterials.push(mat);
  }
  public set costMaterials(mat) {
    this._costMaterials = mat;
  }
  public set costMechanical(mech) {
    this._costMechanical = mech;
  }
  public set newCostMechanical(mech: Iaggregate) {
    this._costMechanical.push(mech);
  }
  public set newCostTransport(trans: Icost_transport) {
    this._costTransport.push(trans);
  }
  public set costTransport(trans) {
    this._costTransport = trans;
  }
  public set newCostServices(serv: Icost_service) {
    this._costServices.push(serv);
  }
  public set costServices(serv) {
    this._costServices = serv;
  }
  public set section(sec) {
    this._section = sec;
  }
  public set tractor(trac) {
    this._tractor = trac;
  }
  public set machine(machine) {
    this._machine = machine;
  }
  public get maps() {
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
  get tractor() {
    return this._tractor;
  }
  get machine() {
    return this._machine;
  }
}
