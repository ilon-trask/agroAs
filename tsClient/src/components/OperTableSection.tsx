import React, { useContext, useEffect } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import { Context } from "../main";
import OpersTableItem from "./OpersTableItem";
import style from "./Table.module.css";
import { Tr, Td, Divider, Heading } from "@chakra-ui/react";
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
  setShowAlert: (showAlert: boolean) => void;
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
  setShowAlert,
}: props) {
  const line: {} = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <>
      {arr[0] && (
        <Tr>
          <Td h={"auto"} padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td>
            <b>{title}</b>
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
        </Tr>
      )}
      {arr.map((el) => {
        return (
          <OpersTableItem
            id={id}
            el={el}
            setRes={setRes}
            setSecondOpen={setOpen}
            setCell={setCell}
            setUpdate={setUpdate}
            mapData={mapData}
            setShowAlert={setShowAlert}
          />
        );
      })}
    </>
  );
}
