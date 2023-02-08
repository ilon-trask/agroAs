import React, { useContext, useState } from "react";
import { Context } from "../main";
import css from "./Dialog.module.css";
import { createCart, updateMap } from "../http/requests";
import Input from "../ui/Input/Input";
import { cartProps } from "../modules/CreateCart";
import style from "./Input.module.css";
import Button from "../ui/Button/Button";
import { func } from "./Dialog";
import { useParams } from "react-router-dom";
const createCartFunc: func<cartProps> = (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes
) => {
  if (
    res.nameCart == "" ||
    res.area == "" ||
    res.salary == "" ||
    res.priceDiesel == ""
  ) {
    setIsErr(true);
  } else {
    setIsErr(false);
    setOpen(false);
    res.area = +res.area;
    res.salary = +res.salary;
    res.priceDiesel = +res.priceDiesel;
    setRes({});
    if (update) {
      updateMap(map, res);
    } else {
      createCart(map, res);
    }
  }
};

type props = {
  res: cartProps;
  setRes: (res: cartProps | ((res: cartProps) => cartProps) | {}) => void;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
};

export default function MapInputs({
  res,
  setRes,
  setIsErr,
  setOpen,
  update,
}: props) {
  const { map } = useContext(Context);
  const { id } = useParams();
  return (
    <>
      <h4>Загальні показники для розрахунку</h4>
      <div className={style.mechanical}>
        <div>
          <p>Назва культури</p>
          <Input
            placeholder="Вкажіть дату"
            type="text"
            value={res?.nameCart}
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
            value={res?.area}
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
            value={res?.salary}
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
            value={res?.priceDiesel}
          />
        </div>
      </div>
      <Button
        onClick={() =>
          createCartFunc(+id!, map, update, res, setIsErr, setOpen, setRes)
        }
      >
        Зберегти
      </Button>
    </>
  );
}
