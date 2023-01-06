import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "../index";

import MapInputs from "../components/MapInputs";
import Table from "../components/Table";

import { getMaps, deleteCart, createCart, getOnlyCart } from "../http/requests";

export default function MapJornal() {
  let { map } = useContext(Context);
  const URL = "http://localhost:5000/api/cart";
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  let [res, setRes] = useState({
    nameCart: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });

  return (
    <Container>
      <p style={{ textAlign: "center", fontSize: "25px" }}>
        Журнал технологічних карт
      </p>
      <Table
        data={data}
        setRes={setRes}
        setOpen={setOpen}
        setUpdate={setUpdate}
      ></Table>
      <button
        style={{ marginTop: "15px", marginLeft: "20px" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Добавити технологічну карту
      </button>
      <MapInputs
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
        update={update}
        setUpdate={setUpdate}
        res={res}
        setRes={setRes}
      ></MapInputs>
    </Container>
  );
}
