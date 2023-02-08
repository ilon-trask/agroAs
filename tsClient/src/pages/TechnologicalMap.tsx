import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

import OperSection from "../components/OperSection";

import { Context } from "../main";
import Loader from "../components/Loader";
import style from "./map.module.css";
import CreateCostHandWork from "../modules/CreateCostHandWork";
import CreateCostMaterials from "../modules/CreateCostMaterials";
import CreateCostServices from "../modules/CreateCostServices";
import CreateCostTransport from "../modules/CreateCostTransport";
import CreateCostMechanical from "../modules/CreateCostMechanical";
import CreateCart, { cartProps } from "../modules/CreateCart";
import GeneralDataTable from "../modules/GeneralDataTable";
import OpersTable from "../modules/OpersTable";
import Button from "../ui/Button/Button";
import { Icell } from "../../../tRPC serv/controllers/OperService";

export type createOperProps<T> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  section: number | "";
  setSection: (section: number | "") => void;
  res: T | {};
  setRes: (res: T | ((res: T) => T) | {}) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  isErr: boolean;
  setIsErr: (isErr: boolean) => void;
};

const DevicePage = observer(() => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [cell, setCell] = useState<Icell | "">("");
  const [section, setSection] = useState<number | "">("");
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState({});
  const [isErr, setIsErr] = useState<boolean>(false);

  const { map } = useContext(Context);
  let { id } = useParams();

  return (
    <div>
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
            id={+id!}
            setMapOpen={setMapOpen}
            setRes={setRes}
            setUpdate={setUpdate}
          />
          <OpersTable
            id={+id!}
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
            isErr={isErr}
            setIsErr={setIsErr}
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
            isErr={isErr}
            setIsErr={setIsErr}
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
            isErr={isErr}
            setIsErr={setIsErr}
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
            isErr={isErr}
            setIsErr={setIsErr}
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
            isErr={isErr}
            setIsErr={setIsErr}
          />
        ) : (
          ""
        )}
        <CreateCart
          open={mapOpen}
          setOpen={setMapOpen}
          update={update}
          setUpdate={setUpdate}
          res={res as cartProps}
          setRes={setRes}
        />
      </div>
    </div>
  );
});
export default DevicePage;
