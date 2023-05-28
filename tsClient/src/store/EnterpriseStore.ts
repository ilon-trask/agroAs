import { makeAutoObservable } from "mobx";
import { IUserRole } from "../../../tRPC serv";
import {
  Ibuilding,
  Ienterprise,
  Ijob,
  Iland,
  Iworker,
} from "../../../tRPC serv/models/models";

export default class EnterpriseStore {
  private _enterprise: Ienterprise[] = [];
  private _job: Ijob[] = [];
  private _worker: Iworker[] = [];
  private _land: Iland[] = [];
  private _building: Ibuilding[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  set enterprise(enterprise: Ienterprise[]) {
    this._enterprise = enterprise;
  }
  set newEnterprise(enterprise: Ienterprise) {
    this._enterprise.push(enterprise);
  }

  set job(job: Ijob[]) {
    this._job = job;
  }
  set newJob(job: Ijob) {
    this._job.push(job);
  }
  set worker(worker: Iworker[]) {
    this._worker = worker;
  }
  set newWorker(worker: Iworker) {
    this._worker.push(worker);
  }
  set land(land: Iland[]) {
    this._land = land;
  }
  set newLand(land: Iland) {
    this._land.push(land);
  }
  set building(build: Ibuilding[]) {
    this._building = build;
  }
  set newBuilding(build: Ibuilding) {
    this._building.push(build);
  }
  get enterprise() {
    return this._enterprise;
  }
  get job() {
    return this._job;
  }
  get worker() {
    return this._worker;
  }
  get land() {
    return this._land;
  }
  get building() {
    return this._building;
  }
}
