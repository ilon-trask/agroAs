import React, { useContext, useState } from "react";
import { Context } from "../main";
import css from "./Dialog.module.css";
import { createCart, updateMap } from "../http/requests";
import Input from "../ui/Input/Input";
import { cartProps } from "../modules/CreateCart";

type props = {
  res: cartProps;
  setRes: (res: cartProps) => void;
};

export default function MapInputs({ res, setRes }: props) {
  console.log(res);

  return (
    <>
      <h4>Загальні показники для розрахунку</h4>
      <div className="d-flex gap-3 ">
        <div>
          <p>Назва культури</p>
          <Input
            placeholder="Вкажіть дату"
            type="text"
            value={res.nameCart}
            onChange={(e) => {
              setRes({ ...res, nameCart: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Площа, га</p>
          <Input
            placeholder="Вкажіть дату"
            type="number"
            onChange={(e) => {
              setRes({ ...res, area: e.target.value });
            }}
            value={res.area}
          />
        </div>
        <div>
          <p>Розрахункова ЗП, грн</p>
          <Input
            placeholder="Вкажіть дату"
            type="number"
            onChange={(e) => {
              setRes({ ...res, salary: e.target.value });
            }}
            value={res.salary}
          />
        </div>
        <div>
          <p>Ціна ДП, грн</p>
          <Input
            placeholder="Вкажіть дату"
            type="number"
            onChange={(e) => {
              setRes({ ...res, priceDiesel: e.target.value });
            }}
            value={res.priceDiesel}
          />
        </div>
      </div>
    </>
  );
}
