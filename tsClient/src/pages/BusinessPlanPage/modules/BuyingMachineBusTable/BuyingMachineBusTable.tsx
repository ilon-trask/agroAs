import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  BuyingMachineTableBodyRow,
  BuyingMachineTableHead,
} from "src/modules/BuyingMachineTable/BuyingMachineTable";
import CreateBuyingMachine, {
  CreateBuyingMachineProps,
} from "src/modules/CreateBuyingMachine";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import MyHeading from "src/ui/MyHeading";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function BuyingMachineBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan | undefined;
  start: number;
  end: number;
}) {
  const [buyingMachineOpen, setBuyingMachineOpen] = useState(false);
  const [buyingMachineRes, setBuyingMachineRes] =
    useState<CreateBuyingMachineProps>({
      amount: "",
      brand: "",
      cost: "",
      date: "",
      name: "",
      purpose: "",
      businessPlanId: myBusiness?.id!,
      enterpriseId: myBusiness?.enterpriseId!,
    });
  const [update, setUpdate] = useState(false);
  return (
    <>
      <MyHeading>Купівля техніки та обладнання</MyHeading>
      <TableContainer>
        <Table size={"sm"}>
          <Thead>
            <BuyingMachineTableHead />
          </Thead>
          <Tbody>
            {(() => {
              const res = [];
              for (let i = start; i <= end; i++) {
                const machines = myBusiness?.buying_machines?.filter(
                  (el) => getYearFromString(el.date) == i
                );
                if (machines) {
                  res.push(
                    machines.map((el) => (
                      <BuyingMachineTableBodyRow
                        key={el.id!}
                        el={el}
                        setOpen={setBuyingMachineOpen}
                        setRes={setBuyingMachineRes}
                        setUpdate={setUpdate}
                      />
                    ))
                  );
                }
                res.push(
                  <Tr key={i} fontWeight={"bold"}>
                    <Td>
                      <MyPlusIcon
                        onClick={() => {
                          setBuyingMachineOpen(true);
                          setBuyingMachineRes({
                            businessPlanId: myBusiness?.id!,
                            enterpriseId: myBusiness?.enterpriseId!,
                            amount: "",
                            brand: "",
                            cost: "",
                            date: i + "-01-01",
                            name: "",
                            purpose: "",
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{machines?.reduce((p, c) => p + c.amount, 0)}</Td>
                    <Td></Td>
                    <Td>{machines?.reduce((p, c) => p + c.cost, 0)}</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                );
              }
              res.push(
                <Tr key={end + 1}>
                  <Td></Td>
                  <Td colSpan={2}>ВСЕ РАЗОМ:</Td>
                  <Td></Td>
                  <Td>
                    {myBusiness?.buying_machines.reduce(
                      (p, c) => p + c.amount,
                      0
                    )}
                  </Td>
                  <Td></Td>
                  <Td>
                    {myBusiness?.buying_machines.reduce(
                      (p, c) => p + c.cost,
                      0
                    )}
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
              return res;
            })()}
          </Tbody>
        </Table>
      </TableContainer>
      <CreateBuyingMachine
        open={buyingMachineOpen}
        setOpen={setBuyingMachineOpen}
        data={buyingMachineRes}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  );
}

export default observer(BuyingMachineBusTable);
