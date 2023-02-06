import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import CartsTable from "../modules/CartsTable";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader";
import style from "./map.module.css";
import CreateCart from "../modules/CreateCart";
import Button from "../ui/Button/Button";

function MapJornal() {
  const { map } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState({
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
          setRes={setRes}
        />
      </div>
    </>
  );
}

export default observer(MapJornal);
