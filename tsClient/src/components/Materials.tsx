import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "../ui/Input/Input";

const Easy = observer(({ res, setRes }) => {
  return (
    <>
      <h4>Внесіть данні для розрахунку</h4>
      <div className="d-flex gap-3">
        <div>
          <p>Назва операції</p>
          <Input
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameOper}
            onChange={(e) => {
              setRes({ ...res, nameOper: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Ціна</p>
          <Input
            placeholder="Вкажіть ціну"
            type="number"
            value={res?.price}
            onChange={(e) => {
              setRes({ ...res, price: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Одиниці виміру ціни</p>
          <Input
            placeholder="Вкажіть одиниці"
            type="text"
            value={res?.unitsOfCost}
            onChange={(e) => {
              setRes({ ...res, unitsOfCost: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Розхід/кількість на 1 га</p>
          <Input
            placeholder="Вкажіть розхід"
            type="number"
            value={res?.consumptionPerHectare}
            onChange={(e) => {
              setRes({ ...res, consumptionPerHectare: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Одиниці виміру розходу</p>
          <Input
            placeholder="Вкажіть одиниці"
            type="text"
            value={res?.unitsOfConsumption}
            onChange={(e) => {
              setRes({ ...res, unitsOfConsumption: e.target.value });
            }}
          />
        </div>
      </div>
    </>
  );
});

export default Easy;
