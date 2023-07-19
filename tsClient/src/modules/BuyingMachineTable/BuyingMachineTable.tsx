import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import { Ibuying_machine } from "../../../../tRPC serv/models/models";
import { deleteBuyingMachine } from "../../http/requests";
import { Context } from "../../main";
import { CreateBuyingMachineProps } from "../CreateBuyingMachine";

export function BuyingMachineTableHead({ isPlan }: { isPlan?: boolean }) {
  return (
    <Tr>
      <Th></Th>
      <Th>Рік</Th>
      <Th>Назва</Th>
      <Th>Марка</Th>
      <Th>Кількість</Th>
      <Th>Ціна</Th>
      <Th>Сума</Th>
      <Th>Налаштування</Th>
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
        <MyEditIcon />
      </Td>

      <Td>{getYearFromString(el.date)}</Td>
      <Td>{el.name}</Td>
      <Td>{el.brand}</Td>
      <Td>{el.amount}</Td>
      <Td>{el.cost}</Td>
      <Td>{el.cost * el.amount}</Td>
      <Td>
        <Button size={"sm"}>Додати</Button>
      </Td>
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
          <MyDeleteIcon />
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
            key={el.id!}
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
