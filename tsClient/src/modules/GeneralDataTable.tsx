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
  let [mapData] = map.maps.filter((el) => el.id == id);
  return (
    <Table my={"15px"} maxW={"3xl"}>
      <Thead>
        <Tr>
          {user.role != "" && <Th></Th>}
          <Th>Назва культури</Th>
          <Th>Площа, га</Th>
          <Th>Розрахункова ЗП грн/міс</Th>
          <Th>Вартість ДП грн/&nbsp;л</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          <Tr key={mapData?.id}>
            {user.role != "" && (
              <Td
                onClick={() => {
                  setMapOpen(true);
                  setUpdate(true);

                  setRes({
                    ...mapData,
                  });
                }}
              >
                <EditIcon color={"blue.400"} w={"20px"} h={"auto"} />
              </Td>
            )}
            <Td>{mapData?.nameCart}</Td>
            <Td>{mapData?.area}</Td>
            <Td>{mapData?.salary}</Td>
            <Td>{mapData?.priceDiesel}</Td>
          </Tr>
        }
      </Tbody>
    </Table>
  );
}
export default observer(GeneralDataTable);
