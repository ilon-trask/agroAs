import React from "react";
import { observer } from "mobx-react-lite";
import Input from "../ui/Input/Input";
import { ServiceProps } from "../modules/CreateCostServices";

type props = { res: ServiceProps; setRes: (res: ServiceProps) => void };

const Easy = observer(({ res, setRes }: props) => {
  return (
    <>
      <h4>Внесіть данні для розрахунку</h4>
      <div className="d-flex gap-3">
        <div>
          <p>Назва послуги</p>
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
      </div>
    </>
  );
});

export default Easy;
