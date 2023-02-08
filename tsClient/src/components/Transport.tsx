import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Input from "../ui/Input/Input";
import { TransportProps } from "../modules/CreateCostTransport";
import { func, InputProps } from "./Dialog";
import Button from "../ui/Button/Button";
import { createOperation, patchOperation } from "../http/requests";
import { Context } from "../main";
import { useParams } from "react-router-dom";
const createTransport: func<TransportProps> = function (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes,
  cell,
  setCell,
  section,
  setSection
) {
  if (res.nameOper == "" || res.price == "") {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    setOpen(false);
    setCell!("");
    setRes({});
    setIsErr(false);
    res.price = +res.price;
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
};
const Easy = observer(
  ({
    res,
    setRes,
    cell,
    section,
    setCell,
    setIsErr,
    setOpen,
    setSection,
    update,
  }: InputProps<TransportProps>) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    return (
      <>
        <h4>Внесіть данні для розрахунку транспортування</h4>
        <div className="d-flex gap-3">
          <div>
            <p>Назва робіт</p>
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
        <Button
          onClick={() =>
            createTransport(
              +id!,
              map,
              update,
              res,
              setIsErr,
              setOpen,
              setRes,
              cell,
              setCell,
              section,
              setSection
            )
          }
        >
          Зберегти
        </Button>
      </>
    );
  }
);

export default Easy;
