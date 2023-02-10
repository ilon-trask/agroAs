import React, { useContext, useEffect } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import { Context } from "../main";
import OpersTableItem from "./OpersTableItem";
import style from "./Table.module.css";

type props = {
  arr: any[];
  title: string;
  sum: number;
  id: number;
  mapData: resTechCartsWithOpers;
  setRes: (res: any) => void;
  setOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  setUpdate: (update: boolean) => void;
};

export default function OperTableSection({
  arr,
  title,
  sum,
  id,
  mapData,
  setRes,
  setOpen,
  setCell,
  setUpdate,
}: props) {
  const { map } = useContext(Context);
  const line: {} = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <>
      {arr[0] && (
        <>
          <th style={line}>
            <hr />
          </th>
          <th>{title}</th>
          <th style={line}>
            <hr />
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />{" "}
          </th>
          <th style={line}>
            <hr />
          </th>
          <th style={line}>
            <hr />
          </th>
        </>
      )}
      {arr.map((el) => {
        return (
          <OpersTableItem
            id={id}
            el={el}
            map={map}
            setRes={setRes}
            setSecondOpen={setOpen}
            setCell={setCell}
            setUpdate={setUpdate}
            mapData={mapData}
          />
        );
      })}
    </>
  );
}
