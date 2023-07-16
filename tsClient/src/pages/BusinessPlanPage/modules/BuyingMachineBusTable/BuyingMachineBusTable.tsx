import { Button, Table, TableContainer, Tbody, Thead } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "src/main";
import {
  BuyingMachineTableBodyRow,
  BuyingMachineTableHead,
} from "src/modules/BuyingMachineTable/BuyingMachineTable";
import CreateBuyingMachine, {
  CreateBuyingMachineProps,
} from "src/modules/CreateBuyingMachine";
import MyHeading from "src/ui/MyHeading";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function BuyingMachineBusTable({
  myBusiness,
}: {
  myBusiness: resBusinessPlan | undefined;
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
  const { map } = useContext(Context);
  return (
    <>
      <MyHeading>Купівля техніки та обладнання</MyHeading>
      <TableContainer>
        <Table size={"sm"}>
          <Thead>
            <BuyingMachineTableHead isPlan={true} />
          </Thead>
          <Tbody>
            {map.buyingMachine?.map((el) => {
              if (
                el.businessPlanId == myBusiness?.id &&
                el.enterpriseId == myBusiness?.enterpriseId
              )
                return (
                  <BuyingMachineTableBodyRow
                    key={el.id!}
                    isPlan={true}
                    el={el}
                    setOpen={setBuyingMachineOpen}
                    setRes={setBuyingMachineRes}
                    setUpdate={setUpdate}
                  />
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          setBuyingMachineOpen(true);
          setBuyingMachineRes({
            businessPlanId: myBusiness?.id!,
            enterpriseId: myBusiness?.enterpriseId!,
            amount: "",
            brand: "",
            cost: "",
            date: "",
            name: "",
            purpose: "",
          });
        }}
      >
        Додати нову техніку
      </Button>
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
