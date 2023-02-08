import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import CartsTable from "../modules/CartsTable";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader";
import style from "./map.module.css";
import CreateCart, { cartProps } from "../modules/CreateCart";
import Button from "../ui/Button/Button";
import { Itech_cart } from "../../../tRPC serv/models/models";
export interface Icart extends Itech_cart {
  area: any;
  salary: any;
  priceDiesel: any;
}

function MapJornal() {
  const { map } = useContext(Context);
  const [open, setOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [res, setRes] = useState<cartProps>({
    nameCart: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });
  return (
    <>
      {map.isLoading ? <Loader /> : <></>}
      <div className={style.container}>
        <p style={{ textAlign: "center", fontSize: "25px" }}>
          Журнал технологічних карт
        </p>
        <CartsTable
          setRes={setRes}
          setOpen={setOpen}
          setUpdate={setUpdate}
        ></CartsTable>
        <Button
          style={{ marginTop: "15px", marginLeft: "20px" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Добавити технологічну карту
        </Button>
        <CreateCart
          open={open}
          setOpen={setOpen}
          update={update}
          setUpdate={setUpdate}
          res={res}
          setRes={setRes as any}
        />
      </div>
    </>
  );
}

export default observer(MapJornal);
