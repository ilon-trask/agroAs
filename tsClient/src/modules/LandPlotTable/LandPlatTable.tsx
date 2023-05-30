import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { DeleteProps } from "src/components/DeleteAlert";
import { deleteLand } from "src/http/requests";
import { Context } from "src/main";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import { Iland } from "../../../../tRPC serv/models/models";
import { CreateLandProps } from "../CreateLand/CreateLand";
export function LandPlatTableHead({ isPlan }: { isPlan?: boolean }) {
  return (
    <Tr>
      {!isPlan && <Th></Th>}
      <Th>Вид оплати</Th>
      <Th>Кадастровий номер</Th>
      <Th>Площа</Th>
      <Th>Ставка</Th>
      <Th>Плата за землю</Th>
      <Th>Власність</Th>
      {!isPlan && <Th></Th>}
    </Tr>
  );
}
function LandPlatTable({
  isPlan,
  arr,
  setOpen,
  setUpdate,
  setData,
  setDeleteOpen,
}: {
  isPlan?: boolean;
  arr: Iland[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<CreateLandProps>>;
  setDeleteOpen: Dispatch<SetStateAction<DeleteProps>>;
}) {
  const { enterpriseStore } = useContext(Context);
  return (
    <Table size={"sm"}>
      <Thead>
        <LandPlatTableHead isPlan={isPlan} />
      </Thead>
      <Tbody>
        {arr.map((el) => (
          <Tr>
            <Td
              onClick={() => {
                setOpen(true);
                setUpdate(true);
                setData({
                  landId: el.id,
                  area: el.area!,
                  cadastreNumber: el.cadastreNumber,
                  enterpriseId: el.enterpriseId!,
                  name: el.name,
                  businessPlanId: el.businessPlanId!,
                });
              }}
            >
              <MyEditIcon />
            </Td>
            <Td>{}</Td>
            <Td>{el.cadastreNumber}</Td>
            <Td>{el.area}</Td>
            <Td>{}</Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td
              onClick={() =>
                setDeleteOpen({
                  func() {
                    deleteLand(enterpriseStore, { landId: el.id! });
                    //@ts-ignore
                    setDeleteOpen({ isOpen: false });
                  },
                  isOpen: true,
                  text: "земельну ділянку",
                })
              }
            >
              <MyDeleteIcon />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default LandPlatTable;
