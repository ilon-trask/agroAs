import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../..";
import css from "../../../components/Dialog.module.css";
import { createOperation, patchOperation } from "../../../http/requests";
import PopupField from "./PopupField";
import CreateTraktor from "../CreateTraktor";
import CreateAgriculturalMachine from "../CreateAgriculturalMachine";
import { createTrac, createMachineFunc } from "./funs";

const MechanicalWork = ({ res, setRes }) => {
  const [tractorRes, setTractorRes] = useState({
    nameTractor: "",
    brand: "",
    marketCost: "",
    depreciationPeriod: "",
    enginePower: "",
    fuelConsumption: "",
    numberOfPersonnel: "",
    typeOfWork: "",
  });
  const [machineRes, setMachineRes] = useState({
    nameMachine: "",
    brand: "",
    marketCost: "",
    depreciationPeriod: "",
    widthOfCapture: "",
    workingSpeed: "",
    numberOfServicePersonnel: "",
    typeOfWork: "",
  });
  const [tractorOpen, setTractorOpen] = useState(false);
  const [agriculturalOpen, setAgriculturalOpen] = useState(false);
  const [updateTractor, setUpdateTractor] = useState(false);
  const { map } = useContext(Context);
  return (
    <>
      <h4>Внесіть данні для розрахунку</h4>
      <div className="">
        <div className="d-flex ">
          <p>Назва операції</p>
          <input
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameOper}
            onChange={(e) => {
              setRes({ ...res, nameOper: e.target.value });
            }}
          />
        </div>
        <div className="d-flex gap-3">
          <div>
            <p>Марка трактора</p>
            <select
              value={res.idTractor}
              onChange={(e) => {
                setRes(() => {
                  const tractor = map.tractor.filter(
                    (el) => el.id == e.target.value
                  );
                  return {
                    ...res,
                    fuelConsumption: tractor[0].fuelConsumption,
                  };
                });
                setRes((prev) => ({ ...prev, idTractor: +e.target.value }));
              }}
            >
              <option value="">вибрати трактор</option>
              {map.tractor.map((el) => (
                <option key={el.id} value={el.id} label>
                  {el.nameTractor}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Розхід палива на 1 год</p>
            <input
              placeholder={"Вкажіть ціну"}
              type="number"
              value={res?.fuelConsumption}
              onChange={(e) => {
                setRes(() => {
                  return { ...res, fuelConsumption: +e.target.value };
                });
              }}
            />
          </div>
          <div>
            <button
              className="mt-4"
              onClick={() => {
                setTractorOpen(true);
              }}
            >
              додати трактор
            </button>
          </div>
        </div>
        <div className="d-flex gap-3">
          <div>
            <p>Марка СГ машини</p>
            <select
              value={res.idMachine}
              onChange={(e) => {
                setRes(() => {
                  const machine = map.machine.filter(
                    (el) => el.id == e.target.value
                  );
                  return { ...res, workingSpeed: machine[0].workingSpeed };
                });
                setRes((prev) => ({ ...prev, idMachine: +e.target.value }));
              }}
            >
              <option value="">вибрати СГ машину</option>
              {map?.machine?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.nameMachine}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Робоча швидкість км/год</p>
            <input
              placeholder="Вкажіть швидкість"
              type="number"
              value={res?.workingSpeed}
              onChange={(e) => {
                setRes({ ...res, workingSpeed: +e.target.value });
              }}
            />
          </div>
          <div>
            <button
              className="mt-4"
              onClick={() => {
                setAgriculturalOpen(true);
              }}
            >
              додати СГ машину
            </button>
          </div>
        </div>
      </div>
      {tractorOpen ? (
        <PopupField
          open={tractorOpen}
          setOpen={setTractorOpen}
          res={tractorRes}
          setRes={setTractorRes}
          update={updateTractor}
          setUpdate={setUpdateTractor}
          func={createTrac}
        >
          <CreateTraktor res={tractorRes} setRes={setTractorRes} />
        </PopupField>
      ) : agriculturalOpen ? (
        <PopupField
          open={agriculturalOpen}
          setOpen={setAgriculturalOpen}
          res={machineRes}
          setRes={setMachineRes}
          update={updateTractor}
          setUpdate={setUpdateTractor}
          func={createMachineFunc}
        >
          <CreateAgriculturalMachine res={machineRes} setRes={setMachineRes} />
        </PopupField>
      ) : (
        <></>
      )}
    </>
  );
};

export default MechanicalWork;
