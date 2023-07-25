import React from "react";
import { cartProps } from "./CreateCart";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
type props = {
  myMap: resTechCartsWithOpers | undefined;
} & (
  | {
      useIcons: false;
    }
  | {
      useIcons: true;
      setMapOpen: (open: boolean) => void;
      setUpdate: (update: boolean) => void;
      setRes: (res: cartProps) => void;
    }
);

function GeneralDataTable(props: props) {
  return (
    <Table my={"15px"} maxW={"3xl"}>
      <Thead>
        <Tr>
          {props.useIcons && <Th></Th>}
          <Th>Назва культури</Th>
          <Th>Площа, га</Th>
          <Th>
            Розрахункова
            <br /> оплата оплата
            <br /> грн/міс
          </Th>
          <Th>
            Вартість <br /> дизельного палива
            <br /> грн/літ
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          {props.useIcons && (
            <Td
              onClick={() => {
                props.setMapOpen(true);
                props.setUpdate(true);
                //@ts-ignore
                props.setRes({ ...myMap });
              }}
            >
              <EditIcon color={"blue.400"} w={"20px"} h={"auto"} />
            </Td>
          )}
          <Td>{props.myMap?.nameCart}</Td>
          <Td>{props.myMap?.area}</Td>
          <Td>{props.myMap?.salary}</Td>
          <Td>{props.myMap?.priceDiesel}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
export default GeneralDataTable;
