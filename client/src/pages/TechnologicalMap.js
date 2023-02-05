import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

import OperSection from "../components/OperSection";

import { Context } from "../index";
import Loader from "../components/Loader";
import style from "./map.module.css";
import CreateCostHandWork from "../modules/CreateCostHandWork";
import CreateCostMaterials from "../modules/CreateCostMaterials";
import CreateCostServices from "../modules/CreateCostServices";
import CreateCostTransport from "../modules/CreateCostTransport";
import CreateCostMechanical from "../modules/CreateCostMechanical";
import CreateCart from "../modules/CreateCart";
import GeneralDataTable from "../modules/GeneralDataTable";
import OpersTable from "../modules/OpersTable";
import Button from "../ui/Button/Button";

const DevicePage = observer(() => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [cell, setCell] = useState("");
  const [section, setSection] = useState("");
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState({
    nameOper: "",
    price: "",
    amount: "",
  });

  const { map } = useContext(Context);
  let { id } = useParams();

  return (
    <>
      {map.isLoading ? <Loader /> : <></>}
      <div className={style.container}>
        <div style={{ fontSize: "20px" }}>
          <Link to="/">{"<НА ГОЛОВНУ"}</Link>
        </div>
        <p style={{ textAlign: "center", fontSize: "25px" }}>
          Технологічна карта
        </p>
        <div>
          <GeneralDataTable
            id={id}
            setMapOpen={setMapOpen}
            setRes={setRes}
            setUpdate={setUpdate}
          />
          <OpersTable
            id={id}
            setRes={setRes}
            setSecondOpen={setSecondOpen}
            setCell={setCell}
            setUpdate={setUpdate}
          />
          <Button
            style={{ marginTop: "15px", marginLeft: "31px" }}
            onClick={() => {
              setUpdate(false);
              setOpen(true);
            }}
          >
            Додати технологічну операцію
          </Button>
        </div>
        <OperSection
          open={open}
          setOpen={setOpen}
          setSecondOpen={setSecondOpen}
          cell={cell}
          setCell={setCell}
          section={section}
          setSection={setSection}
        />

        {cell === "costMaterials" ? (
          <CreateCostMaterials
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
          />
        ) : cell === "costServices" ? (
          <CreateCostServices
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
          />
        ) : cell === "costTransport" ? (
          <CreateCostTransport
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
          />
        ) : cell === "costMechanical" ? (
          <CreateCostMechanical
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
          />
        ) : cell == "costHandWork" ? (
          <CreateCostHandWork
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
          />
        ) : (
          ""
        )}
        <CreateCart
          open={mapOpen}
          setOpen={setMapOpen}
          update={update}
          setUpdate={setUpdate}
          res={res}
          setRes={setRes}
        />
      </div>
    </>
  );
});
export default DevicePage;
