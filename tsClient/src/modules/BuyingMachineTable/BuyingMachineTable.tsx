import { Button, Td, Th, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { DeleteProps } from "src/components/DeleteAlert";
import { amortizationProps } from "src/pages/BusinessPlanPage/modules/AmortizationDialog/AmortizationDialog";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import { Ibuying_machine } from "../../../../tRPC serv/models/models";
import { deleteBuyingMachineForBusiness } from "../../http/requests";
import { Context } from "../../main";
import { CreateBuyingMachineProps } from "../CreateBuyingMachine";

export function BuyingMachineTableHead() {
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
      <Th></Th>
    </Tr>
  );
}
export function BuyingMachineTableBodyRow({
  el,
  setDeleteOpen,
  setOpen,
  setRes,
  setUpdate,
  busId,
  setAmortizationData,
  setAmortizationOpen,
  i,
}: {
  el: Ibuying_machine;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<CreateBuyingMachineProps>>;
  setDeleteOpen: Dispatch<SetStateAction<DeleteProps>>;
  busId: number;
  setAmortizationOpen: Dispatch<SetStateAction<boolean>>;
  setAmortizationData: Dispatch<SetStateAction<amortizationProps | undefined>>;
  i: number | undefined;
}) {
  const { business } = useContext(Context);
  return (
    <Tr>
      <Td
        onClick={() => {
          setOpen(true);
          setUpdate(true);
          setRes({
            buyingId: el.id,
            amount: el.amount,
            brand: el.brand,
            price: el.price,
            date: el.date,
            name: el.name,
            purpose: el.purpose,
            businessPlanId: el.businessPlanId!,
            enterpriseId: el.enterpriseId!,
            year: el.year,
          });
        }}
      >
        <MyEditIcon />
      </Td>

      <Td>{i || getYearFromString(el.date)}</Td>
      <Td>{el.name}</Td>
      <Td>{el.brand}</Td>
      <Td>{el.amount}</Td>
      <Td>{el.price}</Td>
      <Td>{el.price * el.amount}</Td>
      <Td>
        <Button
          size={"sm"}
          onClick={() => {
            setAmortizationOpen(true);
            setAmortizationData({
              id: el.amortization?.id,
              // amount: el.amortization?.amount || "",
              busId: busId,
              depreciationPeriod: el.amortization?.depreciationPeriod || 7,
              introductionDate: el.amortization?.introductionDate || "",
              mainAmount: el.amount,
              buyingMachineId: el.id,
            });
          }}
        >
          Додати
        </Button>
      </Td>
      <Td
        onClick={() => {
          setDeleteOpen({
            isOpen: true,
            func: () => {
              deleteBuyingMachineForBusiness(business, {
                busId: busId,
                id: el.id!,
              });
              setDeleteOpen((prev) => ({ ...prev, isOpen: false }));
            },
            text: "покупку техніки",
          });
        }}
      >
        <MyDeleteIcon />
      </Td>
    </Tr>
  );
}
// function BuyingMachineTable({
//   setOpen,
//   setRes,
//   setUpdate,
//   setDeleteOpen,
// }: {
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   setUpdate: Dispatch<SetStateAction<boolean>>;
//   setRes: Dispatch<SetStateAction<CreateBuyingMachineProps>>;
//   setDeleteOpen: Dispatch<SetStateAction<any>>;
// }) {
//   const { map } = useContext(Context);
//   return (
//     <Table size={"sm"}>
//       <Thead>
//         <BuyingMachineTableHead />
//       </Thead>
//       <Tbody>
//         {map.buyingMachine?.map((el) => (
//           <BuyingMachineTableBodyRow
//             key={el.id!}
//             el={el}
//             setOpen={setOpen}
//             setRes={setRes}
//             setUpdate={setUpdate}
//             setDeleteOpen={setDeleteOpen}
//           />
//         ))}
//       </Tbody>
//     </Table>
//   );
// }

// export default BuyingMachineTable;
