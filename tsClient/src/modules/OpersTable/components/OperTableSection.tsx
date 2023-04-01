import React, { useContext, useEffect } from "react";
import { Icell } from "../../../../../tRPC serv/controllers/OperService";
import { resTechCartsWithOpers } from "../../../../../tRPC serv/controllers/TechCartService";
import OpersTableItem from "./OpersTableItem";
import { Tr, Td, Divider, Heading } from "@chakra-ui/react";
import { Context } from "../../../main";
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
  deleteOpen: boolean;
  setDeleteOpen: (deleteOpen: boolean) => void;
};

function OperTableSection({
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
  deleteOpen,
  setDeleteOpen,
}: props) {
  const { user } = useContext(Context);
  return (
    <>
      {arr[0] && (
        <Tr>
          {user.role != "" && (
            <Td h={"auto"} padding={"0"}>
              <Divider orientation="horizontal" opacity={"1"} />
            </Td>
          )}
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
            key={el.id}
            id={id}
            el={el}
            setRes={setRes}
            setSecondOpen={setOpen}
            setCell={setCell}
            setUpdate={setUpdate}
            mapData={mapData}
            setShowAlert={setShowAlert}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
          />
        );
      })}
    </>
  );
}
export default OperTableSection;
