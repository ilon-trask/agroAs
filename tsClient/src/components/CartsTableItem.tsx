import React from "react";
import { Link } from "react-router-dom";
import { deleteCart } from "../http/requests";
import { TEHMAP_ROUTER } from "../utils/consts";
import style from "./TableItem.module.css";

export default function CartsTableItem({ e, setUpdate, setOpen, setRes, map }) {
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
        {Math.round(10 * (e.totalCost * e.area)) / 10 || "0"}
      </div>
      <div className={style.item}>{e.totalCost || "0"}</div>
      <div
        className={(style.item, style.delete)}
        onClick={() => {
          deleteCart(map, +e.id);
        }}
      >
        видалити
      </div>
    </>
  );
}
