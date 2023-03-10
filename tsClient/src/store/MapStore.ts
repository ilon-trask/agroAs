import { makeAutoObservable } from "mobx";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
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
  Igrade,
  Icost_hand_work,
  Ispecial_work,
} from "../../../tRPC serv/models/models";

export default class MapStore {
  private _maps: resTechCartsWithOpers[] = [];
  private _opers: Itech_operation[] = [];
  private _costMaterials: Icost_material[] = [];
  private _costServices: Icost_service[] = [];
  private _costTransport: Icost_transport[] = [];
  private _section: Isection[] = [];
  private _tractor: Itractor[] = [];
  private _machine: Imachine[] = [];
  private _costMechanical: Iaggregate[] = [];
  private _costHandWork: Icost_hand_work[] = [];
  private _grade: Igrade[] = [];
  private _copyCarts: Itech_cart[] = [];
  public isLoading: boolean = true;
  private _works: Ispecial_work[] = [];
  private _copyTractors: Itractor[] = [];
  private _copyMachine: Imachine[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  public set maps(maps) {
    this._maps = maps;
  }
  public set newMap(maps: resTechCartsWithOpers) {
    this._maps.push(maps);
  }
  public set opers(opers: Itech_operation[]) {
    this._opers = opers;
  }
  public set newOper(opers: Itech_operation) {
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
  public set newCostHandWork(hand: Icost_hand_work) {
    this._costHandWork.push(hand);
  }
  public set costHandWork(hand) {
    this._costHandWork = hand;
  }
  public set section(sec) {
    this._section = sec;
  }
  public set tractor(trac) {
    this._tractor = trac;
  }
  public set newTractor(trac: Itractor) {
    this._tractor.push(trac);
  }
  public set machine(machine) {
    this._machine = machine;
  }
  public set newMachine(machine: Imachine) {
    this._machine.push(machine);
  }
  public set grade(grade: Igrade[]) {
    this._grade = grade;
  }
  public set copyCarts(carts: Itech_cart[]) {
    this._copyCarts = carts;
  }
  public set works(works: Ispecial_work[]) {
    this._works = works;
  }
  public set newWork(work: Ispecial_work) {
    this._works.push(work);
  }
  public set copyTractors(copyTractors: Itractor[]) {
    this._copyTractors = copyTractors;
  }
  public set copyMachine(copyMachine: Imachine[]) {
    this._copyMachine = copyMachine;
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
  get costHandWork() {
    return this._costHandWork;
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
  get grade() {
    return this._grade;
  }
  get works() {
    return this._works;
  }
  public get copyCarts() {
    return this._copyCarts;
  }
  public get copyTractors() {
    return this._copyTractors;
  }
  public get copyMachine() {
    return this._copyMachine;
  }
}
