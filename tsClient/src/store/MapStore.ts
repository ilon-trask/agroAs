import { makeAutoObservable } from "mobx";
import {
  resMater,
  resTechCartsWithOpers,
  resTechOperation,
} from "../../../tRPC serv/controllers/TechCartService";
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
  Icultures_types,
  Ipurpose_material,
  Iculture,
  IcultivationTechnologies,
  Ioutcome,
  Iproduct,
  Ibuying_machine,
  Iadministration,
} from "../../../tRPC serv/models/models";

export default class MapStore {
  private _maps: resTechCartsWithOpers[] = [];
  private _opers: resTechOperation[] = [];
  private _costMaterials: resMater[] = [];
  private _costServices: Icost_service[] = [];
  private _costMechanical: Iaggregate[] = [];
  private _costTransport: Icost_transport[] = [];
  private _costHandWork: Icost_hand_work[] = [];
  private _section: Isection[] = [];
  private _tractor: Itractor[] = [];
  private _machine: Imachine[] = [];
  private _grade: Igrade[] = [];
  private _copyCarts: Itech_cart[] = [];
  public isLoading: boolean = true;
  private _works: Ispecial_work[] = [];
  private _copyTractors: Itractor[] = [];
  private _copyMachine: Imachine[] = [];
  private _cultural: Icultures_types[] = [];
  private _NoAgreeCarts: resTechCartsWithOpers[] = [];
  private _agreeCarts: resTechCartsWithOpers[] = [];
  private _purposeMaterial: Ipurpose_material[] = [];
  private _culture: Iculture[] = [];
  private _cultivationTechnologies: IcultivationTechnologies[] = [];
  private _complex: resTechCartsWithOpers[] = [];
  private _outcome: Ioutcome[] = [];
  private _product: Iproduct[] = [];
  private _buyingMachine: Ibuying_machine[] = [];
  private _administration: Iadministration[] = [];
  private _businessCarts: resTechCartsWithOpers[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  public set maps(maps) {
    this._maps = maps;
  }
  public set newMap(maps: resTechCartsWithOpers) {
    this._maps.push(maps);
  }
  public set complex(complex: resTechCartsWithOpers[]) {
    this._complex = complex;
  }
  public set newComplex(complex: resTechCartsWithOpers) {
    this._complex.push(complex);
  }
  public set opers(opers: resTechOperation[]) {
    this._opers = opers;
  }
  public set newOper(opers: resTechOperation) {
    this._opers.push(opers);
  }
  public set newCostMaterials(mat: resMater) {
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
  public set cultural(cultural: Icultures_types[]) {
    this._cultural = cultural;
  }
  public set NoAgreeCarts(NoAgreeCarts: Itech_cart[]) {
    this._NoAgreeCarts = NoAgreeCarts;
  }
  public set newNoAgreeCarts(maps: Itech_cart) {
    this._NoAgreeCarts.push(maps);
  }
  public set agreeCarts(maps: resTechCartsWithOpers[]) {
    this._agreeCarts = maps;
  }
  public set newAgreeCarts(maps: resTechCartsWithOpers) {
    this._agreeCarts.push(maps);
  }
  public set purposeMaterial(purpose: Ipurpose_material[]) {
    this._purposeMaterial = purpose;
  }
  public set culture(culture: Iculture[]) {
    this._culture = culture;
  }
  public set cultivationTechnologies(
    cultivationTechnologies: IcultivationTechnologies[]
  ) {
    this._cultivationTechnologies = cultivationTechnologies;
  }
  public set outcome(outcome: Ioutcome[]) {
    this._outcome = outcome;
  }
  public set newOutcome(outcome: Ioutcome) {
    this._outcome.push(outcome);
  }
  public set product(prod: Iproduct[]) {
    this._product = prod;
  }
  public set newProduct(prod: Iproduct) {
    this._product.push(prod);
  }
  public set buyingMachine(buyingMachine: Ibuying_machine[]) {
    this._buyingMachine = buyingMachine;
  }
  public set newBuyingMachine(buyingMachine: Ibuying_machine) {
    this._buyingMachine.push(buyingMachine);
  }
  public set administration(administration: Iadministration[]) {
    this._administration = administration;
  }
  public set newAdministration(administration: Iadministration) {
    this._administration.push(administration);
  }
  public set businessCarts(maps: resTechCartsWithOpers[]) {
    this._businessCarts = maps;
  }
  public set newBusinessCarts(maps: resTechCartsWithOpers) {
    this._businessCarts.push(maps);
  }
  public get maps() {
    return JSON.parse(JSON.stringify(this._maps)) as resTechCartsWithOpers[];
  }
  public get complex() {
    return JSON.parse(JSON.stringify(this._complex)) as resTechCartsWithOpers[];
  }
  get opers() {
    return JSON.parse(JSON.stringify(this._opers)) as resTechOperation[];
  }
  get costMaterials() {
    return JSON.parse(JSON.stringify(this._costMaterials)) as resMater[];
  }
  get costServices() {
    return JSON.parse(JSON.stringify(this._costServices)) as Icost_service[];
  }
  get costMechanical() {
    return JSON.parse(JSON.stringify(this._costMechanical)) as Iaggregate[];
  }
  get costTransport() {
    return JSON.parse(JSON.stringify(this._costTransport)) as Icost_transport[];
  }
  get costHandWork() {
    return JSON.parse(JSON.stringify(this._costHandWork)) as Icost_hand_work[];
  }
  get section() {
    return JSON.parse(JSON.stringify(this._section)) as Isection[];
  }
  get tractor() {
    return JSON.parse(JSON.stringify(this._tractor)) as Itractor[];
  }
  get machine() {
    return JSON.parse(JSON.stringify(this._machine)) as Imachine[];
  }
  get grade() {
    return JSON.parse(JSON.stringify(this._grade)) as Igrade[];
  }
  public get copyCarts() {
    return JSON.parse(JSON.stringify(this._copyCarts)) as Itech_cart[];
  }
  get works() {
    return JSON.parse(JSON.stringify(this._works)) as Ispecial_work[];
  }
  public get copyTractors() {
    return JSON.parse(JSON.stringify(this._copyTractors)) as Itractor[];
  }
  public get copyMachine() {
    return JSON.parse(JSON.stringify(this._copyMachine)) as Imachine[];
  }
  public get cultural() {
    return JSON.parse(JSON.stringify(this._cultural)) as Icultures_types[];
  }
  public get NoAgreeCarts() {
    return JSON.parse(
      JSON.stringify(this._NoAgreeCarts)
    ) as resTechCartsWithOpers[];
  }
  public get agreeCarts() {
    return JSON.parse(
      JSON.stringify(this._agreeCarts)
    ) as resTechCartsWithOpers[];
  }
  public get purposeMaterial() {
    return JSON.parse(
      JSON.stringify(this._purposeMaterial)
    ) as Ipurpose_material[];
  }
  public get culture() {
    return JSON.parse(JSON.stringify(this._culture)) as Iculture[];
  }
  public get cultivationTechnologies() {
    return JSON.parse(
      JSON.stringify(this._cultivationTechnologies)
    ) as IcultivationTechnologies[];
  }
  public get outcome() {
    return JSON.parse(JSON.stringify(this._outcome)) as Ioutcome[];
  }
  public get product() {
    return JSON.parse(JSON.stringify(this._product)) as Iproduct[];
  }
  public get buyingMachine() {
    return JSON.parse(JSON.stringify(this._buyingMachine)) as Ibuying_machine[];
  }
  public get administration() {
    return JSON.parse(
      JSON.stringify(this._administration)
    ) as Iadministration[];
  }
  public get businessCarts() {
    return JSON.parse(
      JSON.stringify(this._businessCarts)
    ) as resTechCartsWithOpers[];
  }
}
