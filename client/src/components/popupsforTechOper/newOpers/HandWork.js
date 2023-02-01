import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../../index.js";

const HandWork = observer(({ res, setRes }) => {
  const { map } = useContext(Context);
  // setRes({...res, res.type:1})
  return (
    <>
      <div className="d-flex gap-4">
        <div>
          <p>Назва операції</p>
          <input
            type="text"
            onChange={(e) => {
              setRes({ ...res, nameOper: e.target.value });
            }}
            value={res.nameOper}
            placeholder="Вкажіть назву операції"
          />
        </div>
        <div>
          <p>Розряд робіт</p>
          <select
            value={res.gradeId}
            onChange={(e) => {
              setRes({ ...res, gradeId: e.target.value });
            }}
          >
            <option value="" selected disabled hidden>
              Виберіть розряд робіт
            </option>
            {map.grade.map((el) => (
              <option value={el.id}>{el.indicator}</option>
            ))}
          </select>
        </div>
      </div>
      <form>
        <div className="d-flex">
          <input
            type="radio"
            checked={res.type == 1}
            onClick={() => {
              setRes({
                ...res,
                type: 1,
                productionRateAmount: "",
                productionRateWeight: "",
                yieldСapacity: "",
                spending: "",
              });
            }}
          />
          <div
            onClick={() => {
              setRes({
                ...res,
                type: 1,
                productionRateAmount: "",
                productionRateWeight: "",
                yieldСapacity: "",
                spending: "",
              });
            }}
          >
            <p>Норма виробітку годин</p>
            <div className="d-flex">
              <input
                value={res.productionRateTime}
                onChange={(e) => {
                  setRes({ ...res, productionRateTime: e.target.value });
                }}
                type="number"
                disabled={res.type !== 1}
              />
              <p>м²/год</p>
            </div>
          </div>
        </div>
        <div
          className="d-flex"
          onClick={() => {
            setRes({
              ...res,
              type: 2,
              productionRateAmount: "",
              productionRateTime: "",
              spending: "",
            });
          }}
        >
          <input
            type="radio"
            checked={res.type == 2}
            onClick={() => {
              setRes({
                ...res,
                type: 2,
                productionRateAmount: "",
                productionRateTime: "",
                spending: "",
              });
            }}
          />
          <div>
            <div className="d-flex">
              <div>
                <p>Норма виробітку ваги</p>
                <div className="d-flex">
                  <input
                    value={res.productionRateWeight}
                    onChange={(e) => {
                      setRes({ ...res, productionRateWeight: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 2}
                  />
                  <p>кг/год</p>
                </div>
              </div>
              <div>
                <p>Урожайність з 1 га</p>
                <div className="d-flex">
                  <input
                    value={res.yieldСapacity}
                    onChange={(e) => {
                      setRes({ ...res, yieldСapacity: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 2}
                  />
                  <p>кг/га</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex"
          onClick={() => {
            setRes({
              ...res,
              type: 3,
              productionRateTime: "",
              productionRateWeight: "",
              yieldСapacity: "",
            });
          }}
        >
          <input
            type="radio"
            checked={res.type == 3}
            onClick={() => {
              setRes({
                ...res,
                type: 3,
                productionRateTime: "",
                productionRateWeight: "",
                yieldСapacity: "",
              });
            }}
          />
          <div>
            <div className="d-flex">
              <div>
                <p>Норма виробітку кількість</p>
                <div className="d-flex">
                  <input
                    value={res.productionRateAmount}
                    onChange={(e) => {
                      setRes({ ...res, productionRateAmount: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 3}
                  />
                  <p>шт/год</p>
                </div>
              </div>
              <div>
                <p>Розхід на 1 га</p>
                <div className="d-flex">
                  <input
                    value={res.spending}
                    onChange={(e) => {
                      setRes({ ...res, spending: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 3}
                  />
                  <p>шт/га</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
});

export default HandWork;
