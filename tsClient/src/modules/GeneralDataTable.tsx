import React from "react";
import { useContext } from "react";
import { Context } from "../main";
import { cartProps } from "./CreateCart";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { observer } from "mobx-react-lite";
type props = {
  id: number;
  setMapOpen: (open: boolean) => void;
  setUpdate: (update: boolean) => void;
  setRes: (res: cartProps) => void;
};

function GeneralDataTable({ id, setMapOpen, setUpdate, setRes }: props) {
  let th = { fontSize: "18px", padding: "0 10px " };
  const { map, user } = useContext(Context);
  let myMap = map.maps.find((el) => el.id == id);
  if (!myMap) {
    myMap = map.complex.find((el) => el.id == id);
  }
  return (
    <Table my={"15px"} maxW={"3xl"}>
      <Thead>
        <Tr>
          {user.role != "" && <Th></Th>}
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
        {
          <Tr key={myMap?.id}>
            {user.role != "" && (
              <Td
                onClick={() => {
                  setMapOpen(true);
                  setUpdate(true);
                  //@ts-ignore
                  setRes({ ...myMap });
                }}
              >
                <EditIcon color={"blue.400"} w={"20px"} h={"auto"} />
              </Td>
            )}
            <Td>{myMap?.nameCart}</Td>
            <Td>{myMap?.area}</Td>
            <Td>{myMap?.salary}</Td>
            <Td>{myMap?.priceDiesel}</Td>
          </Tr>
        }
      </Tbody>
    </Table>
  );
}
export default observer(GeneralDataTable);
