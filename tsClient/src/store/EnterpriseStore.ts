import { makeAutoObservable } from "mobx";
import { IUserRole } from "../../../tRPC serv";
import { Ienterprise, Ijob, Iworker } from "../../../tRPC serv/models/models";

export default class EnterpriseStore {
  private _enterprise: Ienterprise[] = [];
  private _job: Ijob[] = [];
  private _worker: Iworker[] = [];
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
  get enterprise() {
    return this._enterprise;
  }
  get job() {
    return this._job;
  }
  get worker() {
    return this._worker;
  }
}
