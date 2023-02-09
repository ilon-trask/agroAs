import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { deleteCart, setIsPublic } from "../http/requests";
import { Context } from "../main";
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
}

const CartsTableItem = observer(({ e, setUpdate, setOpen, setRes }: props) => {
  const { map, user } = useContext(Context);

  return (
    <>
      <div
        className={style.item}
        onClick={() => {
          setUpdate(true);
          setOpen(true);

          setRes({
            ...e,
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
      {user.role == "" ? (
        ""
      ) : (
        <div
          className={(style.item, style.delete)}
          onClick={() => {
            deleteCart(map, e.id!);
          }}
        >
          видалити
        </div>
      )}
      <div className={style.item}>
        {user.role == "ADMIN" ? (
          <div
            onClick={() => {
              console.log(2);

              setIsPublic(map, { id: e.id!, isPublic: !e.isPublic });
            }}
          >
            опуб
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
});
export default CartsTableItem;
