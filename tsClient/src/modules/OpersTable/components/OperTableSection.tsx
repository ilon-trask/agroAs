import React, { useContext } from "react";
import { Icell } from "../../../../../tRPC serv/controllers/OperService";
import { resTechCartsWithOpers } from "../../../../../tRPC serv/controllers/TechCartService";
import OpersTableItem from "./OpersTableItem";
import { Tr, Td, Divider } from "@chakra-ui/react";
import { Context } from "../../../main";
type props = {
  arr: any[];
  title: string;
  id: number;
  area: number;
} & (
  | { useIcons: false }
  | {
      useIcons: true;
      setRes: (res: any) => void;
      setOpen: (open: boolean) => void;
      setCell: (cell: Icell | "") => void;
      setUpdate: (update: boolean) => void;
      setShowAlert: (showAlert: boolean) => void;
      deleteOpen: boolean;
      setDeleteOpen: (deleteOpen: boolean) => void;
    }
);

function OperTableSection(props: props) {
  return (
    <>
      {props.arr[0] && (
        <Tr>
          {props.useIcons && (
            <Td h={"auto"} padding={"0"}>
              <Divider orientation="horizontal" opacity={"1"} />
            </Td>
          )}
          <Td h={"auto"} padding={"0"}>
            <Divider orientation="horizontal" opacity={"1"} />
          </Td>
          <Td>
            <b>{props.title}</b>
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
      {props.arr.map((el) => {
        return (
          <React.Fragment key={el.id}>
            {props.useIcons ? (
              <OpersTableItem
                useIcons={props.useIcons}
                id={props.id}
                el={el}
                area={props.area}
                setRes={props.setRes}
                setSecondOpen={props.setOpen}
                setCell={props.setCell}
                setUpdate={props.setUpdate}
                setShowAlert={props.setShowAlert}
                setDeleteOpen={props.setDeleteOpen}
              />
            ) : (
              <OpersTableItem
                useIcons={props.useIcons}
                id={props.id}
                el={el}
                area={props.area}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
export default OperTableSection;
