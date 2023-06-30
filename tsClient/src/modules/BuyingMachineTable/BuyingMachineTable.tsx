import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Ibuying_machine } from "../../../../tRPC serv/models/models";
import { CreateBuyingMachine } from "../../../../tRPC serv/routes/buyingMachineRouter";
import { deleteBuyingMachine } from "../../http/requests";
import { Context } from "../../main";
import { CreateBuyingMachineProps } from "../CreateBuyingMachine";
export function BuyingMachineTableHead({ isPlan }: { isPlan?: boolean }) {
  return (
    <Tr>
      <Th></Th>
      <Th>Дата</Th>
      <Th>Назва</Th>
      <Th>Марка</Th>
      <Th>Кількість</Th>
      <Th>Ціна</Th>
      <Th>Сума</Th>
      {!isPlan && <Th></Th>}
    </Tr>
  );
}
export function BuyingMachineTableBodyRow({
  el,
  isPlan,
  setDeleteOpen,
  setOpen,
  setRes,
  setUpdate,
}: {
  el: Ibuying_machine;
  isPlan?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setRes?: Dispatch<SetStateAction<CreateBuyingMachineProps>>;
  setDeleteOpen?: Dispatch<SetStateAction<any>>;
}) {
  const { map } = useContext(Context);
  return (
    <Tr>
      <Td
        onClick={() => {
          if (setOpen) setOpen(true);
          if (setUpdate) setUpdate(true);
          if (setRes)
            setRes({
              buyingId: el.id,
              amount: el.amount,
              brand: el.brand,
              cost: el.cost,
              date: el.date,
              name: el.name,
              purpose: el.purpose,
              businessPlanId: el.businessPlanId!,
              enterpriseId: el.enterpriseId!,
            });
        }}
      >
        <EditIcon color={"blue.400"} w={"20px"} h={"auto"} cursor={"pointer"} />
      </Td>

      <Td>{el.date}</Td>
      <Td>{el.name}</Td>
      <Td>{el.brand}</Td>
      <Td>{el.amount}</Td>
      <Td>{el.cost}</Td>
      <Td>{el.cost * el.amount}</Td>
      {!isPlan && (
        <Td
          onClick={() => {
            if (setDeleteOpen)
              setDeleteOpen({
                isOpen: true,
                func: () => {
                  deleteBuyingMachine(map, el.id!);
                  //@ts-ignore
                  setDeleteOpen({ isOpen: false });
                },
                text: "покупку техніки",
              });
          }}
        >
          <DeleteIcon w={"20px"} h={"auto"} color={"red"} />
        </Td>
      )}
    </Tr>
  );
}
function BuyingMachineTable({
  setOpen,
  setRes,
  setUpdate,
  setDeleteOpen,
  isPlan,
}: {
  isPlan?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setRes?: Dispatch<SetStateAction<CreateBuyingMachineProps>>;
  setDeleteOpen?: Dispatch<SetStateAction<any>>;
}) {
  const { map } = useContext(Context);
  return (
    <Table size={"sm"}>
      <Thead>
        <BuyingMachineTableHead isPlan={isPlan} />
      </Thead>
      <Tbody>
        {map.buyingMachine?.map((el) => (
          <BuyingMachineTableBodyRow
            el={el}
            isPlan={isPlan}
            setOpen={setOpen}
            setRes={setRes}
            setUpdate={setUpdate}
            setDeleteOpen={setDeleteOpen}
          />
        ))}
      </Tbody>
    </Table>
  );
}

export default BuyingMachineTable;
