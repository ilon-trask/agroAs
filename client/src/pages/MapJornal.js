import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import MapInputs from "../components/MapInputs";
import Table from "../components/Table";
import { observer } from "mobx-react-lite";
import Loader from "../components/Loader";
import style from "./map.module.css";
import CreateCart from "../modules/CreateCart";
import Button from "../ui/Button/Button";

function MapJornal() {
  const { map } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
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
        <Table
          data={data}
          setRes={setRes}
          setOpen={setOpen}
          setUpdate={setUpdate}
        ></Table>
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
