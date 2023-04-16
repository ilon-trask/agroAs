import { makeAutoObservable } from "mobx";
import { resTechnologicalEconomicJustification } from "../../../tRPC serv/controllers/TEJService";
import {
  IcultivationTechnologies,
  Iculture,
  ItechnologicalEconomicJustification,
} from "../../../tRPC serv/models/models";

export default class TEJStore {
  // private _culture: Iculture[] = [];
  // private _cultivationTechnologies: IcultivationTechnologies[] = [];
  private _justification: resTechnologicalEconomicJustification[] = [];
  private _noAgreeJustification: resTechnologicalEconomicJustification[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  // public get culture() {
  //   return this._culture;
  // }
  // public get cultivationTechnologies() {
  //   return this._cultivationTechnologies;
  // }
  public get justification() {
    return this._justification;
  }
  public get noAgreeJustification() {
    return this._noAgreeJustification;
  }

  // public set culture(culture: Iculture[]) {
  //   this._culture = culture;
  // }
  // public set cultivationTechnologies(
  //   cultivationTechnologies: IcultivationTechnologies[]
  // ) {
  //   this._cultivationTechnologies = cultivationTechnologies;
  // }
  public set justification(
    justification: resTechnologicalEconomicJustification[]
  ) {
    this._justification = justification;
  }
  public set newJustification(
    justification: resTechnologicalEconomicJustification
  ) {
    this._justification.push(justification);
  }
  public set noAgreeJustification(
    justification: resTechnologicalEconomicJustification[]
  ) {
    this._noAgreeJustification = justification;
  }
  public set newNoAgreeJustification(
    justification: resTechnologicalEconomicJustification
  ) {
    this._noAgreeJustification.push(justification);
  }
}
