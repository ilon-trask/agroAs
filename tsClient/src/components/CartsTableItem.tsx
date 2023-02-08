import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { deleteCart } from "../http/requests";
import { cartProps } from "../modules/CreateCart";
import { Icart } from "../pages/MapJornal";
import MapStore from "../store/MapStore";
import { TEHMAP_ROUTER } from "../utils/consts";
import style from "./TableItem.module.css";

interface props {
  e: cartProps;
  setUpdate: (update: boolean) => void;
  setOpen: (open: boolean) => void;
  setRes: (res: cartProps) => void;
  map: MapStore;
}

export default function CartsTableItem({
  e,
  setUpdate,
  setOpen,
  setRes,
  map,
}: props) {
  return (
    <>
      <div
        className={style.item}
        onClick={() => {
          setUpdate(true);
          setOpen(true);
          setRes({
            id: e.id,
            nameCart: e.nameCart,
            area: e.area,
            salary: e.salary,
            priceDiesel: e.priceDiesel,
          });
        }}
      >
        Ред
      </div>

      <Link className={style.item} to={TEHMAP_ROUTER + `/${e.id}`}>
        {e.nameCart}
      </Link>

      <div className={style.item}>{e.area}</div>
      <div className={style.item}>
        {Math.round(10 * (e.totalCost! * +e.area)) / 10 || "0"}
      </div>
      <div className={style.item}>{e.totalCost || "0"}</div>
      <div
        className={(style.item, style.delete)}
        onClick={() => {
          deleteCart(map, e.id!);
        }}
      >
        видалити
      </div>
    </>
  );
}
