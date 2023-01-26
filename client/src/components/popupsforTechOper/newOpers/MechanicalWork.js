import React, { useState, useContext } from "react";
import { Context } from "../../..";
import css from "../../../components/Dialog.module.css";
import PopupField from "./PopupField";
import CreateTractor from "../CreateTractor";
import CreateAgriculturalMachine from "../CreateAgriculturalMachine";
import {
  createTrac,
  createMachineFunc,
  createMachineProps,
  createTracProps,
} from "./funs";
import { observer } from "mobx-react-lite";

const MechanicalWork = observer(({ res, setRes }) => {
  const [inRes, setInRes] = useState({});
  //   {
  //   nameTractor: "",
  //   brand: "",
  //   marketCost: "",
  //   depreciationPeriod: "",
  //   enginePower: "",
  //   fuelConsumption: "",
  //   numberOfPersonnel: "",
  //   gradeId: "",
  // }
  // const [machineRes, setMachineRes] = useState({});
  //   {
  //   nameMachine: "",
  //   brand: "",
  //   marketCost: "",
  //   depreciationPeriod: "",
  //   widthOfCapture: "",
  //   workingSpeed: "",
  //   numberOfServicePersonnel: "",
  //   gradeId: "",
  // }
  const [tractorOpen, setTractorOpen] = useState(false);
  const [agriculturalOpen, setAgriculturalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
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
          <div style={{ height: "min-content", margin: "auto 0 0" }}>
            <button
              onClick={() => {
                if (res.idTractor) {
                  let [second] = map.tractor.filter(
                    (el) => el.id == res.idTractor
                  );
                  setInRes(second);
                  setUpdate(true);
                  setTractorOpen(true);
                }
              }}
            >
              Ред вибраний трактор
            </button>
            <select
              value={res.idTractor}
              onChange={(e) => {
                setRes(() => {
                  const [tractor] = map.tractor.filter(
                    (el) => el.id == e.target.value
                  );
                  return {
                    ...res,
                    fuelConsumption: tractor.fuelConsumption,
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
          <div style={{ height: "min-content", margin: "auto 0 0" }}>
            <button
              onClick={() => {
                if (res.idMachine) {
                  let [second] = map.machine.filter(
                    (el) => el.id == res.idMachine
                  );
                  setInRes(second);
                  setUpdate(true);
                  setAgriculturalOpen(true);
                }
              }}
            >
              Ред вибрану СГ машину
            </button>
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
          res={inRes}
          setRes={setInRes}
          update={update}
          setUpdate={setUpdate}
          func={createTrac}
          props={createTracProps}
        >
          <CreateTractor res={inRes} setRes={setInRes} />
        </PopupField>
      ) : agriculturalOpen ? (
        <PopupField
          open={agriculturalOpen}
          setOpen={setAgriculturalOpen}
          res={inRes}
          setRes={setInRes}
          update={update}
          setUpdate={setUpdate}
          func={createMachineFunc}
          props={createMachineProps}
        >
          <CreateAgriculturalMachine res={inRes} setRes={setInRes} />
        </PopupField>
      ) : (
        <></>
      )}
    </>
  );
});

export default MechanicalWork;
